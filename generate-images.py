"""
Generate 8 premium product images for nujmat-store
Uses Pollinations.ai (FREE, no API key needed)
"""
import requests
import time
import sys
from pathlib import Path
from urllib.parse import quote

# Force UTF-8 output
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

OUTPUT_DIR = Path(r"E:\Talegram\Minimax\myzambeel-store\images")
OUTPUT_DIR.mkdir(exist_ok=True)

# Style prefix (applied to every image)
STYLE = "Professional commercial product photography, clean modern minimal background with subtle gradient, soft studio lighting, sharp focus, photorealistic, 4:5 aspect ratio, no text, no watermarks, no people, premium automotive aesthetic, dark mode e-commerce style"

PRODUCTS = [
    {
        "id": "p01",
        "prompt": "Sleek black magnetic car phone holder mounted on a car dashboard, N52 strong magnet holding a modern smartphone mid-air showing magnetic grip, 360 degree rotating aluminum arm, 3M VHB adhesive base, Saudi Arabia desert highway visible through windshield in soft blurred background, premium automotive product photography, dark moody lighting",
    },
    {
        "id": "p02",
        "prompt": "Retractable mesh car window sun shade installed on a sedan car door window, black mesh fully extended blocking harsh sun rays visualized as light beams being blocked, modern car interior visible, Saudi Arabia bright sunny day climate, intense sunlight contrast, premium automotive accessory product photography",
    },
    {
        "id": "p03",
        "prompt": "Professional 1080p Full HD car dash camera mounted on windshield via strong suction cup, small LCD screen showing recorded road view, compact modern design in matte black, night vision IR LEDs visible, premium automotive tech aesthetic, dark studio lighting emphasizing screen and lens details",
    },
    {
        "id": "p04",
        "prompt": "Quilted memory foam car neck pillow, black fabric with beige quilted pattern, ergonomic U-shape design, mounted on a car headrest via elastic straps, modern car interior with leather seats, soft comfortable aesthetic, premium travel comfort product photography",
    },
    {
        "id": "p05",
        "prompt": "Premium 500ml car polish spray bottle, black and gold design with spray nozzle, next to dramatic before and after split showing dull scratched car paint transforming to mirror shine glossy finish, studio lighting emphasizing reflection and shine, premium automotive detailing aesthetic",
    },
    {
        "id": "p06",
        "prompt": "150W car power inverter, compact rectangular matte black device, AC outlet, dual USB ports and Type-C port visible on front panel, cooling vents, modern car interior setting with laptop plugged in showing power delivery, premium automotive tech product photography",
    },
    {
        "id": "p07",
        "prompt": "Car door edge guards, U-shaped black silicone strips, shown both installed on car door edge showing protection and one strip close-up showing 3M adhesive backing, set of 4 strips, modern car door, premium automotive accessory product photography",
    },
    {
        "id": "p08",
        "prompt": "Tire shine applicator brush, ergonomic black handle with soft nylon bristles, applying shine to a car tire, freshly polished gleaming tire surface, modern car wheel, professional automotive detailing aesthetic, studio lighting highlighting bristle texture and tire shine",
    },
]

def generate_image(prompt, output_path, width=1024, height=1280):
    """Generate image using Pollinations.ai free API"""
    full_prompt = f"{STYLE}. {prompt}"
    encoded = quote(full_prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width={width}&height={height}&nologo=true&model=flux"
    print(f"  Generating: {output_path.name}...", flush=True)
    try:
        response = requests.get(url, timeout=120)
        if response.status_code == 200:
            output_path.write_bytes(response.content)
            kb = len(response.content) // 1024
            print(f"  [OK] {output_path} ({kb} KB)", flush=True)
            return True
        else:
            print(f"  [FAIL] HTTP {response.status_code}", flush=True)
            return False
    except Exception as e:
        print(f"  [ERR] {e}", flush=True)
        return False

def main():
    print("=" * 60)
    print("Generating 8 product images for nujmat-store (Premium)")
    print("=" * 60)
    success = 0
    for p in PRODUCTS:
        out = OUTPUT_DIR / f"{p['id']}-main.jpg"
        print(f"\n[{success+1}/{len(PRODUCTS)}] {p['id']}: {p['prompt'][:60]}...", flush=True)
        if generate_image(p['prompt'], out):
            success += 1
        time.sleep(3)  # Rate limit
    print(f"\n{'='*60}")
    print(f"Done: {success}/{len(PRODUCTS)} images generated", flush=True)
    print(f"Saved to: {OUTPUT_DIR}", flush=True)

if __name__ == "__main__":
    main()
