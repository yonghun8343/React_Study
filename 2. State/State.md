# State

State는 상태를 의미합니다.

상태라는 것은 특정한 값에 대해서 변하는 것을 의미하는데요

예를들어 count를 0으로 주고 해당 값이 변화 하는 것을 변수에서 실시간으로 동작 하는 것을 의미 합니다.

기존에 사용하던 jsx.html에서 코드를 가지고 와 아래로 바꾸어 봅시다.

```
const root = document.getElementById("root");
let counter = 0;
const Span = () => <span>클릭 {counter}</span>;

const Btn = () => <button style={{ color: "red" }}>클릭</button>;
const Container = () => (
  <div>
    <Span />
    <Btn />
  </div>
);
ReactDOM.render(<Container />, root);
```

이렇게 되었을 때 변수인 counter가 클릭 오른쪽의 숫자로 들어가 있는 것을 볼 수 있습니다.

자 그러면 이제 counter를 증가시키는 함수를 만들어 버튼을 클릭 했을 때 증가가 되면 어떨까요?

아래의 코드를 추가 해 줍시다.

```
const root = document.getElementById("root");
let counter = 0;
const Span = () => <span>클릭 {counter}</span>;

function add() {
  counter = counter + 1;
}
const Btn = () => <button style={{ color: "red" }}>클릭</button>;
const Container = () => (
  <div>
    <Span />
    <Btn />
  </div>
);
ReactDOM.render(<Container />, root);
```

이제 새로고침 한 후 버튼을 눌러봅시다.

-> 아무 변화가 없습니다!

하지만 변수는 확실하게 증가하고 있는 것을 콘솔로 확인 할 수 있습니다.

그렇다면 왜 숫자가 우리가 생각한 대로 변하지 않을까요?

그 이유는 우리가 render를 `ReactDOM.render(<Container />, root);`에서 최초 한번만 반영을 했기 때문입니다.

즉 렌더링은 최초 한번만 되었고 클릭이 될 때 마다 리렌더링을 하지 않았기 때문입니다.

그러므로 add의 코드를 다음과 같이 바꾸어 줍시다.

```
function add() {
  counter = counter + 1;
  ReactDOM.render(<Container />, root);
}
```

이제 클릭을 할 때 마다 숫자가 변경이 되는 것을 알 수 있습니다!

즉 add함수가 실행이 될 때 마다 렌더링이 되어 숫자가 변하는 것을 알 수 있습니다.

-> html.html도 방금의 코드처럼 바꾸어서 클릭 할 때 마다 react와 일반 html이 바뀌는 과정이 어떻게 다른지 봐 주세요

## setState

매번 변수가 바뀔 때 마다 render를 해주는 것은 정말 귀찮은 작업이고 신경 쓸 것이 많습니다. 그렇다면 우리가 일일히 신경쓰지 않아도 자동적으로 변수가 바뀌면 리렌더링을 해 주는 기능은 없을까요?

그것이 바로 setState입니다.

우선 아래의 코드를 script에 넣어주세요.

```
const root = document.getElementById("root");
let counter = 0;
const Span = () => {
  const data = React.useState()
  console.log(data)
  (<span>클릭: {counter}</span>);
};

function add() {
  counter = counter + 1;
  ReactDOM.render(<Container />, root);
}
const Btn = () => (
  <button style={{ color: "red" }} onClick={add}>
    클릭
  </button>
);
const Container = () => (
  <div>
    <Span />
    <Btn />
  </div>
);
ReactDOM.render(<Container />, root);
```

새로 고침을 해서 우리가 React.useState()를 하였을 때 data에는 어떤것이 찍히는지 보자.

> [undefined, ƒ]

이렇게 찍혀 있다.

즉 왼쪽은 우리가 설정활 데이터이고 오른쪽은 해당 값을 바꿀 어떠한 함수라고 생각하면 된다.

그렇다면 이제 useState가 어떻게 이루어 져 있고 어떤 역할을 알았으니 사용을 해 보자.

`React.useState()` 에서 기본 값을 주는 방법은 아래와 같다.

`React.useState(0)` 이 코드는 기본 값을 0으로 준 것이다.

자 그러면 이제 console.log(data)에 아래와 같이 찍혀 있다.

> [0, ƒ]

여기서 비구조화 할당을 이용하여 배열을 변수에 담아보자

```
const v1 = data[0]
const v2 = data[1]

// 위와 아래는 같은 코드이다.
const [v1, v2] = data
```

여기서 아까 첫번째가 우리가 설정한 state값이고, 두번째가 state를 바꾸어 주는 함수라고 설명 했습니다.

그러므로 우리는 state를 바꾸기 전에 우리가 지금 data를 넣은 부분은 Span이라는 변수 명을 가진 함수 안이다 그러므로 밖의 function에서는 동작하기 힘들기 때문에 코드를 일부 수정 해 주려고 한다.

```
const root = document.getElementById("root");
const App = () => {
  const data = React.useState(0);
  console.log(data);
  const [counter, change] = data;
  function add() {
    change(counter + 1);
  }
  return (
    <div>
      <span>클릭: {counter}</span>
      <button style={{ color: "red" }} onClick={add}>
        클릭
      </button>
    </div>
  );
};
ReactDOM.render(<Container />, root);
```

이 코드로 바꾸고 add 함수에 change를 넣어 counter + 1을 해 주게 되면 data의 값이 변경이 되면서 자동으로 리렌더링이 되는것을 볼 수 있다!

