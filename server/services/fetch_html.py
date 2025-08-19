from aiohttp import ClientSession
import ssl
import certifi

ssl_context = ssl.create_default_context(cafile=certifi.where())


async def fetch_html(session: ClientSession, url: str) -> str:
    async with session.get(url, ssl=ssl_context) as response:
        response.raise_for_status()
        return await response.text()


if __name__ == "__main__":
    pass
