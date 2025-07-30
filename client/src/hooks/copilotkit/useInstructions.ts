import { useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { clusteringInstructions } from "../../constants/ClusteringInstructions";

export const useInstruction = () => {
  useCopilotAdditionalInstructions({
    instructions: `When the user ask anything about providing the data, always and only take the data from the backend, when the data is available, cluster it into subtopics and display it in the form of MindMapNode`,
  });

  useCopilotAdditionalInstructions({
    instructions:
      "When the user ask to filter the list of website, filter it and update the data",
  });

  useCopilotAdditionalInstructions({
    instructions:
      "When asked to give the data but there is no data then you must fetch from the backend",
  });

  useCopilotAdditionalInstructions({
    instructions:
      "When fetching from the backend, you must always update the prompt first",
  });

  useCopilotAdditionalInstructions({
    instructions: `When clustering search results (which is of type SearchResult[]), use must follow these instructions:
      ${clusteringInstructions}
    `,
  });

  useCopilotAdditionalInstructions({
    instructions:
      "After updating the display data, if the data ended up being undefined, ensure the data is valid JSON and update again",
  });
};
