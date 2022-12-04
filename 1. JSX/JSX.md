# JSX

## JSX란?

React를 하는데 뜬금 없이 JSX가 나와서 당황하셨을 겁니다.
하지만 React는 별도의 문법이 있는 것이 아니라 HTML을 JS로 표현하는 문법인 JSX를 사용합니다.
아래에는 공식 홈페이지에 나와 있는 설명입니다.

![설명](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png)

내용을 확인 해 보면 꼭 필요한 것은 아니지만 JSX를 기반으로 사용이 된다는 것을 알 수 있습니다.

## JSX의 예제

우리는 이제 React를 하기 위해서는 JSX를 어느 정도 알아야 한다는 것을 깨달았습니다!

그러므로 간단한 HTML코드를 만들고, 이를 JSX로 바꾸는 작업을 해 보려 합니다.

우선 html로 button을 이용하여 클릭 하였을 때 콘솔에 "클릭"이라는 것을 만들어 봅시다.

> html.html

```
<!DOCTYPE html>
<html lang="en">
  <body>
    <span id="text">글자</span>
    <button id="btn">버튼</button>
  </body>
  <script>
    const button = document.getElementById("btn");
    function click() {
      console.log("클릭");
    }
    button.addEventListener("click", click);
  </script>
</html>
```

그리고 우리는 이것을 React를 이용하여 React의 기초적인 문법을 이용하여 만들어 보려고 합니다.

> react.html

```
<script crossorigin src="https://unpkg.com/ react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
위의 코드를 불러 와 줍니다.

<span id="text">글자</span>
해당 코드를 script 내에서 아래와 같이 바꿔 줍니다.
const span = React.createElement(
  "span", // Element의 타입
  {
    id: "text",  // Element의 속성
  },
  "글자" // Element의 InnerText
);

<button id="btn">버튼</button>
const btn = React.createElement(
  "button",
  {
    id: "button",
    style: { color: "red" },
    onClick: click,
  },
  "클릭"
);
const container = React.createElement("div", null, [span, btn]);
ReactDOM.render(container, root);
```

React.createElement()를 이용하여 각 속성에 맞게 생성 해 줍니다.

- React.createElement는 17버전부터 Deprecate가 되었습니다만 추후에는 사용하지 않으므로 실습에서는 그냥 진행 합니다.

그리고 ReactDOM.render를 이용하여 root 안에 호출 하는데, redner는 하나만 출력이 되기 때문에 container를 만들어서 안에 span과 btn을 넣어주고, root아래에 출력 해 줍니다.

자 이제 기존의 html과 동일하지만 React로 만든 것을 볼 수 있습니다.

방금의 예제에는 React.createElement를 이용하지만 이는 이전과 별 다른 차이점이 크게 느껴지지 않습니다.

그렇다면 이제 JSX를 이용하여 조금 더 개발자스럽게 코딩 해 봅시다.

참고로 JSX에서 Javascript의 변수나 문법을 이용하기 위해서는 {} 으로 감싸주어야 합니다.

예를들어 onClick={JS 함수} onClick에 javascript를 넣기 위해 {}로 감싸 주었고, style={{color="red"}} 이것은 Javascript를 쓰기 위해서 {} 로 처음 감싸 준 다음에 해당 내용 안에 객체(Object)를 넣기 위해 {}로 한번 더 묶어 줍니다. 그러므로 결론적으로 {{}} 이런 모양이 나오게 되는 것입니다.

우선 span과 button을 html태그로 만들어 주고 () 안에 넣어 줍니다.
그리고 이를 변수 안에 화살표 함수로 넣어주는데 () => {} 가 아닌 () => () 인데 이는 JSX문법이니 참고 해 주세요.

> jsx.html

```
const Span = () => (<span>글자</span>);
const Btn = () => (
  <button style={{ color: "red" }} onClick={click}>
    클릭
  </button>
);
```

변수 명은 기존의 span, button과 햇갈리지 않게 대문자로 작성 해 주세요!

그리고 const Container 변수를 선언 해 주시고 아래의 내용을 넣습니다.

```
const Container = () => (
  <div>
    <Span />
    <Btn />
  </div>
);

ReactDOM.render(<Container />, root);
```

자 이제 JSX를 이용하여 조금 더 개발자스럽게 html을 추가 하였습니다.

지금까지 JSX에 대해서 기본적인 것을 해 보았고, DOM을 중첩 해서 넣어 보았습니다.

참고로 () => () 는 아래와 같습니다.

```
const Span = () => (
  <span>글자</span>
);

const Span = () => {
  return (<span>글자</span>);
}
```

아래의 긴 코드를 위의 코드로 합쳐진거니 이렇게 사용한다~ 정도로 이해 해 주세요.

JSX로 한 코드의 장점은 재 사용성이 좋다는 것입니다.

```
const Container = (
  <div>
    <Span />
    <Btn />
    <Btn />
    <Btn />
    <Btn />
    <Btn />
  </div>
);
```

이렇게 되었을 때 btn을 여러개 쓸 수 있습니다.

다시 정리를 하자면 아래의 두 예시는 동일한 예시입니다.

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

참고로 img태그나 input의 경우에는 <img></img>와 같이 코드를 작성하지 않습니다. 이럴 때에는 아래와 같이 작성 해 주면 됩니다.

```
const element = <img src={user.avatarUrl} />;
const element = <input type="text" />;
```

## JSX의 장점

1. 보기 쉽다.

일반 HTML로 작성하고, 이를 React를 바꾸고 JSX까지 바꾸는 것을 해 보았습니다. 우리가 JS에서 이용 할 때 어떤것이 제일 눈에 익고 보기 쉬운지를 생각하면 JSX가 매우 매력적인 것을 알 수 있습니다.

2. 오류 검사

Babel에서는 코드를 단지 HTML이나 JS로만 바꾸어 주는 것이 아니라 태그를 닫지 않는 실수를 하였을 때 이를 오류가 발생하였다고 알려줍니다.

3. 컴포넌트 활용도

하나의 컴포넌트(즉 요소)를 선언하였을 때 재 사용하기가 편리하다는 것이 가장 큰 장점입니다.

## JSX 문법

### 1. 감싸진 요소

jsx.html파일을 복사하여 jsx-1.html을 만들어 봅시다

jsx-1.html을 정리해서 보면 Container 부분에서 div로 불필요하게 감싸고 있는 것을 볼 수 있습니다.

jsx는 html태그를 사용 할 때 큰것 하나에 감싸고 하위에 여러개를 추가 하는 것을 기본으로 합니다.

정말 그런지 직접 해 보려 합니다.

> jsx-1.httml

```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  ></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    const Span = () => <span>글자</span>;
    function click() {
      console.log("클릭");
    }

    const Btn = () => (
      <button style={{ color: "red" }} onClick={click}>
        클릭
      </button>
    );
    const Container = () => (
      // <div>   <- 삭제
        <Span />
        <Btn />
      // </div>   <- 삭제
    );
    ReactDOM.render(<Container />, root);
  </script>
</html>
```

이제 페이지를 실행하려하면 에러가 발생하는 것을 볼 수 있습니다.

그렇다면 굳이 div로 감싸지 않고 Span과 Btn만 출력하는 방법이 있을까요??

이는 React 16에서 Fragment 가 도입되어 해결 할 수 있습니다.

방금의 div자리에 아래와 같이 넣어 봅시다.

> jsx-1.html

```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  ></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    const Span = () => <span>글자</span>;
    function click() {
      console.log("클릭");
    }

    const Btn = () => (
      <button style={{ color: "red" }} onClick={click}>
        클릭
      </button>
    );
    const Container = () => (
      <React.Fragment>
        <Span />
        <Btn />
      </React.Fragment>
    );
    ReactDOM.render(<Container />, root);
  </script>
</html>
```

이제 div없이 span과 btn만 나오는 것을 볼 수 있습니다.

### 2. 자바스크립트 표현

이전 설명에서 잠시 설명했지만 자바스크립트와 관련된 내용을 JSX에서 넣기 위해서는 {}을 넣어서 표현 해 줍니다.

JSX로 선언된 모든 HTML태그에 텍스트를 넣으려고 하면 에러가 발생합니다.

> jsx-1.html

```
const Btn = () => (
  <button style="color: red" onClick={click}>
    클릭
  </button>
);
```

Btn부분을 위의 코드와 같이 수정하고 새로고침을 하였을 때에 JSX에 속성부분에 일반 문자열이 들어갔기 때문에 에러가 발생하게 됩니다.

그러므로 자바스크립트를 써 주고, 속성값들을 넣을 때는 object로 한번 더 감싸주어야 합니다.

```
style = {
  const obj = {
    color: "red"
  }
}
```

이렇게 넣는다고 생각 해 주시고 const = obj는 별도로 사용 할 필요가 없으니 생략 하였을 때 최종 코드는 아래와 같습니다.

```
style = {
  {
    color: "red"
  }
}

한줄로 줄이면
style = {{ color: "red" }}
```

### 3. class 대신 className

react에서는 class="클래스명" 대신에 className="클래스명" 으로 작성 해 주셔야합니다.

jsx-1.html을 복사해 jsx-3.html을 만들고 아래의 코드로 수정 해 봅시다.

> jsx-3.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .text {
        background-color: orangered;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  ></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    const Span = () => <span class="text">글자</span>;
    function click() {
      console.log("클릭");
    }

    const Btn = () => (
      <button style={{ color: "red" }} onClick={click}>
        클릭
      </button>
    );
    const Container = () => (
      <React.Fragment>
        <Span />
        <Btn />
      </React.Fragment>
    );
    ReactDOM.render(<Container />, root);
  </script>
</html>
```

head에서 style를 통해 text의 css를 추가 하였고, Span에서 class를 넣어주었습니다.

속성은 반영이 잘 되지만 에러가 발생합니다.

```
Warning: Invalid DOM property `class`. Did you mean `className`?
    at span
    at Span
    at Container
```

즉 React에서는 class를 사용하지 않고 className를 사용하면 해당 에러는 수정이 됩니다.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .text {
        background-color: orangered;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  ></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    const Span = () => <span className="text">글자</span>;
    function click() {
      console.log("클릭");
    }

    const Btn = () => (
      <button style={{ color: "red" }} onClick={click}>
        클릭
      </button>
    );
    const Container = () => (
      <React.Fragment>
        <Span />
        <Btn />
      </React.Fragment>
    );
    ReactDOM.render(<Container />, root);
  </script>
</html>
```

### 주석

JSX에서는 주석도 기존의 Javascript와는 다르게 추가 해 주셔야 합니다.

주석은 Javascript를 사용한다고 한 부분 내에서 주석이 사용 가능합니다.

```
{ // 주석이 쓰여집니다. }
{ /* 이렇게도 사용은 가능합니다 */ }

<div
  // 아래처럼 />로 끝나는 것을 self-closed태그라고 합니다.
  // 여기에서는 주석을 기존의 자바스크립트 처럼 사용이 가능 합니다.

/>

```
