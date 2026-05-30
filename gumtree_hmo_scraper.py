#!/usr/bin/env python3
"""
Gumtree UK - HMO 6+ Bedroom London Rental Scraper
Uses Firecrawl API if FIRECRAWL_API_KEY is set, otherwise falls back to direct scraping.
"""

import os
import json
import time
import re
import csv
from datetime import datetime

import requests
from bs4 import BeautifulSoup


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-GB,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xhtml+xml;q=0.9,*/*;q=0.8",
}

GUMTREE_SEARCH_URLS = [
    "https://www.gumtree.com/flats-houses/london/hmo+6+bedroom",
    "https://www.gumtree.com/search?search_category=flats-houses&q=HMO+6+bedroom&search_location=London&distance=0",
    "https://www.gumtree.com/search?search_category=flats-houses&q=HMO+6+bed&search_location=London&distance=0",
    "https://www.gumtree.com/search?search_category=flats-houses&q=house+in+multiple+occupation+6+bedroom&search_location=London&distance=0",
]

MIN_BEDROOMS = 6


def extract_bedrooms(text: str) -> int | None:
    """Extract bedroom count from listing text."""
    if not text:
        return None
    patterns = [
        r"(\d+)\s*bed(?:room)?s?",
        r"(\d+)\s*br\b",
        r"(\d+)\s*room",
    ]
    for p in patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            return int(m.group(1))
    return None


def is_hmo(text: str) -> bool:
    """Check if listing mentions HMO."""
    keywords = ["hmo", "house in multiple occupation", "house of multiple occupation"]
    lower = text.lower()
    return any(k in lower for k in keywords)


def scrape_gumtree_direct() -> list[dict]:
    """Scrape Gumtree directly using requests + BeautifulSoup."""
    results = []
    seen_urls = set()

    session = requests.Session()
    session.headers.update(HEADERS)

    for url in GUMTREE_SEARCH_URLS:
        print(f"\n[→] Scraping: {url}")
        try:
            resp = session.get(url, timeout=20)
            print(f"    Status: {resp.status_code}")
            if resp.status_code != 200:
                continue

            soup = BeautifulSoup(resp.text, "lxml")

            # Gumtree listing cards
            listings = soup.select(
                "article.listing-maxi, "
                "li.natural, "
                "div[data-q='search-result'], "
                "article[class*='listing']"
            )

            if not listings:
                # Broader fallback — any link containing /p/
                links = soup.find_all("a", href=re.compile(r"gumtree\.com/p/"))
                print(f"    Found {len(links)} listing links (fallback)")
                for a in links:
                    href = a.get("href", "")
                    if href in seen_urls:
                        continue
                    seen_urls.add(href)
                    title = a.get_text(strip=True)
                    bedrooms = extract_bedrooms(title)
                    if bedrooms and bedrooms >= MIN_BEDROOMS:
                        results.append({
                            "title": title,
                            "url": href if href.startswith("http") else f"https://www.gumtree.com{href}",
                            "price": None,
                            "location": None,
                            "bedrooms": bedrooms,
                            "hmo": is_hmo(title),
                            "description": None,
                            "posted": None,
                        })
                continue

            print(f"    Found {len(listings)} listing cards")
            for card in listings:
                title_el = card.select_one(
                    "h2, h3, .listing-title, [class*='title'], a[href*='/p/']"
                )
                price_el = card.select_one(
                    ".listing-price, [class*='price'], strong"
                )
                location_el = card.select_one(
                    ".listing-location, [class*='location'], [class*='area']"
                )
                desc_el = card.select_one(
                    ".listing-description, [class*='description'], p"
                )
                link_el = card.select_one("a[href]")
                date_el = card.select_one(
                    "[class*='date'], [class*='time'], time"
                )

                title = title_el.get_text(strip=True) if title_el else ""
                price = price_el.get_text(strip=True) if price_el else None
                location = location_el.get_text(strip=True) if location_el else None
                description = desc_el.get_text(strip=True) if desc_el else None
                href = link_el["href"] if link_el else ""
                posted = date_el.get_text(strip=True) if date_el else None

                if href in seen_urls:
                    continue
                seen_urls.add(href)

                full_text = f"{title} {description or ''}"
                bedrooms = extract_bedrooms(full_text)

                # Only include 6+ bedroom listings
                if bedrooms and bedrooms < MIN_BEDROOMS:
                    continue

                results.append({
                    "title": title,
                    "url": href if href.startswith("http") else f"https://www.gumtree.com{href}",
                    "price": price,
                    "location": location,
                    "bedrooms": bedrooms,
                    "hmo": is_hmo(full_text),
                    "description": description,
                    "posted": posted,
                })

        except requests.RequestException as e:
            print(f"    [!] Request error: {e}")

        time.sleep(2)  # polite delay between requests

    return results


def scrape_with_firecrawl(api_key: str) -> list[dict]:
    """Scrape Gumtree via Firecrawl API (bypasses Cloudflare/bot protection)."""
    try:
        from firecrawl import FirecrawlApp
    except ImportError:
        print("[!] firecrawl-py not installed. Run: pip install firecrawl-py")
        return []

    app = FirecrawlApp(api_key=api_key)
    results = []
    seen_urls: set[str] = set()

    # Direct Gumtree search pages — Firecrawl handles JS rendering + bot bypass
    search_urls = [
        "https://www.gumtree.com/search?search_category=flats-houses&q=HMO+6+bedroom&search_location=London&distance=0",
        "https://www.gumtree.com/search?search_category=flats-houses&q=HMO+6+bed&search_location=London&distance=0",
        "https://www.gumtree.com/search?search_category=flats-houses&q=HMO+7+bedroom&search_location=London&distance=0",
        "https://www.gumtree.com/search?search_category=flats-houses&q=HMO+8+bedroom&search_location=London&distance=0",
    ]

    schema = {
        "type": "object",
        "properties": {
            "listings": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "title":       {"type": "string"},
                        "url":         {"type": "string"},
                        "price":       {"type": "string"},
                        "location":    {"type": "string"},
                        "bedrooms":    {"type": "number"},
                        "description": {"type": "string"},
                        "posted":      {"type": "string"},
                    },
                    "required": ["title", "url"],
                },
            }
        },
    }

    for url in search_urls:
        print(f"\n[→] Firecrawl scraping: {url}")
        try:
            response = app.scrape_url(
                url,
                formats=["json"],
                json_options={
                    "prompt": (
                        "Extract all property listings. For each listing include: "
                        "title, full URL, price per month or week, location/area, "
                        "number of bedrooms, short description, and date posted."
                    ),
                    "schema": schema,
                },
                wait_for=5000,
            )
            listings = (response.get("json") or {}).get("listings") or []
            print(f"    Extracted {len(listings)} listings")

            for item in listings:
                url_val = item.get("url", "")
                if url_val in seen_urls:
                    continue
                seen_urls.add(url_val)

                title = item.get("title", "")
                description = item.get("description", "")
                full_text = f"{title} {description}"
                bedrooms = item.get("bedrooms") or extract_bedrooms(full_text)

                if bedrooms and bedrooms < MIN_BEDROOMS:
                    continue

                results.append({
                    "title": title,
                    "url": url_val,
                    "price": item.get("price"),
                    "location": item.get("location"),
                    "bedrooms": bedrooms,
                    "hmo": is_hmo(full_text),
                    "description": description[:300] if description else None,
                    "posted": item.get("posted"),
                })

        except Exception as e:
            print(f"    [!] Firecrawl error: {e}")
        time.sleep(2)

    return results


def save_results(results: list[dict], out_dir: str = ".") -> tuple[str, str]:
    """Save results to JSON and CSV files."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_path = os.path.join(out_dir, f"hmo_listings_{timestamp}.json")
    csv_path = os.path.join(out_dir, f"hmo_listings_{timestamp}.csv")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    if results:
        fieldnames = list(results[0].keys())
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(results)

    return json_path, csv_path


def print_results(results: list[dict]) -> None:
    """Print results to console."""
    if not results:
        print("\n[!] No listings found matching 6+ bedroom HMO criteria.")
        return

    print(f"\n{'='*70}")
    print(f"  Found {len(results)} listing(s)")
    print(f"{'='*70}")

    for i, r in enumerate(results, 1):
        print(f"\n[{i}] {r['title']}")
        print(f"     Bedrooms : {r['bedrooms'] or 'unknown'}")
        print(f"     HMO      : {'Yes' if r['hmo'] else 'Unconfirmed'}")
        if r.get("price"):
            print(f"     Price    : {r['price']}")
        if r.get("location"):
            print(f"     Location : {r['location']}")
        if r.get("posted"):
            print(f"     Posted   : {r['posted']}")
        print(f"     URL      : {r['url']}")
        if r.get("description"):
            print(f"     Desc     : {r['description'][:120]}...")


def main():
    print("=" * 70)
    print("  Gumtree UK — HMO 6+ Bedroom London Rental Scraper")
    print("=" * 70)

    api_key = os.environ.get("FIRECRAWL_API_KEY", "")

    if api_key:
        print("\n[✓] FIRECRAWL_API_KEY detected — using Firecrawl API")
        results = scrape_with_firecrawl(api_key)
    else:
        print("\n[i] No FIRECRAWL_API_KEY — using direct scraping")
        results = scrape_gumtree_direct()

    # Filter to confirmed 6+ bedrooms or HMO (include unknowns for review)
    confirmed = [r for r in results if r.get("bedrooms") and r["bedrooms"] >= MIN_BEDROOMS]
    hmo_only = [r for r in results if r["hmo"] and not r.get("bedrooms")]
    unknowns = [r for r in results if not r.get("bedrooms") and not r["hmo"]]

    final = confirmed + hmo_only

    print_results(final)

    if final:
        json_path, csv_path = save_results(final, out_dir="/home/user/property")
        print(f"\n[✓] Saved {len(final)} listings:")
        print(f"    JSON: {json_path}")
        print(f"    CSV : {csv_path}")
    else:
        print("\n[i] No results to save. Gumtree may be blocking automated requests.")
        print("    Try: FIRECRAWL_API_KEY=<your-key> python3 gumtree_hmo_scraper.py")


if __name__ == "__main__":
    main()
