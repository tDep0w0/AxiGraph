import type { MindMapNode } from "../types/MindMapNode";

export const treeData: MindMapNode = {
  id: "100c2520-b625-496e-b003-617f1a12c12c",
  data: {
    label: "coffee",
    positions: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    ],
  },
  children: [
    {
      id: "330a45e7-2a7f-41b1-8d88-be582cc242c6",
      data: { label: "Coffee Basics", positions: [1, 8, 21, 22] },
      children: [],
    },
    {
      id: "3978db9f-3253-4f4d-8024-fe0fc3c7365d",
      data: {
        label: "Coffee Products and Brands",
        positions: [2, 4, 5, 7, 9, 10, 11, 12, 13, 23, 30, 31],
      },
      children: [
        {
          id: "aa0fa0ea-0f19-487d-afad-872dc5676d56",
          data: {
            label: "Coffee Brands",
            positions: [2, 4, 5, 7, 9, 10, 11, 12, 13, 23],
          },
          children: [],
        },
        {
          id: "32537b6d-e2ac-4774-bd55-2172638559c4",
          data: { label: "Coffee Services", positions: [30, 31] },
          children: [],
        },
      ],
    },
    {
      id: "9da7f448-a824-4baf-9232-81e4998e07f0",
      data: {
        label: "Health and Nutrition",
        positions: [6, 15, 18, 24, 33, 36],
      },
      children: [
        {
          id: "febcfc1e-dc21-4418-a924-936e197d44ec",
          data: {
            label: "Health Benefits of Coffee",
            positions: [15, 18, 24, 33],
          },
          children: [],
        },
        {
          id: "a1021587-7550-40af-8984-ed5eabf90196",
          data: {
            label: "Nutritional Aspects of Coffee",
            positions: [6, 36],
          },
          children: [],
        },
      ],
    },
    {
      id: "4f139a6b-567a-4467-9560-ed02abb198bf",
      data: {
        label: "Coffee Culture and Community",
        positions: [3, 14, 17, 19, 20, 26, 34, 38, 39],
      },
      children: [
        {
          id: "a0c58aeb-7df2-4bb0-81d3-828e23ba3bdd",
          data: {
            label: "Coffee Resources and Communities",
            positions: [3, 14, 26],
          },
          children: [],
        },
        {
          id: "6db466a1-936b-4acb-871d-70567184be6e",
          data: {
            label: "Coffee Shops and Experiences",
            positions: [17, 19, 39],
          },
          children: [],
        },
        {
          id: "11637b70-2351-499d-9cf8-46b1d30612e7",
          data: {
            label: "Coffee Culture and Lifestyle",
            positions: [20, 34, 38],
          },
          children: [],
        },
      ],
    },
    {
      id: "46e90532-ce0e-4840-962e-70edb1fe3ba2",
      data: {
        label: "Coffee Industry and Economics",
        positions: [27, 28, 29, 37],
      },
      children: [],
    },
  ],
};
