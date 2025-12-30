from langchain_core.messages import SystemMessage

label_prompt = SystemMessage(
    content="""
      You are given a list of patents (title + abstract)

      Summarize them into a **short, clear cluster label** (max 7 words).
      Examples:
      - "Starbucks, Dunkin, Peet's Coffee" → "Coffee Brands"
      - "Reddit Coffee Forum, Coffee Subreddit" → "Online Community"
      - "History of Coffee, Coffee Wikipedia" → "General Information"

      Return only a valid string — no commentary, explanations, or Markdown formatting.
      Reason before giving your final answer.

      Patent list: \n
    """
)
