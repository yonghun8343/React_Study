# Create-React-App(CRA)

우리는 지금까지 HTML에서 React와 ReactDOM, Babel을 일일히 불러와 리액트 코드를 작성 하였습니다. 이는 매번 작업 할 때 마다 복사 및 붙여넣기를 하여 코드를 불러왔고 실제 프로젝트를 만들 때에는 일일히 코드를 복사 붙여넣기 하는 것은 매우 비 효율적입니다.

그렇다면 우리가 express-generator에서 간단하게 express의 폴더 및 초기 코드를 만들었듯이 React에서도 간단하게 폴더 및 초기 코드를 생성 할 수 있는 방법이 있다면 정말 편하지 않을까요?

express-generator처럼 React도 초기 세팅을 도와주는 모듈이 존재합니다(npm에 있으니 모듈이라고 합니다.)

자 이제 create-react-app을 설치하고 사용 해봅시다.

## 설치하기 전에

Create React App은 Node의 버전이 >= 14, npm의 버전은 >= 5.2 이어야 합니다.

## 최초 폴더 생성하기

이제 Create React App(이하 CRA)를 생성 해 봅시다. 지난번 express-generator처럼 npm install -g를 할 필요 없이 npx라는 명령어로 바로 실행 해 줍니다.

```bash
npx create-react-app my-app
```

위의 명령어를 입력하였을 때 create-react-app이 설치가 되어 있지 않다면 아래와 같이 나옵니다.

```bash
Need to install the following packages:
  create-react-app@5.0.1
Ok to proceed? (y)
```

이는 패키지를 별도로 설치를 해야 한다는 물음으로 y를 입력 해 주시면 설치가 진행이 됩니다.

자 이제 CRA가 설치가 되었고 my-app이라는 폴더가 생성 되었습니다.

## 일단 박아보기

우선 폴더가 생성이 되었으니 해당 프로젝트가 어떤 형태인지 알아 봅시다.

아래의 명령어를 터미널에서 입력 해 주세요.

```bash
npm run start
```

서버가 켜지고, 나의 아이피가 나오면서 브라우저가 나오는 것을 볼 수 있습니다.

구경을 어느정도 하셨으면 이제 여기 폴더의 구조를 한번 알아 봅시다.

## CRA 폴더 구조

```text
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```

여기서 제일 먼저 해당 패키지의 얼굴이라고 할 수 있는 package.json을 봅시다.

### package.json

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

여기서 각각의 특징들을 알아 봅시다.

| 이름         | 설명                                                                                            |
| :----------- | :---------------------------------------------------------------------------------------------- |
| name         | 프로젝트의 이름 보통은 github 프로젝트의 이름과 동일하게 맞추어준다.                            |
| version      | 프로젝트의 버전                                                                                 |
| private      | 비공개 프로젝트 여부, 사내 프로젝트의 경우 true, 공개 프로젝트일 경우 false                     |
| dependencies | 코드에서 사용할 모듈 목록, 기본적으로 react와 react-dom이 설치가 되어있다.                      |
| scripts      | 여기서 주로 사용하는 것은 start(develop)와 build(product 추출)이다.                             |
| eslintConfig | eslint와 관련된 설정이다. eslintrc.json으로 뺄 예정이라 삭제 해도 괜찮다.                       |
| browserlist  | babel에서 지원할 브라우저가 어디까지 지원을 할 것인지 설정이다. 우선 기본값 그대로 둬도 괜찮다. |

여기서 scripts의 start를 보면 react-scripts start라고 되어있는데
여기서 react-script는 src/index.js를 찾아 해당 소스 파일을 번들링(소스코드를 하나로 묶어줌)하고 webpack-dev-server와 react-dev-utils를 이용해 browser에 띄워 줍니다. 그리고 기본적으로 hot옵션으로 코드 수정시 브라우저에 반영이 됩니다.

## src/index.js

> /src/index.js

코드는 다음과 같습니다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

여기서 우리는 기존에 html에서 작업하던 익숙한 코드를 볼 수 있습니다. root를 ReactDOM으로 가지고 오고, render를 해 줍니다.

reportWebVitals는 아직 사용 하지 않으니 주석 처리 해 줍니다. 자세한 사항은 별도로 확인 해 주세요.

여기서 document.getElementById로 root를 가지고 오는데 src폴더에는 html이 보이지 않습니다.

html파일은 사용자에게 배포가 될 수 있는 폴더(공개된 폴더)에 있어야 하므로 public에 있습니다!

자 이제 public/index.html을 봅시다.

## public/index.html

서버를 실행 하였을 때 사용자가 받아 갈 수 있는 코드인 public의 index.html의 코드는 다음과 같습니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

여기서 우리가 사용할 부분만 남기고 다 삭제 해 줍시다.

> public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

여기서 추후에 우리가 변경 해야할 부분은 title부분에 페이지가 나올 이름을 변경 해 주어야 합니다.

## src/App.js

이전의 src/index.js에서 보면 App.js를 렌더해 주고, 해당 코드는 src/App.js에서 가지고 오는 것을 알 수 있습니다.

즉 우리는 이제 App.js에서 부터 작업을 시작하면 되는 것을 알 수 있습니다.

App.js의 코드는 다음과 같습니다.

```javascript
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

여기서 우리가 작업 해야할 부분을 제외하고 실질적으로 남는 코드는 아래와 같습니다.

```javascript
import "./App.css";

function App() {
  return <div></div>;
}

export default App;
```

## 삭제 해도 되는 파일

```text
my-app
├── public
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.test.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```

위의 파일들은 별도로 필요가 없으므로 삭제 해도 괜찮습니다.

## 초기 설정 - eslint

우리는 이제 react를 작업 하기 전에 기본적으로 들어가는 eslint를 설정 해 보려고 합니다.

Node_study/03 - Node/03-10 - eslint_prettier ([링크](https://github.com/yonghun8343/Node_study/tree/main/03%20-%20Node/03-10%20-%20eslint_prettier))
에서 우리는 eslint와 prettier를 Node 환경으로 작업 해 주었습니다.

이제 해당 설정을 비슷하게 진행하면서 React에 맞추어 설정 해 봅시다.

사실 기존에 eslint를 global로 설치를 하는 것은 옛날 방법입니다. 요즘에는 npx를 이용하여 최신버전의 패키지로 실행을 할 수 있으니 아래의 코드를 실행 해 줍니다.

```bash
npx eslint --init

√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm(첫번째)
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JSON
```

이후에 관련 패키지를 설치 할 것인지 아래와 같이 물으면 y를 눌러 설치를 해 줍니다.

```bash
eslint-plugin-react@^7.28.0 eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
```

설치가 완료되면 .eslint.json 파일이 생성이 됩니다.

해당 파일의 내용은 다음과 같습니다.

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["plugin:react/recommended", "airbnb"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {}
}
```

자세한 설명은 Node_study에서 참고 해 주시고 주요 변경점을 보자면 extends에 plugin:react/recommended가 airbnb보다 앞에 위치하고, plugins에 react가 들어간 것을 볼 수 있습니다.

혹시나 jsx에 대한 설정이 되지 않는 것 같다면 parserOptions에 다음의 코드를 추가 해 주세요

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

현재 eslint의 eslint-plugin-react에서 위의 코드를 포함 하고 있는지는 불분명합니다.

이럴 때에는 그냥 추가 해 주는 것이 마음 편합니다.

## 초기 설정 - Prettier

eslint의 설정이 끝났다면 이제 prettier를 설치 해 봅시다.

설치하는 방법은 다음과 같습니다.

```bash
npm install -D eslint-config-prettier eslint-plugin-prettier
```

이후 .eslintrc.json파일에서 extends 부분의 끝에 아래의 코드처럼 plugin:prettier/recommended를 추가 해 줍니다.

```json
{
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended"
  ]
}
```

이제 CRA의 초기설정은 모두 완료가 되었습니다.

추가적으로 .gitignore를 하는 방법은 이전과 동일합니다.

## 파일 구조

리액트에서 추천하는 파일구조는 다음과 같이 두가지입니다.

[링크](https://ko.reactjs.org/docs/faq-structure.html)

- 파일의 기능이나 라우트에 의한 분류
  - 큰 프로젝트의 경우에 사용하면 좋다.
- 파일 유형에 의한 분류
  - 작은 프로젝트에서 사용 할 경우 좋다.

큰 프로젝트의 경우에 파일이 30개는 기본적으로 들어가게 됩ㄴ다. 그렇게 되었을 때 내가 원하는 파일을 바로 찾기가 힘듭니다. 그러므로 기능이나 라우트에 따라 분류를 진행합니다.

## 예제 넣기

자 이제 우리가 새로 작업할 폴더도 만들었으니 12월 12일의 4번 문제를 이용하여 해당 폴더에 나누어 담아 봅시다.

자세한 내용은 my-app 폴더를 확인 해 주세요.
