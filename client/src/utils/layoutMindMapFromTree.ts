import type { Edge } from "@xyflow/react";
import type { MindMapNode } from "../types/MindMapNode";
import { hierarchy, tree } from "d3-hierarchy";
import type { LinkNode } from "../types/LinkNode";

export function layoutMindMapFromTree(
  rawTree?: MindMapNode,
  nodeSize = { x: 180, y: 100 }
): { nodes: LinkNode[]; edges: Edge[] } {
  if (!rawTree) return { nodes: [], edges: [] };

  const root = hierarchy(rawTree);

  const layout = tree<MindMapNode>().nodeSize([nodeSize.x, nodeSize.y]);
  const treeData = layout(root);

  const nodes: LinkNode[] = [];
  const edges: Edge[] = [];

  treeData.each((d) => {
    nodes.push({
      id: d.data.id,
      data: d.data.data ?? { label: d.data.id },
      position: { x: d.x, y: d.y },
    });

    if (d.parent) {
      edges.push({
        id: `e${d.parent.data.id}-${d.data.id}`,
        source: d.parent.data.id,
        target: d.data.id,
      });
    }
  });

  return { nodes, edges };
}
