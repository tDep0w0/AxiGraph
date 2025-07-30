import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchResult } from "../types/SearchResult";
import { searchResults } from "../constants/searchResults";

const initialState: {
  searchResults?: SearchResult[];
} = {
  searchResults: searchResults,
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
