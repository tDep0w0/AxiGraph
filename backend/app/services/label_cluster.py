from models import PatentData
from agent.prompts.label_prompt import label_prompt
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv

load_dotenv()


async def label_cluster(data: list[PatentData]) -> str:
    """Create a short label for the cluster using LLM."""

    label_model = ChatOpenAI(model="gpt-4o-mini")

    text_blocks = [
        f"- {patent.get("title", "No title")}: {patent.get("abstract", "No abstract")}"
        for patent in data
    ]
    joined_text = "\n".join(text_blocks)

    response = await label_model.ainvoke(
        [label_prompt, HumanMessage(content=joined_text)]
    )
    formatted_response = str(response.content).strip('"').strip("'").strip("*")

    return formatted_response
