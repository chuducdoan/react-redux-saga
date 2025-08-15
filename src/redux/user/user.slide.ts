import { IUser } from "./../../types/backend.d";
import { createAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isPending: boolean;
  isError: boolean;
  data: IUser[];
  errors: any;

  isCreating: boolean;
  isCreateSuccess: boolean;
}

const initialState: UserState = {
  isPending: false,
  isError: false,
  data: [],
  errors: [],
  isCreating: false,
  isCreateSuccess: false,
};

export const fetchUserPending = createAction("fetchUserPending");
export const fetchUserSuccess = createAction<IUser[]>("fetchUserSuccess");
export const fetchUserFailed = createAction("fetchUserFailed");

export const createUserPending = createAction<{ email: string; name: string }>(
  "createUserPending"
);
export const createUserSuccess = createAction("createUserSuccess");
export const createUserFailed = createAction("createUserFailed");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(fetchUserSuccess, (state, action) => {
        state.isPending = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchUserFailed, (state, action) => {
        state.isPending = false;
        state.isError = true;
        state.errors = action.payload;
      })

      .addCase(createUserPending, (state) => {
        state.isCreating = true;
        state.isCreateSuccess = false;
      })
      .addCase(createUserSuccess, (state) => {
        state.isCreating = false;
        state.isCreateSuccess = true;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
