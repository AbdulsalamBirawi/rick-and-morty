import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const favouriteItems =
  localStorage.getItem("addFavorite") !== null
    ? JSON.parse(localStorage.getItem("addFavorite") || "{}")
    : [];
const favouriteInitialState: {
  data: any[];
} = {
  data: favouriteItems,
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: favouriteInitialState,
  reducers: {
    addfavourite: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.concat(payload);
      localStorage.setItem("addFavorite", JSON.stringify(state.data));
    },
    removeFromFavourite: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.filter((e, idx) => e !== payload);
      localStorage.removeItem(JSON.stringify(state.data));
    },
  },
});

export default favouriteSlice.reducer;
export const { addfavourite, removeFromFavourite } = favouriteSlice.actions;
export const selectfavourite = (state: { favourite: { data: any } }) => {
  console.log(state);
  return state.favourite.data;
};
