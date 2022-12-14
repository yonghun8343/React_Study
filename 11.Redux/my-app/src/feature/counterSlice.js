/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

// createSlice는 action과 reducer를 한번에 생성 해 줍니다.
export const counterSlice = createSlice({
  name: "counter", // 이름을 설정 해 줍니다.
  initialState: {
    // 기본 값을 설정 해 줍니다.
    value: 0,
  },
  reducers: {
    // 리듀서의 기능에 대해서 정의 합니다.
    // 원래 파라미터로 받은 값을 수정하는 것은 옳지 않습니다. 하지만 toolkit이 이를 자동으로 처리 해 줍니다.
    // 1씩 증가 하는 리듀서 기능입니다.
    increment: (state) => {
      state.value += 1;
    },
    // 1씩 감소 하는 리듀서 기능입니다.
    decrement: (state) => {
      state.value -= 1;
    },
    // 특정 값을 기준으로 증감 하는 리듀서 기능입니다.
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 각각의 리듀서 기능에 맞추어 액션을 만들어 줍니다.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 방금 만든 slice의 reducer를 기본으로 export 합니다.
export default counterSlice.reducer;
