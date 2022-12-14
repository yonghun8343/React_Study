import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./feature/counterSlice";
import "./App.css";

function App() {
  // 스토어에서 원하는 값을 선택하여 가지고 올 수 있습니다.
  // counterSlice에서 initValue로 만든 value를 가지고 옵니다.
  const count = useSelector((state) => {
    return state.counterReducer.value;
  });
  // useDispatch를 변수에 넣어서 사용한다.
  // counterSlice에서 선언 했던 increment와 decrement를 사용 할 수 있게 되었다.
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // 디스패치를 선언 한 후 리듀서를 호출 해 준다.
          dispatch(increment());
        }}
      >
        +
      </button>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          // 디스패치를 선언 한 후 리듀서를 호출 해 준다.
          dispatch(decrement());
        }}
      >
        -
      </button>
    </div>
  );
}

export default App;
