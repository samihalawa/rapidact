#!/usr/bin/env python3
"""Build the public RapidAct specimen PDF from the canonical Markdown report."""

from __future__ import annotations

import re
import shutil
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content/en/reports/example-eu-ai-act-assessment.md"
OUTPUT = ROOT / "output/pdf/rapidact-specimen-assessment.pdf"
PUBLIC = ROOT / "public/reports/rapidact-specimen-assessment.pdf"

INK = colors.HexColor("#16181D")
SOFT = colors.HexColor("#5C6370")
BLUE = colors.HexColor("#1F3A5F")
RULE = colors.HexColor("#D9D9D3")
PAPER = colors.HexColor("#F7F7F3")
RED = colors.HexColor("#9B1C1C")
WHITE = colors.white


def parse_source() -> tuple[dict[str, str], list[tuple[str, object]]]:
    raw = SOURCE.read_text(encoding="utf-8")
    front, body = raw.split("---", 2)[1:]
    meta: dict[str, str] = {}
    for line in front.strip().splitlines():
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip().strip('"')

    blocks: list[tuple[str, object]] = []
    lines = body.strip().splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line.startswith("## "):
            blocks.append(("heading", line[3:]))
            i += 1
            continue
        if line.startswith("| "):
            rows: list[list[str]] = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                row = [cell.strip() for cell in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"-+", cell) for cell in row):
                    rows.append(row)
                i += 1
            blocks.append(("table", rows))
            continue
        if line.startswith("> "):
            blocks.append(("quote", line[2:]))
            i += 1
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not lines[i].strip().startswith(("## ", "| ", "> ")):
            paragraph.append(lines[i].strip())
            i += 1
        blocks.append(("paragraph", " ".join(paragraph)))
    return meta, blocks


def rich(text: str) -> str:
    escaped = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped)
    return escaped


styles = getSampleStyleSheet()
BODY = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=9.2,
    leading=14,
    textColor=INK,
    spaceAfter=8,
)
SMALL = ParagraphStyle(
    "Small",
    parent=BODY,
    fontSize=7.5,
    leading=10.5,
    textColor=SOFT,
)
SECTION = ParagraphStyle(
    "Section",
    parent=styles["Heading1"],
    fontName="Helvetica-Bold",
    fontSize=20,
    leading=23,
    textColor=INK,
    spaceAfter=14,
)
LABEL = ParagraphStyle(
    "Label",
    parent=SMALL,
    fontName="Helvetica-Bold",
    fontSize=7,
    leading=9,
    tracking=1.3,
    textColor=BLUE,
)
QUOTE = ParagraphStyle(
    "Quote",
    parent=BODY,
    fontName="Helvetica",
    fontSize=9,
    leading=14,
    textColor=INK,
    leftIndent=11,
    rightIndent=7,
    borderColor=BLUE,
    borderWidth=0,
    borderPadding=0,
)


def footer(canvas, doc) -> None:
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(20 * mm, 15 * mm, width - 20 * mm, 15 * mm)
    canvas.setFillColor(SOFT)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(20 * mm, 9.5 * mm, "RapidAct · Specimen assessment · Ref SPECIMEN")
    canvas.drawRightString(width - 20 * mm, 9.5 * mm, f"{doc.page}")
    canvas.restoreState()


def cover(canvas, doc) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(INK)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#263244"))
    canvas.rect(0, height - 7 * mm, width, 7 * mm, fill=1, stroke=0)
    canvas.restoreState()


def make_table(rows: list[list[str]]) -> Table:
    cols = len(rows[0])
    widths = {
        4: [35 * mm, 52 * mm, 38 * mm, 42 * mm],
    }.get(cols, [167 * mm / cols] * cols)
    data = [
        [Paragraph(rich(cell), SMALL if idx else ParagraphStyle("TH", parent=SMALL, fontName="Helvetica-Bold", textColor=WHITE)) for cell in row]
        for idx, row in enumerate(rows)
    ]
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("BACKGROUND", (0, 1), (-1, -1), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.45, RULE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def build() -> None:
    meta, blocks = parse_source()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=21 * mm,
        bottomMargin=21 * mm,
        title="RapidAct specimen EU AI Act assessment",
        author="Agents AI Ltd.",
        subject="Illustrative RapidAct assessment deliverable",
    )
    normal_frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="normal",
    )
    cover_frame = Frame(20 * mm, 20 * mm, A4[0] - 40 * mm, A4[1] - 40 * mm, id="cover")
    doc.addPageTemplates(
        [
            PageTemplate(id="Cover", frames=[cover_frame], onPage=cover),
            PageTemplate(id="Body", frames=[normal_frame], onPage=footer),
        ]
    )

    story = []
    story.extend(
        [
            Spacer(1, 28 * mm),
            Paragraph("RAPIDACT / SPECIMEN", ParagraphStyle("CoverLabel", parent=LABEL, textColor=colors.HexColor("#AFC4E0"))),
            Spacer(1, 8 * mm),
            Paragraph(
                "EU AI Act<br/>Company Assessment",
                ParagraphStyle(
                    "CoverTitle",
                    parent=SECTION,
                    fontSize=34,
                    leading=38,
                    textColor=WHITE,
                    spaceAfter=0,
                ),
            ),
            Spacer(1, 10 * mm),
            Paragraph(
                meta["subject"],
                ParagraphStyle("Subject", parent=SECTION, fontSize=18, leading=22, textColor=WHITE),
            ),
            Paragraph(
                meta["subjectNote"],
                ParagraphStyle("SubjectNote", parent=BODY, fontSize=10, leading=15, textColor=colors.HexColor("#C8CDD5")),
            ),
            Spacer(1, 64 * mm),
            Table(
                [
                    [Paragraph("REFERENCE", LABEL), Paragraph("STATUS", LABEL), Paragraph("UPDATED", LABEL)],
                    [Paragraph(meta["ref"], ParagraphStyle("CoverData", parent=BODY, textColor=WHITE)), Paragraph("ILLUSTRATIVE", ParagraphStyle("CoverData2", parent=BODY, textColor=WHITE)), Paragraph(meta["updated"], ParagraphStyle("CoverData3", parent=BODY, textColor=WHITE))],
                ],
                colWidths=[55 * mm, 55 * mm, 55 * mm],
                style=TableStyle(
                    [
                        ("LINEABOVE", (0, 0), (-1, 0), 0.6, colors.HexColor("#536174")),
                        ("TOPPADDING", (0, 0), (-1, -1), 7),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                    ]
                ),
            ),
            Spacer(1, 12 * mm),
            Paragraph(
                "Published so you can inspect the format, depth and decision logic before buying. "
                "Meridian Retail Group is invented; no real client information appears in this document.",
                ParagraphStyle("CoverNote", parent=BODY, fontSize=8.5, leading=13, textColor=colors.HexColor("#C8CDD5")),
            ),
            PageBreak(),
        ]
    )
    doc.handle_nextPageTemplate("Body")

    headings = [value for kind, value in blocks if kind == "heading"]
    story.extend(
        [
            Paragraph("DOCUMENT CONTROL", LABEL),
            Spacer(1, 3 * mm),
            Paragraph("How to read this specimen", SECTION),
            Paragraph(
                "This is the full structure of the paid RapidAct assessment, filled with an invented "
                "company's systems. The report separates observed facts, classification, required "
                "actions and issues that need specialist legal advice. It does not present the "
                "website, scanner or badge as evidence of compliance.",
                BODY,
            ),
            Spacer(1, 4 * mm),
            Table(
                [
                    [Paragraph("Document", SMALL), Paragraph("RapidAct specimen assessment", BODY)],
                    [Paragraph("Prepared for", SMALL), Paragraph(meta["subject"], BODY)],
                    [Paragraph("Prepared by", SMALL), Paragraph("Agents AI Ltd. · RapidAct", BODY)],
                    [Paragraph("Status", SMALL), Paragraph("Illustrative / not legal advice", BODY)],
                    [Paragraph("Reference", SMALL), Paragraph(meta["ref"], BODY)],
                ],
                colWidths=[40 * mm, 127 * mm],
                style=TableStyle(
                    [
                        ("GRID", (0, 0), (-1, -1), 0.45, RULE),
                        ("BACKGROUND", (0, 0), (0, -1), PAPER),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 8),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                        ("TOPPADDING", (0, 0), (-1, -1), 7),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                    ]
                ),
            ),
            Spacer(1, 10 * mm),
            Paragraph("CONTENTS", LABEL),
            Spacer(1, 3 * mm),
        ]
    )
    contents = []
    for idx, heading in enumerate(headings, start=3):
        contents.append([Paragraph(heading, BODY), Paragraph(str(idx), ParagraphStyle("PageNum", parent=BODY, alignment=TA_LEFT, textColor=SOFT))])
    story.append(
        Table(
            contents,
            colWidths=[153 * mm, 14 * mm],
            style=TableStyle(
                [
                    ("LINEBELOW", (0, 0), (-1, -1), 0.35, RULE),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            ),
        )
    )

    first_section = True
    for kind, value in blocks:
        if kind == "heading":
            story.append(PageBreak())
            first_section = False
            story.extend([Paragraph("ASSESSMENT SECTION", LABEL), Spacer(1, 3 * mm), Paragraph(rich(str(value)), SECTION)])
        elif kind == "paragraph":
            story.append(Paragraph(rich(str(value)), BODY))
        elif kind == "quote":
            story.append(
                KeepTogether(
                    [
                        Spacer(1, 3 * mm),
                        Table(
                            [[Paragraph(rich(str(value)), QUOTE)]],
                            colWidths=[167 * mm],
                            style=TableStyle(
                                [
                                    ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                                    ("LINEBEFORE", (0, 0), (0, -1), 2, BLUE),
                                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                                    ("TOPPADDING", (0, 0), (-1, -1), 9),
                                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                                ]
                            ),
                        ),
                        Spacer(1, 3 * mm),
                    ]
                )
            )
        elif kind == "table":
            story.extend([Spacer(1, 2 * mm), make_table(value), Spacer(1, 3 * mm)])

    story.extend(
        [
            Spacer(1, 8 * mm),
            Table(
                [[Paragraph("<b>Scope note.</b> This document is a technical and organisational compliance assessment. It is not legal advice. Where a question turns on a point of law, the report identifies that question for counsel.", SMALL)]],
                colWidths=[167 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                        ("BOX", (0, 0), (-1, -1), 0.5, RULE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 9),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                        ("TOPPADDING", (0, 0), (-1, -1), 8),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ]
                ),
            )
        ]
    )

    doc.build(story)
    shutil.copy2(OUTPUT, PUBLIC)
    print(f"Generated {OUTPUT.relative_to(ROOT)}")
    print(f"Published {PUBLIC.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
