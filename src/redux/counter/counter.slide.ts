import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const increaseSagaFinish = createAction<{ value: number }>(
  "incrementSagaFinish"
);

export const decreaseSagaFinish = createAction<{ value: number }>(
  "decreaseSagaFinish"
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    incrementSagaStart: (state) => {
      state.status = "loading";
    },

    decreaseSagaStart: (state) => {
      state.status = "loading";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(increaseSagaFinish, (state, action) => {
      state.status = "idle";
      state.value += action.payload.value;
    });

    builder.addCase(decreaseSagaFinish, (state, action) => {
      state.status = "idle";
      state.value -= action.payload.value;
    });
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  incrementSagaStart,
  decreaseSagaStart,
} = counterSlice.actions;

export default counterSlice.reducer;
