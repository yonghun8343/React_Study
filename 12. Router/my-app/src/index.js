import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader } from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

// createBrowserRouter는 라우터에 대한 경로를 생성 합니다.
// RouterProvider는 우리가 createBrowserRouter에서 만든 경로를 리액트에게 제공 해 줍니다.

// 라우트 경로를 만들어 줍니다.
const router = createBrowserRouter([
  {
    path: "/", // 경로 설정
    element: <Root />, // 해당 경로에 나올 JSX 설정
    errorElement: <ErrorPage />, // 페이지를 못찾을 경우 이쪽으로 전달
    loader: rootLoader,
    action: rootAction,
    children: [
      // 자식 페이지 추가
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

/** RouterProvider에서 정보를 제공 받아 사용 * */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
