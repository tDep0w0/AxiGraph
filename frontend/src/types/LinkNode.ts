import type { Node } from "@xyflow/react";

export type LinkNode = Node<{
  label: string;
  positions?: number[];
}>;
