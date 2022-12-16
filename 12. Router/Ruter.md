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

진행하기 전에 CSS파일부터 넣어 보겠습니다.

아래의 링크에 있는 코드를 index.css에 넣어주세요.

[CSS 확인 하러 가기](https://gist.githubusercontent.com/ryanflorence/ba20d473ef59e1965543fa013ae4163f/raw/499707f25a5690d490c7b3d54c65c65eb895930c/react-router-6.4-tutorial-css.css)

> src/index.css

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
          )}
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

## 참고사항

ractrouter.com에서 이후에 나오는 tutorial은 가짜 통신을 이용하여 정보를 조회하고 생성, 수정, 삭제를 진행합니다. 이러한 과정을 react-router자체만으로 처리를 하는데요.

이러한 처리는 복사 붙여넣기하고 넘기겠습니다.

붙여넣기를 할 부분에서는 "(붙여넣기) 기능" 이라고 명시하겠습니다.

그러므로 react-router에 대한 기능만을 중점적으로 다루겠습니다.

우선 /src/contacts.js를 만들어 주시고, 아래의 코드를 넣어 주세요.

> src/contact.js

```javascript
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact = { id, createdAt: Date.now() };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  const contacts = await localforage.getItem("contacts");
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  const contacts = await localforage.getItem("contacts");
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  const contacts = await localforage.getItem("contacts");
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}
```

## (붙여넣기) 데이터 불러오기

> src/routes/root.js

```javascript
import { getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
```

> src/index.js

```javascript
import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

> src/routes/root.jsx

```javascript
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getContacts } from "../contacts";

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        {/* other code */}
      </div>
    </>
  );
}
```

붙여넣기를 완료하면 최초에 작성이 된 것이 없기 때문에 리스트에 아무것도 안나오게 됩니다.

## (붙여넣기) 데이터 작성

> src/routes/root.js

```javascript
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return { contact };
}

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* other code */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        {/* other code */}
      </div>
    </>
  );
}
```

> /src/index.js

```javascript
/* other imports */

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

## 경로에서 URL Parmas를 받아오기

우리가 왼쪽의 nav에서 li를 눌렀을 때 경로가 path: "contacts/:contactId", 이런식으로 들어오게 됩니다. Parmas는 경로 중 :contactId를 받아오려 합니다.

예시에서는 loader로 parmas를 불러 옵니다. 일단 붙여넣기를 한 후 함수 안에서 가지고 와 보겠습니다.

> src/routes/contact.js

```javascript
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  return getContact(params.contactId);
}

export default function Contact() {
  const contact = useLoaderData();
  // existing code
}
```

> src/index.js

```javascript
/* existing code */
import Contact, { loader as contactLoader } from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);
```

코드를 다 붙여넣은 후 :contactId부분을 불러 와 봅시다.

함수는 useParams입니다.

> src/root/contact.js

```javascript
function Contact() {
  const contact = useLoaderData();
  const param = useParams(); // params를 가지고 오는 Hook
  console.log(param);
```

useParams()는 react-router에서 만든 hook입니다. 우리는 이 함수를 사용하여 param을 가지고 올 수 있게 되었습니다.

쇼핑몰 사이트나 고객 정보 사이트에서 상품의 id나 고객의 id를 param으로 넘겼을 때 이를 이용해서 받아 와 줍니다.

## (붙여넣기) 데이터 업데이트

> src/routes/edit.js

```javascript
import { Form, useLoaderData } from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
```

> src/index.js

```javascript
/* existing code */
import EditContact from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
      },
    ],
  },
]);

/* existing code */
```

### (붙여넣기) 수정 한 데이터 변경 및 자연스러운 새로고침

데이터를 수정하는 부분입니다.

여기서 주목해야할 점은 react-router-dom에서 redirect함수를 불러오고, action 마지막에 redirect를 해 줍니다.

redirect란 다시 연결을 한다고 생각하면 좋습니다. 즉 페이지가 새로고침이 되는 기능과 동일 합니다!

여기서는 수정이 완료된 이후에 데이터가 state가 되어 리렌더링이 되는 것이 아니라 새로 고침이 됩니다!

> src/routes/edit.js

```javascript
import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

/* existing code */
```

> src/routes/main.js

```javascript
/* existing code */
import EditContact, { action as editAction } from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
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
    ],
  },
]);

/* existing code */
```

## (붙여넣기) New를 누르면 작성하는 페이지로 이동

여기서는 New 버튼을 누르면 우리가 만들었던 edit.js로 이동이 되면서 새로 작성하는 것 처럼 보입니다.

여기서는 특별히 사용되는 함수 없이 redirect를 시켜 줍니다.

> src/routes/root.js

```javascript
import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
```

## 네비게이션에 스타일 추가하기

우리가 `<nav>`에 있는 메뉴에 사용하는 것으로 NavLink를 사용합니다

NavLink는 Link와 동일한 기능을 하지만, 선택이 되었을 때 스타일을 넣을 수 있습니다.

실습 예제를 한번 해 봅시다.

> src/routes/root.js

```javascript
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {/* other code */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>{/* other code */}</p>
          )}
        </nav>
      </div>
    </>
  );
}
```

이제 우리가 클릭한 NavLink에는 파란색 배경이 들어가 있는 것을 볼 수 있습니다.

## 네비게이션 상태 파악하기

페이지를 이동할 때 혹은 children 페이지를 불러올 때 페이지에서 데이터를 불러오느라 시간이 걸릴 때가 있습니다. 이 때 상태에 따라 ClassName을 넣어서 css를 넣어 줄 수 있습니다.

useNavigation이 바로 현재 네비게이션 상태를 알 수 있는 Hook입니다.

useNavigation의 state는 현재 네이베이션의 상태를 알려줍니다.
상태로는 다음 세가지가 있습니다.

1. idle - 아무런 작동이 없는 상태입니다.
2. submitting - POST, PUT, PATCH, or DELETE이 동작 하고 있는 상태입니다.
3. loading - 라우트에서 특정 페이지를 불러오고 있는 중 입니다.

state가 변하는 순서는 다음과 같습니다.

```text
idle → loading → idle
```

> src/routes/root.js

```javascript
import {
  // existing code
  useNavigation,
} from "react-router-dom";

// existing code

export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  console.log(navigation);
  // navigation.state;
  // navigation.location;
  // navigation.formData;
  // navigation.formAction;
  // navigation.formMethod;

  return (
    <>
      <div id="sidebar">{/* existing code */}</div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
```

## (붙여넣기) 데이터 삭제

여기 부분은 데이터를 삭제하는 부분입니다. 붙여넣기 해 주시면 됩니다.

> src/routes/contact.js

```javascript
<Form method="post" action="destroy">
  <button type="submit">Delete</button>
</Form>
```

src/routes/destroy.jsx 파일을 만들고 아래의 코드를 넣어 주세요.

> src/routes/destroy.jsx

```javascript
/* eslint-disable import/prefer-default-export */
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
```

> src/index.js

```javascript
/* existing code */
import { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    /* existing root route props */
    children: [
      /* existing routes */
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

/* existing code */
```

## 기본 페이지 추가하기

우리가 이 프로젝트를 처음 들어갔을 때 오른쪽에는 아무것도 보이지 않습니다.

너무 허전하지 않나요? 여기에 기본적으로 들어갈 페이지를 넣어 줄 수 있습니다.

우선 오른쪽에 기본적으로 들어갈 페이지 부터 만들어 보겠습니다.

> src/routes/index.js

```javascript
/* eslint-disable react/react-in-jsx-scope */
export default function Index() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out
      <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
    </p>
  );
}
```

이제 방금 생성한 index.js를 오른쪽 빈 페이지의 기본 페이지로 추가 해 주겠습니다.

> src/index.js

```javascript
// existing code
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      // index: true 옵션을 주어 기본 페이지 설정
      { index: true, element: <Index /> },
      /* existing routes */
    ],
  },
]);
```

이제 기본 페이지가 보입니다!

## History 사용하기

우리가 뒤로가기 버튼같은 것을 만들 때 html에서는 history를 이용하여 움직였지만 react-router에서는 useNavigate를 이용 해야 합니다.

useNavigate에 주소를 넣으면 해당 주소로 이동이 되고, -1이나 음수를 넣게 되면 해당 숫자만큼 이전페이지로 이동하게 됩니다.

edit를 눌렀을 때 cancel을 누르면 뒤로가도록 해 줍니다.

> src/routes/edit.js

```javascript
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export default function Edit() {
  const contact = useLoaderData();
  // useNavigate를 navagate 변수에 담아 줍니다.
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      {/* existing code */}

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            // -1을 줘서 이전 페이지로 이동 합니다.
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
```

만약 메인페이지로 이동을 하고 싶다면 navigate("/"); 를 하게되면 메인 페이지로 이동이 됩니다.

## 파라미터 가지고 오기

왼쪽 위의 검색 입력을 이용하여 파라미터로 검색을 넣게되고, 우리는 이 파라미터를 받아 올 수 있습니다.

파라미터를 받아오는 함수는

> src/routes/root.js

```javascript
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}

function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  console.log("searchParam", searchParams.get("q"));
  const useparams = useParams();
  console.log("useparams", useparams);
  const uselocation = useLocation();
  console.log("useLocation", uselocation);

  // 아래의 코드
}
```

## (붙여넣기) url과 Form의 상태 맞추기

react-router의 Form 내장 함수로 url과 동기화 시키는것을 해 줍니다.

> src/routes/root.js

```javascript
import { useEffect } from "react";
// existing code

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

## search에 onChange로 입력 시 바로 검색

마지막으로 검색부분에 엔터를 치지 않고 입력만으로 검색이 가능하도록 하는 기능을 추가 해 줍니다.

> src/routes/root.jsx

```javascript
// existing code
import {
  // existing code
  useSubmit,
} from "react-router-dom";

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```
