import type { MindMapNode } from "../types/MindMapNode";

export const treeData: MindMapNode = {
  id: "coffee",
  data: { label: "Coffee", indices: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  children: [
    {
      id: "general-information",
      data: { label: "General Information", indices: [1, 5] },
      children: [],
    },
    {
      id: "health-benefits",
      data: { label: "Health Benefits", indices: [3] },
      children: [],
    },
    {
      id: "products-and-purchases",
      data: { label: "Products and Purchases", indices: [2, 4, 6, 8] },
      children: [],
    },
    {
      id: "community-and-resources",
      data: { label: "Community and Resources", indices: [7, 9] },
      children: [],
    },
  ],
};
