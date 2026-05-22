#!/usr/bin/env python3
"""
AI image generation tool for the animated website pipeline.
Supports inference.sh (nano-banana-2), OpenRouter, and Google Gemini.

Usage:
  python3 tools/generate_image.py "your prompt" --aspect 16:9 -o media/output.png
"""
import argparse
import base64
import os
import subprocess
import sys
from pathlib import Path

ASPECT_RATIOS = {
    "1:1": "1024x1024",
    "16:9": "1792x1024",
    "9:16": "1024x1792",
    "4:3": "1365x1024",
    "3:4": "1024x1365",
    "4:1": "2048x512",
    "1:4": "512x2048",
    "8:1": "2048x256",
    "1:8": "256x2048",
}


def generate_via_infsh(prompt: str, aspect: str, output: Path) -> bool:
    """Use inference.sh CLI (nano-banana-2) if available."""
    try:
        result = subprocess.run(
            ["infsh", "image", "generate",
             "--model", "nano-banana-2",
             "--aspect-ratio", aspect,
             "--output", str(output),
             prompt],
            capture_output=True, text=True, timeout=120,
        )
        if result.returncode == 0:
            return True
        print(f"infsh error: {result.stderr}", file=sys.stderr)
    except FileNotFoundError:
        pass
    return False


def generate_via_openrouter(prompt: str, aspect: str, output: Path) -> bool:
    """Use OpenRouter image generation API."""
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        return False
    try:
        import urllib.request, json
        size = ASPECT_RATIOS.get(aspect, "1024x1024")
        payload = json.dumps({
            "model": "google/gemini-2.0-flash-exp:image",
            "prompt": prompt,
            "size": size,
            "response_format": "b64_json",
        }).encode()
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/images/generations",
            data=payload,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
        img_data = base64.b64decode(data["data"][0]["b64_json"])
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(img_data)
        return True
    except Exception as e:
        print(f"OpenRouter error: {e}", file=sys.stderr)
    return False


def generate_via_gemini(prompt: str, aspect: str, output: Path) -> bool:
    """Use Google Gemini image generation API."""
    api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return False
    try:
        import urllib.request, json
        payload = json.dumps({
            "instances": [{"prompt": prompt}],
            "parameters": {"sampleCount": 1, "aspectRatio": aspect},
        }).encode()
        url = (
            f"https://us-central1-aiplatform.googleapis.com/v1/projects/"
            f"$(gcloud config get-value project)/locations/us-central1/"
            f"publishers/google/models/imagegeneration@006:predict"
        )
        # Fall back to Gemini 2.0 Flash image gen via REST
        req = urllib.request.Request(
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"gemini-2.0-flash-exp-image-generation:generateContent?key={api_key}",
            data=json.dumps({
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"responseModalities": ["IMAGE"]},
            }).encode(),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
        img_b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
        img_data = base64.b64decode(img_b64)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(img_data)
        return True
    except Exception as e:
        print(f"Gemini error: {e}", file=sys.stderr)
    return False


def main():
    parser = argparse.ArgumentParser(description="Generate images for the animated website pipeline")
    parser.add_argument("prompt", help="Image generation prompt")
    parser.add_argument("--aspect", default="16:9", choices=list(ASPECT_RATIOS.keys()),
                        help="Aspect ratio (default: 16:9)")
    parser.add_argument("-o", "--output", default="media/output.png",
                        help="Output file path (default: media/output.png)")
    args = parser.parse_args()

    output = Path(args.output)
    print(f"Generating: {args.prompt[:60]}...")
    print(f"Aspect: {args.aspect} → {ASPECT_RATIOS.get(args.aspect)}")
    print(f"Output: {output}")

    providers = [
        ("inference.sh (nano-banana-2)", lambda: generate_via_infsh(args.prompt, args.aspect, output)),
        ("OpenRouter", lambda: generate_via_openrouter(args.prompt, args.aspect, output)),
        ("Google Gemini", lambda: generate_via_gemini(args.prompt, args.aspect, output)),
    ]

    for name, fn in providers:
        print(f"Trying {name}...", end=" ", flush=True)
        if fn():
            print(f"✓ Saved to {output}")
            return 0
        print("skipped")

    print(
        "\nNo image provider configured. Set one of:\n"
        "  OPENROUTER_API_KEY  — https://openrouter.ai/\n"
        "  GOOGLE_API_KEY      — https://aistudio.google.com/\n"
        "  infsh auth login    — https://inference.sh/",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
