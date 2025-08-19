import serpapi
import os
from dotenv import load_dotenv
from models import SearchResult

load_dotenv()

client = serpapi.Client(api_key=os.getenv("SERPAPI_KEY"))


def search(q: str) -> list[SearchResult]:
    results = client.search(q=q, engine="google_patents", num=30)
    organic_results: list[SearchResult] = list(results["organic_results"])

    return [
        {
            "position": result.get("position"),
            "title": result.get("title"),
            "snippet": result.get("snippet"),
            "patent_link": result.get("patent_link"),
            "thumbnail": result.get("thumbnail"),
            "abstract": None,
            "title_full": None,
        }
        for result in organic_results
    ]


if __name__ == "__main__":
    print(type(search("machine")))
