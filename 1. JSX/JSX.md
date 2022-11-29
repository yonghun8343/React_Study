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

우선 span과 button을 html태그로 만들어 주고 () 안에 넣어 줍니다.
그리고 이를 변수 안에 화살표 함수로 넣어주는데 () => {} 가 아닌 () => () 인데 이는 JSX문법이니 참고 해 주세요.

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
