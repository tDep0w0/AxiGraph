import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isOn: boolean;
  title: string;
  indices: number[];
} = {
  isOn: false,
  title: "",
  indices: [],
};

const resultPanelSlice = createSlice({
  name: "resultPanel",
  initialState,
  reducers: {
    openPanel: (state) => {
      state.isOn = true;
    },
    closePanel: (state) => {
      state.isOn = false;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setIndices: (state, action: PayloadAction<number[]>) => {
      state.indices = action.payload;
    },
  },
});

export const { openPanel, closePanel, setTitle, setIndices } =
  resultPanelSlice.actions;
export default resultPanelSlice.reducer;
