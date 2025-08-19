from bs4 import BeautifulSoup, Tag
from utils.format_patent_title import format_patent_title
from models import PatentData


def get_info_from_html(html_string: str) -> PatentData:
    soup = BeautifulSoup(html_string, "html.parser")

    # Extract the title
    raw_title = soup.title.get_text(strip=True) if soup.title else ""
    title = format_patent_title(raw_title)

    # Extract meta description
    meta_tag = soup.find("meta", {"name": "description"})
    abstract = str(meta_tag.get("content")).strip() if isinstance(meta_tag, Tag) else ""

    return {"title": title, "abstract": abstract}
