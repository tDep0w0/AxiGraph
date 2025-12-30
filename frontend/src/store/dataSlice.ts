import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchResult } from "../types/SearchResult";

const initialState: {
  searchResults?: SearchResult[];
} = {
  searchResults: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSearchResults: (
      state,
      action: PayloadAction<SearchResult[] | undefined>
    ) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchResults } = dataSlice.actions;
export default dataSlice.reducer;
