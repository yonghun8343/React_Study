import { useRouteError } from "react-router-dom";
import React from "react";

function ErrorPage() {
  // 에러를 받아와서 error 변수에 넣어 줌
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
