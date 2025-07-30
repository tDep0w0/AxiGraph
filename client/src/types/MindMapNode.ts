export type MindMapNode = {
  id: string;
  data?: {
    label: string;
    indices?: number[];
  };
  children?: MindMapNode[];
};
