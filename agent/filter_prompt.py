from langchain_core.messages import SystemMessage

filter_prompt = SystemMessage(
    content="""
      You are given a search result item containing a title and snippet
      Your task is to decide whether this item is closely related to a given phrase.

      Only output "yes" if the item is directly relevant to the phrase.

      Only output "no" if it is not directly relevant.

      Do not explain your answer.
      Output must be exactly "yes" or "no".

      Important: Reason before giving your final answer.
    """
)
