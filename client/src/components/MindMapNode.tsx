import type React from "react";
import type { LinkNode } from "../types/LinkNode";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../state/store";
import { openPanel, setIndices, setTitle } from "../state/resultPanelSlice";

const MindMapNode: React.FC<NodeProps<LinkNode>> = ({
  data: { label, indices },
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { fitView } = useReactFlow();

  return (
    <div
      onClick={() => {
        dispatch(setTitle(label));
        dispatch(setIndices(indices ?? []));
        dispatch(openPanel());
        fitView({
          padding: {
            left: "645px",
            right: "30px",
            top: "30px",
            bottom: "30px",
          },
          duration: 200,
        });
      }}
      className="bg-[#1e1e1e] w-[150px] text-white border-[#3c3c3c] border-1 p-[10px] text-[12px] rounded-md text-center cursor-pointer hover:bg-[#2d2d2d] active:bg-[#424242]"
    >
      <Handle type="target" position={Position.Top} />
      {label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default MindMapNode;
