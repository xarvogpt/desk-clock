# 홈 화면 아이콘(icon-192.png, icon-512.png)을 만든다: 검은 바탕에 타이머 링 모양
# 실행: python tools/make_icons.py
import math
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ON, OFF, BG = (255, 86, 49), (40, 39, 37), (0, 0, 0)


def ring(size):
    scale = 4  # 크게 그린 뒤 줄여서 테두리를 매끄럽게
    s = size * scale
    img = Image.new("RGB", (s, s), BG)
    d = ImageDraw.Draw(img)
    c = s / 2
    # 안드로이드가 아이콘을 원이나 둥근 사각형으로 잘라도 링이 남도록 가운데 70% 안에 그림
    r2, r1 = s * 0.35, s * 0.24
    for k in range(60):
        a0, a1 = math.radians(k * 6 + 0.9), math.radians((k + 1) * 6 - 0.9)
        pts = []
        for a in (a0, a1):
            pts.append((c + r2 * math.sin(a), c - r2 * math.cos(a)))
        for a in (a1, a0):
            pts.append((c + r1 * math.sin(a), c - r1 * math.cos(a)))
        d.polygon(pts, fill=ON if k < 45 else OFF)
    return img.resize((size, size), Image.LANCZOS)


for size in (192, 512):
    ring(size).save(ROOT / f"icon-{size}.png")
    print(f"icon-{size}.png")
