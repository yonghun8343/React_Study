import React, { useMemo, useState } from "react";
import Buttons from "./Buttons";
import Get from "./Get";
import Post from "./Post";
import Put from "./Put";
import Delete from "./Delete";
import Error from "./Error";
import "./App.css";

function App() {
  const [state, changeState] = useState("default");
  const [isLoading, changeIsLoading] = useState(false);

  const change = (btnState) => {
    changeState(btnState);
  };

  const setIsLoading = (loading) => {
    changeIsLoading(loading);
  };

  const getComponent = () => {
    switch (state) {
      case "GET":
        return <Get isLoading={isLoading} setIsLoading={setIsLoading} />;

      case "POST":
        return <Post isLoading={isLoading} setIsLoading={setIsLoading} />;

      case "PUT":
        return <Put isLoading={isLoading} setIsLoading={setIsLoading} />;

      case "DELETE":
        return <Delete isLoading={isLoading} setIsLoading={setIsLoading} />;

      case "ERROR":
        return <Error isLoading={isLoading} setIsLoading={setIsLoading} />;

      case "default":
        return false;

      default:
        console.error("에러!!!");
        return false;
    }
  };

  const memo = useMemo(() => {
    return getComponent();
  }, [state, isLoading]);

  return (
    <>
      <Buttons onClick={change} />
      <div>
        <span>
          {isLoading === false
            ? `현재 상태는 ${state} 입니다.`
            : `${state} 로딩중 ...`}
        </span>
      </div>
      {memo}
    </>
  );
}

export default App;
