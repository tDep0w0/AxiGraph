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
import { layoutMindMapFromTree } from "./utils/layoutMindMapFromTree";
import type { LinkNode } from "./types/LinkNode";
import { nodeTypes } from "./types/nodeTypes";
import ResultPanel from "./components/ResultPanel";
import { usePanel } from "./hooks/usePanel";
import { IoChatbubble } from "react-icons/io5";
import Chat from "./components/Chat";
import type { MindMapNode } from "./types/MindMapNode";

function App() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<LinkNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { isOn, title, close, filteredResults } = usePanel();

  const [chatVisible, setChatVisible] = useState(false);
  const [tree, setTree] = useState<MindMapNode>();

  useEffect(() => {
    const { nodes, edges } = layoutMindMapFromTree(tree);

    setNodes(nodes.map((node) => ({ ...node, type: "mindMapNode" })));
    setEdges(edges);
    fitView();
  }, [setEdges, setNodes, fitView, tree]);

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
      <div className="fixed h-fit bottom-6 right-6 flex flex-col items-end space-y-5">
        <Chat
          className={`
              ${
                chatVisible
                  ? "scale-x-100 w-[23vw] h-[70vh]"
                  : "scale-0 w-0 h-0"
              }
              transition-all duration-200 origin-[calc(100%-27px)_100%]
            `}
          setData={(data) => setTree(data)}
        />
        <div
          onClick={() => setChatVisible((prev) => !prev)}
          className="rounded-4xl w-fit p-3 bg-white text-black cursor-pointer hover:rounded-2xl transition-all duration-200"
        >
          <IoChatbubble className="text-3xl" />
        </div>
      </div>
    </>
  );
}

export default App;
