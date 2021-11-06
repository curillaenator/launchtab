import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoadings {
  isAppLoading: boolean;
  isDataLoading: boolean;
  isDataSyncing: boolean;
}

const initialState: ILoadings = {
  isAppLoading: false,
  isDataLoading: false,
  isDataSyncing: false,
};

const loadingsSlice = createSlice({
  name: "loadings",
  initialState,
  reducers: {
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },

    setIsDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },

    setIsDataSyncing: (state, action: PayloadAction<boolean>) => {
      state.isDataSyncing = action.payload;
    },
  },
});

export const loadings = loadingsSlice.reducer;

export const { setIsAppLoading, setIsDataLoading, setIsDataSyncing } =
  loadingsSlice.actions;
