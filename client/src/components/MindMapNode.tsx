import type React from "react";
import type { LinkNode } from "../types/LinkNode";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../state/store";
import { openPanel, setPositions, setTitle } from "../state/resultPanelSlice";

const MindMapNode: React.FC<NodeProps<LinkNode>> = ({
  data: { label, relevancy, positions },
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { fitView } = useReactFlow();

  return (
    <div
      onClick={() => {
        dispatch(setTitle(label));
        dispatch(setPositions(positions ?? []));
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
      className="group relative flex justify-center
                bg-[#1e1e1e] w-[150px] border-1 p-[10px]
                  text-white text-[12px] text-center
                  border-[#3c3c3c] rounded-md cursor-pointer 
                  hover:bg-[#2d2d2d] active:bg-[#424242]"
    >
      <div
        className="absolute flex justify-center 
                  top-[-40px] w-[70%]
                  px-2 py-1 scale-0
                  rounded-md text-[16px] bg-[#4d4d4d]
                  group-hover:scale-100 origin-bottom
                  transition-all duration-75"
      >
        {relevancy}%
      </div>
      <Handle type="target" position={Position.Left} />
      {label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default MindMapNode;
