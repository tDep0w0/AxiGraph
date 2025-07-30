import { useCopilotAction } from "@copilotkit/react-core";
import type { MindMapNode } from "../..//types/MindMapNode";

export const useAction = ({
  fetchData,
  setData,
  setPrompt,
}: {
  fetchData: () => void;
  setData: (data?: MindMapNode) => void;
  setPrompt: (prompt: string) => void;
}) => {
  useCopilotAction({
    name: "fetchData",
    description: "Fetch the list of websites from the backend",
    handler: fetchData,
  });

  useCopilotAction({
    name: "setDisplayData",
    description: "Update the display data",
    parameters: [
      {
        name: "data",
        description: "The data you just clustered",
      },
    ],
    handler: ({ data }) => {
      console.log("data set", data);
      try {
        setData(JSON.parse(data));
      } catch {
        console.log("error");

        setData(undefined);
      }
    },
  });

  useCopilotAction({
    name: "setPrompt",
    description:
      "Set the search prompt, which is then sent to the backend for data",
    parameters: [
      {
        name: "prompt",
        type: "string",
        description: "The prompt to search in API",
      },
    ],
    handler: ({ prompt }) => {
      console.log("prompt set", prompt);
      setPrompt(prompt);
    },
  });
};
