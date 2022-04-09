import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  pageSizeRedux: 5,
  minRangeRedux: "",
  maxRangeRedux: "",
  unitsRedux: "",
  nameRedux: "",
};

export const pagingSlice = createSlice({
  name: "paging",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setPageSizeRedux: (state, action) => {
      console.log(action.payload);
      state.pageSizeRedux = action.payload;
    },
    setFilterParams: (state, action) => {
      console.log(action.payload);
      state.minRangeRedux = action.payload.min;
      state.maxRangeRedux = action.payload.max;
      state.unitsRedux = action.payload.unit;
      state.nameRedux = action.payload.name;
    },
  },
});

export const { reset, setPageSizeRedux, setFilterParams } = pagingSlice.actions;
export default pagingSlice.reducer;
