from lxml import html
from services.format_patent_title import format_patent_title
from models import PatentData


def get_info_from_html(html_string: str) -> PatentData:
    tree = html.fromstring(html_string)
    print("extracting...")

    # Extract title
    raw_title = tree.xpath("string(//title)") or ""
    title = format_patent_title(raw_title.strip())

    # Extract meta description
    meta = tree.xpath(
        "//meta[translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='description']/@content"
    )
    abstract = meta[0].strip() if meta else ""

    return {"title": title, "abstract": abstract}
