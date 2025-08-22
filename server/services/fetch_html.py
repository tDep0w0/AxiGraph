from aiohttp import ClientSession
import ssl
import certifi

ssl_context = ssl.create_default_context(cafile=certifi.where())

count = 0


async def fetch_html(session: ClientSession, url: str) -> str:
    global count
    async with session.get(url, ssl=ssl_context) as response:
        response.raise_for_status()
        result = await response.text()
        count += 1
        print(f"{count} htmls fetched")
        return result


if __name__ == "__main__":
    pass
