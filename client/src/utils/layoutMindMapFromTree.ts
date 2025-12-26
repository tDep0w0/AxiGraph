import type { Edge } from "@xyflow/react";
import type { MindMapNode } from "../types/MindMapNode";
import { hierarchy, tree } from "d3-hierarchy";
import type { LinkNode } from "../types/LinkNode";

export function layoutMindMapFromTree(rawTree?: MindMapNode): {
  nodes: LinkNode[];
  edges: Edge[];
} {
  if (!rawTree) return { nodes: [], edges: [] };

  const root = hierarchy(rawTree);

  const layout = tree<MindMapNode>().nodeSize([80, 200]);

  layout(root);

  const nodes = root.descendants().map((d) => ({
    id: d.data.id ?? "",
    position: { x: d.y ?? 0, y: d.x ?? 0 },
    data: {
      label: d.data?.data?.label ?? "",
      positions: d.data?.data?.positions ?? [],
    },
    type: "default",
  }));

  const edges = root.links().map((link) => ({
    id: `${link.source.data.id}-${link.target.data.id}`,
    source: link.source.data.id ?? "",
    target: link.target.data.id ?? "",
    type: "smoothstep",
  }));

  return { nodes, edges };
}
