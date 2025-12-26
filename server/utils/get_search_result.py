from services.search import search
from services.fetch_html import fetch_html
from utils.get_info_from_html import get_info_from_html
import asyncio
import aiohttp
from models import SearchResult


async def get_search_result(q: str) -> list[SearchResult]:
    raw_data = search(q)

    patent_links = [result.get("patent_link") for result in raw_data]

    async with aiohttp.ClientSession() as session:
        htmls_coros = [fetch_html(session, url) for url in patent_links]
        htmls = await asyncio.gather(*htmls_coros)

    print("Extracting info...")
    search_infos = [get_info_from_html(html_str) for html_str in htmls]

    return [
        {
            **result,
            "title_full": patent_data["title"],
            "abstract": patent_data["abstract"],
        }
        for result, patent_data in zip(raw_data, search_infos)
    ]


if __name__ == "__main__":

    async def main():
        result = await get_search_result("machine learning")
        print(result)

    asyncio.run(main())
