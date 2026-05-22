@AGENTS.md

## Skills

- `/clone-website <url>` — Reverse-engineer any website into this Next.js codebase
- `/animated-website` — Build animated websites using the full AI design-to-dev pipeline (Stitch + 21st.dev + image gen)

## Image Generation

`tools/generate_image.py` generates images for the animated website pipeline.
Auto-detects available provider: inference.sh (nano-banana-2) → OpenRouter → Google Gemini.

Required env var (one of):
- `OPENROUTER_API_KEY`
- `GOOGLE_API_KEY` / `GEMINI_API_KEY`
- Or: `infsh auth login` (inference.sh CLI)
