"""Generate public/press-kit/rock-steady-input-list.pdf.

Edit ROWS below, then run:

    pip3 install reportlab
    python3 scripts/build-input-list.py

Layout constants reproduce the original press-kit PDF design exactly
(verified pixel-identical outside the table when rebuilt from the same rows).
"""
from pathlib import Path

from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

REPO_ROOT = Path(__file__).resolve().parent.parent
LOGO_PATH = REPO_ROOT / "scripts" / "assets" / "rock-steady-logo-wide.png"
OUT_PATH = REPO_ROOT / "public" / "press-kit" / "rock-steady-input-list.pdf"

PAGE_W, PAGE_H = 612, 792

BG        = (0.019608, 0.019608, 0.019608)
YELLOW    = (1.0, 0.811765, 0.2)
GRAY      = (0.721569, 0.690196, 0.666667)
WHITE     = (1.0, 1.0, 1.0)
RED       = (1.0, 0.152941, 0.0)
ROW_A     = (0.082353, 0.082353, 0.082353)  # odd rows (1st, 3rd, ...)
ROW_B     = (0.043137, 0.043137, 0.043137)  # even rows
HEADER_BG = (0.062745, 0.062745, 0.062745)
BOX_BG    = (0.062745, 0.062745, 0.062745)
RULE      = (0.203922, 0.203922, 0.203922)

X_LEFT, X_RIGHT = 36, 576
COL_X = [36, 86, 225, 344]
ROW_H = 28

ROWS = [
    ("1",     "Lead vocal",             "Vocal mic",    "Center front"),
    ("2",     "Vocal 2 (lead/backing)", "Vocal mic",    "Stage right"),
    ("3",     "Vocal 3 (lead/backing)", "Vocal mic",    "Stage left"),
    ("4",     "Guitar amp",             "Mic",          "Stage right"),
    ("5",     "Bass",                   "DI or mic",    "Stage left"),
    ("6",     "Kick",                   "Kick mic",     "Drum kit"),
    ("7",     "Snare",                  "Snare mic",    "Drum kit"),
    ("8",     "Overhead L",             "Condenser",    "Drum kit"),
    ("9",     "Overhead R",             "Condenser",    "Drum kit"),
    ("10",    "Backing vocal",          "Vocal mic",    "As needed"),
    ("11-12", "House music / playback", "Stereo input", "Optional"),
]

c = canvas.Canvas(str(OUT_PATH), pagesize=(PAGE_W, PAGE_H))

def text(x, y, s, font, size, color):
    c.setFillColorRGB(*color)
    c.setFont(font, size)
    c.drawString(x, y, s)

# page background
c.setFillColorRGB(*BG)
c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

# header: logo image + wordmark
c.drawImage(ImageReader(str(LOGO_PATH)), 36, PAGE_H - 76, width=250, height=39,
            mask="auto")
text(407, PAGE_H - 48, "ROCK STEADY", "Helvetica-Bold", 12, YELLOW)
text(407, PAGE_H - 64, "PHOENIX CLASSIC ROCK COVER BAND", "Helvetica-Bold", 8, GRAY)

# red rule
c.setStrokeColorRGB(*RED)
c.setLineWidth(3)
c.line(X_LEFT, PAGE_H - 92, X_RIGHT, PAGE_H - 92)

# title block
text(36, PAGE_H - 124, "Typical Input List", "Helvetica-Bold", 24, WHITE)
text(36, PAGE_H - 145, "Confirm final production needs for your room before show day",
     "Helvetica-Bold", 10, GRAY)
text(36, PAGE_H - 180,
     "This is a typical advance list for venues using house production. Rock Steady can also provide PA for many",
     "Helvetica", 10.5, WHITE)
text(36, PAGE_H - 195, "rooms; confirm the plan during booking.", "Helvetica", 10.5, WHITE)

# table header
header_top = 228  # distance from page top
c.setFillColorRGB(*HEADER_BG)
c.rect(X_LEFT, PAGE_H - header_top - ROW_H, X_RIGHT - X_LEFT, ROW_H, stroke=0, fill=1)
hy = PAGE_H - header_top - 18
for x, label in zip(COL_X, ["CH", "SOURCE", "MIC / DI", "POSITION / NOTE"]):
    text(x, hy, label, "Helvetica-Bold", 8, YELLOW)

# table rows
c.setLineWidth(3)
for i, (ch, source, mic, note) in enumerate(ROWS):
    row_top = header_top + ROW_H * (i + 1)
    y_rect = PAGE_H - row_top - ROW_H
    c.setFillColorRGB(*(ROW_A if i % 2 == 0 else ROW_B))
    c.rect(X_LEFT, y_rect, X_RIGHT - X_LEFT, ROW_H, stroke=0, fill=1)
    c.setStrokeColorRGB(*RULE)
    c.line(X_LEFT, y_rect, X_RIGHT, y_rect)
    ty = y_rect + 10
    text(COL_X[0], ty, ch, "Helvetica-Bold", 9, WHITE)
    text(COL_X[1], ty, source, "Helvetica-Bold", 9, WHITE)
    text(COL_X[2], ty, mic, "Helvetica", 9, WHITE)
    text(COL_X[3], ty, note, "Helvetica", 9, WHITE)

table_bottom = header_top + ROW_H * (len(ROWS) + 1)

# advance notes box
box_top = table_bottom + 26
box_h = 92
c.setFillColorRGB(*BOX_BG)
c.setStrokeColorRGB(*RULE)
c.setLineWidth(3)
c.rect(X_LEFT, PAGE_H - box_top - box_h, X_RIGHT - X_LEFT, box_h, stroke=1, fill=1)
text(50, PAGE_H - box_top - 24, "Advance notes", "Helvetica-Bold", 11, YELLOW)
text(50, PAGE_H - box_top - 42,
     "- Please confirm available power, load-in path, stage dimensions, and whether the venue or band provides PA.",
     "Helvetica", 9.5, WHITE)
text(50, PAGE_H - box_top - 56,
     "- Exact channel count can change by room and show format. Email for final details.",
     "Helvetica", 9.5, WHITE)

# footer
c.setStrokeColorRGB(*RULE)
c.setLineWidth(3)
c.line(X_LEFT, 38, X_RIGHT, 38)
text(36, 22,
     "info@rocksteadybandaz.com  |  rocksteadybandaz.com/book  |  facebook.com/rocksteadybandaz",
     "Helvetica", 8, GRAY)

c.showPage()
c.save()
print(f"wrote {OUT_PATH.relative_to(REPO_ROOT)}")
