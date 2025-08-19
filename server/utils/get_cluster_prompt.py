from langchain_core.messages import SystemMessage


def get_cluster_prompt(group_num_min: int, group_num_max: int) -> SystemMessage:
    if group_num_min == group_num_max:
        group_num_str = group_num_min
    else:
        group_num_str = f"{group_num_min} to {group_num_max}"

    return SystemMessage(
        content=f"""
          You are refining a large thematic group into smaller sub-groups.

          Given:
          - A list of search result items, each with a title, snippet, and position (position is a unique integer ID).
          - You **must** group them into {group_num_str} sub-groups, no more, no less.

          **Rules for grouping:**
          1. Each sub-group must be semantically distinct.
          2. Each sub-group must have a clear, concise label.
          3. Each search result position must appear **exactly once** across all sub-groups.
          4. No position may be duplicated or omitted — the union of all positions in your output must exactly match the set of input positions.
          5. Positions must remain integers.
          6. Reason before giving your answer.

          **Your process:**
          - First, internally list all input positions to ensure completeness.
          - Group the positions into 2-3 semantically distinct sub-groups with non-overlapping positions.
          - Verify that your output includes every input position exactly once before returning the answer.

          **Output format:**
          [
            {{ "label": "sub-topic 1", "positions": [4, 7] }},
            {{ "label": "sub-topic 2", "positions": [1, 3, 6] }},
            {{ "label": "sub-topic 3", "positions": [2, 5] }}
          ]

          **Important:**  
          - Return only a valid JSON string — no commentary, explanations, or Markdown formatting.
          - The JSON must be syntactically valid.
          - When no meaningful further subdivision is possible, return an empty array ([]).
        """
    )
