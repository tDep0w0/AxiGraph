def format_patent_title(title: str) -> str:
    return title.replace("- Google Patents", "").split(" - ", 1)[-1].strip()


if __name__ == "__main__":
    title = "US11768636B2 - Generating a transformed dataset for use by a machine learning model in an artificial intelligence infrastructure \n - Google Patents"
    print(format_patent_title(title))
