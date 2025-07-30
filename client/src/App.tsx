import { CopilotPopup } from "@copilotkit/react-ui";
import { useSearchGoogle } from "./hooks/useSearchGoogle";
import { useCopilotState } from "./hooks//copilotkit/useCopilotState";
import { useAction } from "./hooks//copilotkit/useAction";
import { useInstruction } from "./hooks/copilotkit/useInstructions";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import {
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { MindMapNode } from "./types/MindMapNode";
import { layoutMindMapFromTree } from "./utils/layoutMindMapFromTree";
import type { LinkNode } from "./types/LinkNode";
import { nodeTypes } from "./types/nodeTypes";
import ResultPanel from "./components/ResultPanel";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "./state/store";
import { setSearchResults } from "./state/dataSlice";
import { usePanel } from "./hooks/usePanel";

function App() {
  const [prompt, setPrompt] = useState("");
  const { data, refetch } = useSearchGoogle(prompt);
  const [displayData, setDisplayData] = useState<MindMapNode>();

  const dispatch = useDispatch<AppDispatch>();

  useCopilotState({
    data,
    currentData: displayData,
  });
  useAction({
    fetchData: async () => {
      await refetch();
      dispatch(setSearchResults(data));
    },
    setData: setDisplayData,
    setPrompt: setPrompt,
  });
  useInstruction();

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<LinkNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { isOn, title, close, filteredResults } = usePanel();

  useEffect(() => {
    const { nodes, edges } = layoutMindMapFromTree(displayData);

    setNodes(nodes.map((node) => ({ ...node, type: "mindMapNode" })));
    setEdges(edges);
    fitView();
  }, [setNodes, setEdges, fitView, displayData, data, dispatch]);

  return (
    <>
      {isOn && (
        <ResultPanel
          results={filteredResults}
          title={title}
          closePanel={close}
        />
      )}
      <div className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeClickDistance={1000000}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{ animated: true }}
          proOptions={{ hideAttribution: true }}
          colorMode="dark"
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
      <CopilotPopup
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Assistant",
          initial: "Need any help?",
        }}
      />
    </>
  );
}

export default App;
