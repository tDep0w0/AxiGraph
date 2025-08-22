import type { Node } from "@xyflow/react";

export type LinkNode = Node<{
  label: string;
  relevancy: number;
  positions?: number[];
}>;
