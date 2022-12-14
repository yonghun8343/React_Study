# React Router

1. 라우터 소개
2. 왜 써야하는지
3. 기능 소개
4. 서브기능 소개
5. 예제

## 라우터 소개

지금까지 우리는 리액트 페이지 내에서 header에 메뉴를 만든다고 하면 조건부 연산자로 복잡하게 만들어 주었어야 했습니다. 하지만 리액트는 기본적으로 하나의 페이지에서 처리를 하는 것을 목적으로 만들었기 때문에 여러가지 컴포넌트가 조건에 따라서 나오도록 처리가 된 것 입니다.

그렇다면 조건에 따라서 나오는 것이 아닌 내가 클릭을 했을 때에 내가 원하는 컴포넌트가 나올 수 있도록 하는 기능이 있으면 좋지 않을까요?

예를들어서 내가 홈을 누르면 에서는 홈 컴포넌트만 보이고, 소개 페이지를 누르면 소개 컴포넌트만 보일 수 있게 만드는 것이 조건을 넣어서 만드는 것 보다 편리할 것 같습니다.

## 왜 써야하는지

많은 메뉴가 있을 경우에는 하나의 컴포넌트에서 모든 것을 처리하기 힘듭니다!

리액트로 만든 웹을 본다면 한 페이지에서 길게 되어있어 어떤것을 클릭하면 스크롤이 자동으로 내려가 해당 정보가 있는 곳으로 이동이 되는 타입 하나와, 페이지가 이동하는 것 처럼 보이는 타입 하나로 크게 두가지 타입으로 분류 할 수 있을 것 같습니다.

첫 하나의 큰 페이지에서 스크롤로 이동하는 경우에는 기본 리액트를 사용하여 구현을 한 케이스이고, 페이지가 이동하는 것 처럼 보이는 페이지는 리액트 라우터를 썻다고 생각할 수 있습니다.

## 예제

이 예제는 [reactrouter.com](reacttouret.com)에서 튜토리얼 코드로 라우팅에서 제공하는 대부분의 기능을 사용 할 수 있습니다.

CRA에서 만든 폴더를 복사 한 후 npm i를 하여 모듈들을 eslint와 prettier를 가지고 와 줍니다.

이후 우리 react-router를 사용하기 위해 필요한 패키지를 설치 해 줍시다.

```bash
npm install react-router-dom localforage match-sorter sort-by
```

react-router-dom 리액트 라우터가 동작 할 수 있는 핵심 코드입니다.

이번 예제에는 App.js도 지워주시고 index.js만 남겨주어도 됩니다.

CSS는 github에 있는 코드를 참고 해 주세요.

하나하나 만들어보면서 진행 해 봅시다.

### 기본 라우터 만들기

라우터에 따라서 jsx가 렌더링이 된다고 하였습니다! 기본적으로 설정 할 수 있는 라우터를 추가 해 봅시다.

> src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// createBrowserRouter는 라우터에 대한 경로를 생성 합니다.
// RouterProvider는 우리가 createBrowserRouter에서 만든 경로를 리액트에게 제공 해 줍니다.
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 라우트 경로를 만들어 줍니다.
const router = createBrowserRouter([
  {
    path: "/", // 경로 설정
    element: <div>Hello world!</div>, // 해당 경로에 나올 JSX 설정
  },
]);

/** RouterProvider에서 정보를 제공 받아 사용 * */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

이제 간단하게 react router가 어떻게 동작하는지 살짝 느낌을 맛 보았습니다.

그렇다면 본격적으로 루트부터 만들어 봅시다.

route가 되는 컴포넌트는 routes라는 폴더를 만들어서 넣어 줍시다.

> src/routes/root.js

```javascript
import React from "react";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden />
            <div className="sr-only" aria-live="polite" />
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href="contacts/1">Your Name</a>
            </li>
            <li>
              <a href="contacts/2">Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" />
    </>
  );
}
```

이제 최상위 컴포넌트를 작성 하였으니 이를 렌더를 해 줍시다!

> src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

// createBrowserRouter는 라우터에 대한 경로를 생성 합니다.
// RouterProvider는 우리가 createBrowserRouter에서 만든 경로를 리액트에게 제공 해 줍니다.

// 라우트 경로를 만들어 줍니다.
const router = createBrowserRouter([
  {
    path: "/", // 경로 설정
    element: <Root />, // 해당 경로에 나올 JSX 설정
  },
]);

/** RouterProvider에서 정보를 제공 받아 사용 * */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

방금 만든 js파일을 import하고, router 부분에 element에 넣어 주었습니다.

그리고 이제 Your Name을 눌러 봅시다.

여기는 a태그이기 때문에 링크가 바뀌는데 해당 페이지가 없기 때문에 페이지를 찾을 수 없다고 나옵니다!

### Not Found 페이지 만들기

에러 페이지는 제일 중요하기 때문에 routes폴더 안에 두는 것이 아니라 src폴더에 생성 해 줍니다.

> src/error-page.js

```javascript
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
        // 에러 출력
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
```

이제 index.js에서 에러 페이지를 추가 해 줍시다!

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

// createBrowserRouter는 라우터에 대한 경로를 생성 합니다.
// RouterProvider는 우리가 createBrowserRouter에서 만든 경로를 리액트에게 제공 해 줍니다.

// 라우트 경로를 만들어 줍니다.
const router = createBrowserRouter([
  {
    path: "/", // 경로 설정
    element: <Root />, // 해당 경로에 나올 JSX 설정
    errorElement: <ErrorPage />, // 페이지를 못찾을 경우 이쪽으로 전달
  },
]);

/** RouterProvider에서 정보를 제공 받아 사용 * */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

자 이제 다시 Your Name을 눌러 봅시다.

에러 페이지가 잘 나오는 것을 볼 수 있습니다.

## 정상 페이지 보여주기

이제 정상적으로 잘 작동하는 페이지를 보여 줍시다.

우선 routes/contact.js와 routes/favorite.js를 만들어 안에 들어갈 내용을 채워 줍시다.

> /src/routes/contact.js

```javascript
import { Form } from "react-router-dom";
import React from "react";
import Favorite from "./favorite";

function Contact() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="contact">
      <div>
        <img alt="" key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <div>
              {contact.first} {contact.last}
            </div>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            // confirm 함수 실종으로 일단 주석
            // onSubmit={(event) => {
            //   if (!confirm("Please confirm you want to delete this record.")) {
            //     event.preventDefault();
            //   }
            // }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
```

> src/routes/favorite.js

```javascript
import React from "react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";

function Favorite({ contact }) {
  // yes, this is a `let` for later
  const { favorite } = contact;
  return (
    <Form method="post">
      <button
        type="button"
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

Favorite.propTypes = {
  contact: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Favorite;
```

그리고 이제 index에 contact를 붙혀 줍시다.

> src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";

// createBrowserRouter는 라우터에 대한 경로를 생성 합니다.
// RouterProvider는 우리가 createBrowserRouter에서 만든 경로를 리액트에게 제공 해 줍니다.

// 라우트 경로를 만들어 줍니다.
const router = createBrowserRouter([
  {
    path: "/", // 경로 설정
    element: <Root />, // 해당 경로에 나올 JSX 설정
    errorElement: <ErrorPage />, // 페이지를 못찾을 경우 이쪽으로 전달
  },
  {
    path: "contacts/:contactId", // 뒤에 숫자를 받아서 해당 정보 전달
    element: <Contact />, // Contact 보여줌
  },
]);

/** RouterProvider에서 정보를 제공 받아 사용 * */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

자 이제 Your Name을 눌러 봅시다!

그러면 contact가 새로운 페이지로 이동이 됩니다.

### 중첩 라우팅

라우팅이 되는 페이지가 2개가 겹쳐 보이게 하는 것을 중첩 라우팅 영어로는 Nested Routes라고 합니다.

우리가 방금 만든 페이지는 정말 좋은데 왼쪽에 Your Name쪽이 그대로 남아있고 오른쪽에 Contact내용이 추가되었으면 합니다.

이렇게 해 주는 방법은 다음과 같습니다.

> /src/index.js

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

이제 해당 페이지에 children 즉 자식이 있다는 것을 알렸습니다. 그렇다면 어느 위치에 들어가야하는지 컴포넌트에 명시를 해 주어야 합니다.

> src/routes/root.js

```javascript
import { Outlet } from "react-router-dom"; // Outlet이 자식 위치 전달하는 함수

export default function Root() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```

자 이제 해당 페이지로가 오른쪽 위치에 잘 전달이 되는 것을 알 수 있습니다.

하지만 Your Name을 한번 더 눌렀을 때는 에러 페이지로 이동이 되고, 처음 root페이지에서 Your Name을 클릭 했을 때 전체 페이지가 깜빡거리면서 뭔가 페이지가 이동되는 것 같은 느낌을 받습니다.

이는 우리가 root.js에서 a태그로 이동 했기 때문에 깜빡 거리는 것 입니다.

a태그를 router에 맞게 Link를 이용하여 바꾸어 줍시다.

> src/routes/root.js

```javascript
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}

        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}
```

자 이제 깜빡거리지도 않으면서 자연스럽게 페이지가 추가가 되고, Your Name을 여러번 클릭해도 에러 페이지로 이동이 되지 않습니다!
