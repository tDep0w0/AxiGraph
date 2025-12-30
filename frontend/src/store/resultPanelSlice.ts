import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isOn: boolean;
  title: string;
  positions: number[];
} = {
  isOn: false,
  title: "",
  positions: [],
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
    setPositions: (state, action: PayloadAction<number[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { openPanel, closePanel, setTitle, setPositions } =
  resultPanelSlice.actions;
export default resultPanelSlice.reducer;
