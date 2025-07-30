export const SearchResultObj = {
  position: "number",
  title: "string",
  link: "string",
  redirect_link: "string",
  displayed_link: "string",
  favicon: "string",
  thumbnail: "string",
  snippet: "string",
  snippet_highlighted_words: "string[]",
  sitelinks: `{
    inline: {
      title: string;
      link: string;
    }[];
  }`,
  rich_snippet: `{
    bottom?: {
      detected_extensions?: {
        rating?: number;
        reviews?: number;
        price?: number;
        currency?: string;
      };
      extensions?: string[];
    };
  };`,
  source: "string",
};
