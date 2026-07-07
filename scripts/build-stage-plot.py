"""Generate public/press-kit/rock-steady-stage-plot.pdf.

Edit STAGE_BOXES below (positions are in points from the page's top-left,
matching the diagram), then run:

    pip3 install reportlab
    python3 scripts/build-stage-plot.py

Layout constants reproduce the original press-kit PDF design exactly.
"""
from pathlib import Path

from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

REPO_ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = REPO_ROOT / "scripts" / "assets" / "rock-steady-logo-wide.png"
OUT_PATH = REPO_ROOT / "public" / "press-kit" / "rock-steady-stage-plot.pdf"

PAGE_W, PAGE_H = 792, 612

BG       = (0.019608, 0.019608, 0.019608)
YELLOW   = (1.0, 0.811765, 0.2)
GRAY     = (0.721569, 0.690196, 0.666667)
WHITE    = (1.0, 1.0, 1.0)
RED      = (1.0, 0.152941, 0.0)
GREEN    = (0.215686, 0.839216, 0.478431)
PANEL_BG = (0.062745, 0.062745, 0.062745)
BOX_BG   = (0.098039, 0.098039, 0.098039)
RULE     = (0.203922, 0.203922, 0.203922)

# (x, y_from_top, width, height, border/text color, label lines)
STAGE_BOXES = [
    (122, 282,  90, 54, WHITE,  ["GUITAR", "AMP"]),
    (259, 256,  92, 58, YELLOW, ["DRUM KIT"]),
    (394, 282,  90, 54, WHITE,  ["BASS", "AMP/DI"]),
    (359, 224,  70, 28, GREEN,  ["MONITOR"]),          # drum wedge, behind-right of kit
    (128, 410, 104, 44, GRAY,   ["LEAD/BACKING", "VOCAL"]),
    (247, 400, 118, 48, RED,    ["LEAD VOCAL"]),
    (380, 410, 104, 44, GRAY,   ["LEAD/BACKING", "VOCAL"]),
    (145, 472,  70, 28, GREEN,  ["MONITOR"]),          # centered under left vocal
    (271, 468,  70, 28, GREEN,  ["MONITOR"]),          # centered under lead vocal
    (397, 472,  70, 28, GREEN,  ["MONITOR"]),          # centered under right vocal
]

c = canvas.Canvas(str(OUT_PATH), pagesize=(PAGE_W, PAGE_H))

def text(x, y, s, font, size, color):
    c.setFillColorRGB(*color)
    c.setFont(font, size)
    c.drawString(x, y, s)

def stage_box(x, top, w, h, color, lines):
    c.setFillColorRGB(*BOX_BG)
    c.setStrokeColorRGB(*color)
    c.setLineWidth(1.5)
    c.rect(x, PAGE_H - top - h, w, h, stroke=1, fill=1)
    cx, cy = x + w / 2, PAGE_H - top - h / 2
    if len(lines) == 1:
        baselines = [cy]
    else:
        baselines = [cy + 6, cy - 7]
    for s, by in zip(lines, baselines):
        text(cx - stringWidth(s, "Helvetica-Bold", 9) / 2, by, s,
             "Helvetica-Bold", 9, color)

# page background
c.setFillColorRGB(*BG)
c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

# header: logo image + wordmark
c.drawImage(ImageReader(str(LOGO_PATH)), 36, PAGE_H - 76, width=250, height=39,
            mask="auto")
text(587, PAGE_H - 48, "ROCK STEADY", "Helvetica-Bold", 12, YELLOW)
text(587, PAGE_H - 64, "PHOENIX CLASSIC ROCK COVER BAND", "Helvetica-Bold", 8, GRAY)

# red rule
c.setStrokeColorRGB(*RED)
c.setLineWidth(3)
c.line(36, PAGE_H - 92, 756, PAGE_H - 92)

# title block
text(36, PAGE_H - 124, "Typical Stage Plot", "Helvetica-Bold", 24, WHITE)
text(36, PAGE_H - 145, "Flexible setup for bars, patios, private events, and house stages",
     "Helvetica-Bold", 10, GRAY)

# stage area
c.setFillColorRGB(*PANEL_BG)
c.setStrokeColorRGB(*RULE)
c.setLineWidth(1.5)
c.rect(54, PAGE_H - 530, 500, 330, stroke=1, fill=1)
text(264, PAGE_H - 218, "UPSTAGE", "Helvetica-Bold", 8, GRAY)
text(272, PAGE_H - 552, "AUDIENCE", "Helvetica-Bold", 9, GREEN)

for box in STAGE_BOXES:
    stage_box(*box)

# room notes panel
c.setFillColorRGB(*PANEL_BG)
c.setStrokeColorRGB(*RULE)
c.setLineWidth(1.5)
c.rect(580, PAGE_H - 362, 166, 162, stroke=1, fill=1)
text(594, PAGE_H - 224, "Room notes", "Helvetica-Bold", 11, YELLOW)
for i, line in enumerate([
    "- Typical layout; can adapt to",
    "room size.",
    "- Confirm stage dimensions and",
    "power before show day.",
    "- Rock Steady can provide PA for",
    "many rooms.",
    "- House sound: use input list and",
    "advance by email.",
]):
    text(594, PAGE_H - 244 - 13 * i, line, "Helvetica", 9, WHITE)

# contact panel
c.setFillColorRGB(*PANEL_BG)
c.setStrokeColorRGB(*RULE)
c.setLineWidth(1.5)
c.rect(580, PAGE_H - 502, 166, 110, stroke=1, fill=1)
text(594, PAGE_H - 416, "Contact", "Helvetica-Bold", 11, YELLOW)
text(594, PAGE_H - 436, "Booking:", "Helvetica-Bold", 8, GRAY)
text(594, PAGE_H - 452, "info@rocksteadybandaz.com", "Helvetica-Bold", 9, WHITE)
text(594, PAGE_H - 476, "Website:", "Helvetica-Bold", 8, GRAY)
text(594, PAGE_H - 492, "rocksteadybandaz.com/book", "Helvetica-Bold", 9, WHITE)

# footer
c.setStrokeColorRGB(*RULE)
c.setLineWidth(1.5)
c.line(36, 38, 756, 38)
text(36, 22,
     "info@rocksteadybandaz.com  |  rocksteadybandaz.com/book  |  facebook.com/rocksteadybandaz",
     "Helvetica", 8, GRAY)

c.showPage()
c.save()
print(f"wrote {OUT_PATH.relative_to(REPO_ROOT)}")
