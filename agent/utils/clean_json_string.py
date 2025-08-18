def clean_json_string(s: str) -> str:
    # Remove common markdown wrappers like ```json ... ```
    return (
        s.strip()
        .removeprefix("```json")
        .removeprefix("```")
        .removesuffix("```")
        .strip()
    )
