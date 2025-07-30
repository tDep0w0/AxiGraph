import { useCopilotReadable } from "@copilotkit/react-core";
import type { SearchResult } from "../../types/SearchResult";
import { MindMapNodeObj } from "../../types/MindMapObj";
import type { MindMapNode } from "../../types/MindMapNode";
import { SearchResultObj } from "../../types/searchResultsObj";

export const useCopilotState = ({
  data,
  currentData,
}: {
  data?: SearchResult[];
  currentData?: MindMapNode;
}) => {
  useCopilotReadable({
    description:
      "The starting, unfiltered list of websites fetched from the backend",
    value: data,
  });

  useCopilotReadable({
    description: "The current data, which is of type MindMapNode",
    value: currentData,
  });

  useCopilotReadable({
    description: `MindMapNode type`,
    value: MindMapNodeObj,
  });

  useCopilotReadable({
    description:
      "SearchResult type, which is the type of each result returned by the backend",
    value: SearchResultObj,
  });
};
