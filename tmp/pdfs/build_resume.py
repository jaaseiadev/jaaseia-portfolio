from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output" / "pdf" / "jaaseia-abenoja-resume.pdf"

INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#536176")
ACCENT = colors.HexColor("#2E5AAC")
RULE = colors.HexColor("#D9E0EA")


def link(url: str, label: str) -> str:
    return f'<link href="{url}" color="#{ACCENT.hexval()[2:]}">{label}</link>'


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="ResumeName",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=24,
        textColor=INK,
        spaceAfter=2,
    )
)
styles.add(
    ParagraphStyle(
        name="ResumeTitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=12,
        textColor=MUTED,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.1,
        leading=10,
        textColor=MUTED,
        alignment=TA_LEFT,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.2,
        leading=11,
        textColor=ACCENT,
        uppercase=True,
        spaceBefore=7,
        spaceAfter=3,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.3,
        leading=10.7,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="EntryTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="EntryMeta",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.8,
        leading=9.5,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="ResumeBullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.15,
        leading=10.3,
        leftIndent=9,
        firstLineIndent=-7,
        textColor=INK,
        bulletIndent=0,
        spaceBefore=1,
    )
)
styles.add(
    ParagraphStyle(
        name="SkillLabel",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.1,
        leading=10.2,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="SkillValue",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.1,
        leading=10.2,
        textColor=INK,
    )
)


def section(title: str):
    return [
        Paragraph(title.upper(), styles["Section"]),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceAfter=3),
    ]


def entry(title: str, meta: str, bullets: list[str] | None = None):
    blocks = [
        Table(
            [[Paragraph(title, styles["EntryTitle"]), Paragraph(meta, styles["EntryMeta"])]],
            colWidths=[113 * mm, 42 * mm],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            ),
        )
    ]
    for item in bullets or []:
        blocks.append(Paragraph(f"- {item}", styles["ResumeBullet"]))
    blocks.append(Spacer(1, 2.5))
    return KeepTogether(blocks)


story = [
    Paragraph("Jaaseia Gian R. Abenoja", styles["ResumeName"]),
    Paragraph("Frontend Developer | Computer Science Student", styles["ResumeTitle"]),
    Paragraph(
        " | ".join(
            [
                link("mailto:jaaseiacocabenoja@gmail.com", "jaaseiacocabenoja@gmail.com"),
                link("https://linkedin.com/in/jaaseia", "linkedin.com/in/jaaseia"),
                link("https://github.com/jaaseiadev", "github.com/jaaseiadev"),
                "Philippines",
            ]
        ),
        styles["Contact"],
    ),
    Spacer(1, 4),
]

story += section("Profile")
story += [
    Paragraph(
        "Fourth-year BS Computer Science student and frontend developer focused on building thoughtful, responsive web experiences. Experienced with Next.js, React, TypeScript, Supabase, PostgreSQL, UI/UX design, and AI-assisted development across competition, e-commerce, client portfolio, and civic-information products.",
        styles["Body"],
    )
]

story += section("Technical Skills")
skill_rows = [
    ("Languages", "TypeScript, JavaScript, Python, C, C++"),
    ("Frontend", "React, Next.js, Tailwind CSS, shadcn/ui, Three.js"),
    ("Backend & Data", "Supabase, Node.js, PostgreSQL, GIS"),
    ("Tools & Design", "GitHub, Docker, Figma, Google Stitch, Codex, Antigravity"),
]
story.append(
    Table(
        [[Paragraph(label, styles["SkillLabel"]), Paragraph(value, styles["SkillValue"])] for label, value in skill_rows],
        colWidths=[31 * mm, 124 * mm],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0.7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.7),
            ]
        ),
    )
)

story += section("Experience")
story.append(
    entry(
        "Front-end AI Engineering Intern | FlyRank AI",
        "Remote, Philippines | Aug 2026 - Present",
    )
)

story += section("Selected Projects")
story.append(
    entry(
        "MathWiz | Frontend & UI/UX | Next.js, TypeScript, Supabase, PostgreSQL",
        link("https://mathwiz-arena.vercel.app/", "Live") + " | " + link("https://github.com/M1Vj/centipede", "GitHub"),
        [
            "Built the frontend experience and UI/UX with a three-person team for an online mathematics competition platform serving Mathletes, coaches, and administrators.",
            "Supported reusable problem banks, team and open competition modes, automated scoring, live performance views, and tab-switch integrity logs.",
        ],
    )
)
story.append(
    entry(
        "Decants ni Bro | Next.js, TypeScript, Tailwind CSS, Supabase",
        link("https://decants-ni-bro.vercel.app/", "Live") + " | " + link("https://github.com/jaaseiadev/decants-ni-bro", "GitHub"),
        [
            "Developed the official web platform for a real perfume-decanting business, combining a responsive customer catalog with an administrative dashboard.",
            "Implemented product availability and pricing views plus inventory management, sales tracking, and business statistics.",
        ],
    )
)
story.append(
    entry(
        "Mahaplag Archive | Next.js, React, Python, GIS, Supabase",
        link("https://mahaplag-archive.vercel.app/", "Live") + " | " + link("https://github.com/jaaseiadev/mahaplag.archive", "GitHub"),
        [
            "Created a civic digital archive that organizes local history, research, public records, biodiversity references, community stories, and officials in one accessible resource.",
            "Built interactive coverage of Mahaplag's 28 barangays with GIS-based flood, landslide, and hazard-map exploration.",
        ],
    )
)
story.append(
    entry(
        "Tattoo Site Portfolio | Next.js, React, TypeScript, Tailwind CSS",
        link("https://tattoo-site-ni-emir.vercel.app/", "Live") + " | " + link("https://github.com/jaaseiadev/tattoo-site-ni-emir", "GitHub"),
        [
            "Designed and built a custom, sketchbook-inspired portfolio for tattoo artist Emir Casil Cortez, featuring tactile visual storytelling and responsive navigation.",
            "Integrated the artist profile, selected tattoo archive, colored section bookmarks, and booking information into one cohesive experience.",
        ],
    )
)

story += section("Education")
story.append(
    entry(
        "Bachelor of Science in Computer Science | Visayas State University",
        "Baybay City, Leyte | Aug 2023 - Aug 2027",
        ["Fourth-year student focused on software development, frontend engineering, and artificial intelligence."],
    )
)
story.append(
    entry(
        "Computer Programming Training | ICOT-P E2PS",
        "Philippines | Sep 2022 - Apr 2023",
        ["Studied programming and computational problem-solving using JavaScript and HTML."],
    )
)


def decorate_page(canvas, document):
    canvas.saveState()
    canvas.setFillColor(ACCENT)
    canvas.rect(0, A4[1] - 4, A4[0], 4, stroke=0, fill=1)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(A4[0] - 20 * mm, 10 * mm, "Jaaseia Gian R. Abenoja")
    canvas.restoreState()


doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=20 * mm,
    leftMargin=20 * mm,
    topMargin=15 * mm,
    bottomMargin=15 * mm,
    title="Resume - Jaaseia Gian R. Abenoja",
    author="Jaaseia Gian R. Abenoja",
    subject="Frontend Developer Resume",
)
doc.build(story, onFirstPage=decorate_page, onLaterPages=decorate_page)
print(OUTPUT)
