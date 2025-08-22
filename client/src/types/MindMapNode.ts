export type MindMapNode = {
  id?: string;
  data?: {
    label: string;
    relevancy: number;
    positions?: number[];
  };
  children?: MindMapNode[];
};
