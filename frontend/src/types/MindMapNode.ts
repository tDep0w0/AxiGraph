export type MindMapNode = {
  id?: string;
  data?: {
    label: string;
    positions?: number[];
  };
  children?: MindMapNode[];
};
