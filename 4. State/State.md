# State

State는 상태를 의미합니다.

상태라는 것은 특정한 값에 대해서 변하는 것을 의미하는데요

예를들어 count를 0으로 주고 해당 값이 변화 하는 것을 변수에서 실시간으로 동작 하는 것을 의미 합니다.

Props는 부모에서 자식으로 값을 전달 해 주기 때문에 자식에서는 Props에 대한 값을 수정 할 수 없습니다! (이를 지키기 위해 class로 사용하고, super를 사용했습니다.)

그렇다면 자식에서 특정 값을 생성하고 이를 수정 까지 할 수 있는 기능이 바로 State입니다.

기존에 사용하던 jsx.html에서 코드를 가지고 와 아래로 바꾸어 봅시다.

> state.html

```javascript
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

> state.html

```javascript
const root = document.getElementById("root");
let counter = 0;
const Span = () => <span>클릭 {counter}</span>;

function add() {
  counter = counter + 1;
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

이제 새로고침 한 후 버튼을 눌러봅시다.

-> 아무 변화가 없습니다!

하지만 변수는 확실하게 증가하고 있는 것을 콘솔로 확인 할 수 있습니다.

그렇다면 왜 숫자가 우리가 생각한 대로 변하지 않을까요?

그 이유는 우리가 render를 `ReactDOM.render(<Container />, root);`에서 최초 한번만 반영을 했기 때문입니다.

즉 렌더링은 최초 한번만 되었고 클릭이 될 때 마다 리렌더링을 하지 않았기 때문입니다.

그러므로 add의 코드를 다음과 같이 바꾸어 줍시다.

```javascript
function add() {
  counter = counter + 1;
  ReactDOM.render(<Container />, root);
}
```

이제 클릭을 할 때 마다 숫자가 변경이 되는 것을 알 수 있습니다!

즉 add함수가 실행이 될 때 마다 렌더링이 되어 숫자가 변하는 것을 알 수 있습니다.

-> html.html도 방금의 코드처럼 바꾸어서 클릭 할 때 마다 react와 일반 html이 바뀌는 과정이 어떻게 다른지 봐 주세요.

## setState

매번 변수가 바뀔 때 마다 render를 해주는 것은 정말 귀찮은 작업이고 신경 쓸 것이 많습니다. 그렇다면 우리가 일일히 신경쓰지 않아도 자동적으로 변수가 바뀌면 리렌더링을 해 주는 기능은 없을까요?

그것이 바로 setState입니다.

우선 아래의 코드를 script에 넣어주세요.

> state.html

```javascript
const root = document.getElementById("root");
let counter = 0;
const Span = () => {
  const data = React.useState();
  console.log(data)(<span>클릭: {counter}</span>);
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

새로 고침을 해서 우리가 React.useState()를 하였을 때 data에는 어떤것이 찍히는지 보도록 합시다.

> [undefined, ƒ]

이렇게 찍혀 있습니다.

즉 왼쪽은 우리가 설정활 데이터이고 오른쪽은 해당 값을 바꿀 어떠한 함수라고 생각하면 됩니다.

그렇다면 이제 useState가 어떻게 이루어 져 있고 어떤 역할을 알았으니 사용을 해 보도록 합시다.

`React.useState()` 에서 기본 값을 주는 방법은 아래와 같습니다.

`React.useState(0)` 이 코드는 기본 값을 0으로 준 것입니다.

자 그러면 이제 console.log(data)에 아래와 같이 찍혀 있습니다.

> [0, ƒ]

여기서 비구조화 할당을 이용하여 배열을 변수에 담아보겠습니다.

```javascript
const v1 = data[0];
const v2 = data[1];

// 위와 아래는 같은 코드이다.
const [v1, v2] = data;
```

여기서 아까 첫번째가 우리가 설정한 state값이고, 두번째가 state를 바꾸어 주는 함수라고 설명 했습니다.

그러므로 우리는 state를 바꾸기 전에 우리가 지금 data를 넣은 부분은 Span이라는 변수 명을 가진 함수 안에서 사용하고 있습니다. 그러므로 밖의 function에서는 동작하기 힘들기 때문에 코드를 일부 수정 해 주려고 합니다.

> > state.html

```javascript
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
ReactDOM.render(<App />, root);
```

이 코드로 바꾸고 add 함수에 change를 넣어 counter + 1을 해 주게 되면 data의 값이 변경이 되면서 자동으로 리렌더링이 되는것을 볼 수 있습니다!

즉 change가 setState가 되고, 해당 함수의 역할을 파악 할 수 있습니다!

하지만 위의 코드처럼 counter + 1이 된다면 다른 곳에서 counter가 변경이 되었을 때 매우 이상한 코드가 될 수 있습니다.

그러므로 안전한 코드로 작성 해 주려고 합니다

아래의 코드는 function add()안의 코드를 수정 해 주시면 됩니다.

```javascript
// 현재 값을 받아와서 현재값에 + 1을 해 주는 방식
change((current) => current + 1);
```

최종 코드는 다음과 같습니다.

> state.html

```javascript
const root = document.getElementById("root");
const App = () => {
  const data = React.useState(0);
  console.log(data);
  const [counter, change] = data;
  function add() {
    change((current) => current + 1);
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
ReactDOM.render(<App />, root);
```

이제 해당 코드를 Javascript의 class로 바꾸어 봅시다.

> state-class.html

```javascript
const root = document.getElementById("root");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  add = () => {
    // 클래스 내 함수 정식 선언은 아닙니다.
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div>
        <span>클릭: {this.state.counter}</span>
        <button style={{ color: "red" }} onClick={this.add}>
          클릭
        </button>
      </div>
    );
  }
}
ReactDOM.render(<App />, root);
```

## 추가적인 예제 및 내용

### 기본 코딩

조금 더 간단한 예제를 가지고 바로 class로 작업 해 보려고 합니다.

이번 예제는 props.html에서 `Hello, world!`를 제일 처음 띄워져 있고, `밑에 It is {시간}.`으로 된 부분을 바꾸어 주겠습니다.

우선 props.html를 복사해서 state-clock.html을 만들어 주세요.

> state-clock.html

```javascript
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
    const root = ReactDOM.createRoot(document.getElementById("root"));
    function H1(props) {
      return <h1>Hello, {props.name}!</h1>;
    }

    function tick() {
      const element = (
        <div>
          <H1 name="대한민국" />
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
      root.render(element);
    }

    setInterval(tick, 1000);
  </script>
</html>

```

우선 위의 코드를 Class로 바꾸어 봅시다.

> state-clock.html

```javascript
function H1(props) {
  return <h1>Hello, {props.name}!</h1>;
}
코드를 Class로 바꾸면 아래와 같이됩니다.
1. React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다.
2. render()라고 불리는 빈 메서드를 추가합니다.
3. 함수의 내용을 render() 메서드 안으로 옮깁니다.
4. render() 내용 안에 있는 props를 this.props로 변경합니다.
5. 남아있는 빈 함수 선언을 삭제합니다.

class H1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

function tick을 바꾸어 봅시다.

tick을 사용하는 것이 아니라 재활용하기 좋도록 tick을 Clock 클래스로 바꾸어 만들어 봅시다. 우선 tick을 재활용이 가능하도록 Clock함수로 바꾸면 다음과 같습니다.

> state-clock.html

```javascript
function tick() {
  const element = // class로 변경
    (
      <div>
        <H1 name="대한민국" />
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  root.render(element);
}

setInterval(tick, 1000);

// 변경 후

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

자 이제 Clock 함수 컴포넌트를 클래스 컴포넌트로 바꾸어 봅시다.

```javascript
1. React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다.
2. render()라고 불리는 빈 메서드를 추가합니다.
3. 함수의 내용을 render() 메서드 안으로 옮깁니다.
4. render() 내용 안에 있는 props를 this.props로 변경합니다.
5. 남아있는 빈 함수 선언을 삭제합니다.

class Tick extends React.Component {
  render() {
    return (
      <div>
        <H1 name="대한민국" />
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

이제 Tick에 constructor를 통해 state를 추가 해 봅시다. 추가하는 과정은 다음과 같습니다.

1. render() 메서드 안에 있는 this.props.date를 this.state.date로 변경합니다.
2. 초기 this.state를 지정하는 class constructor를 추가합니다.
3. `<Clock />` 요소에서 date prop을 삭제합니다.

> state-clock.html

```javascript
class Tick extends React.Component {
  constructor(props) {
    // 두번째 constructor를 통해 부모 props 호출 및 state 추가
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return (
      <div>
        <H1 name="대한민국" />
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2> // 첫번째 수정 this.props
        => this.state
      </div>
    );
  }
}

root.render(<Tick />);
```

이 때 전체적인 코드는 다음과 같습니다.

마지막으로 this.state.date를 수정하는 tick 함수를 추가 해 봅시다.

> state-clock.html

```javascript
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
    const root = ReactDOM.createRoot(document.getElementById("root"));
    class H1 extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    // function H1(props) {
    //   return <h1>Hello, {props.name}!</h1>;
    // }

    class Tick extends React.Component {
      constructor(props) {
        // 두번째 constructor를 통해 부모 props 호출 및 state 추가
        super(props);
        this.state = {
          date: new Date(),
        };
      }
      tick() {
        this.setState({
          date: new Date()
        });
      }
      render() {
        return (
          <div>
            <H1 name="대한민국" />
            {/* 첫번째 수정 this.props => this.state */}
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }

    root.render(<Tick />);
  </script>
</html>
```

여기까지 진행하면 시간은 state를 통해서 props가 없어도 자동으로 들어 가 있는 것을 볼 수 있습니다.

이제 Tick이 매초 스스로 업데이트 하도록 만들어 봅시다.

### 생명주기 메서드를 클래스에 추가하기

생명주기라는 것은 사람이 태어나고 죽는 생명주기와 같이 DOM에도 생성되고 삭제되기 까지를 생명주기라고 합니다.

리액트의 생명주기는 다음과 같습니다.

![생명주기](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png)

- 출처 : https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

여기서는 마운팅(처음 DOM에 렌더링 됨)과 언마운팅(생성된 DOM이 삭제 될 때)을 사용 해 보려 합니다.

컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있습니다.

```javascript
class Tick extends React.Component {
  constructor(props) {
    // 두번째 constructor를 통해 부모 props 호출 및 state 추가
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <H1 name="대한민국" />
        {/* 첫번째 수정 this.props => this.state */}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`componentDidMount`과 `componentWillUnmount`이러한 메서드들은 “생명주기 메서드”라고 불립니다.

`componentDidMount()` 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행됩니다. 이 장소가 타이머를 설정하기에 좋은 장소입니다.

```javascript
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

timerId에서 setInterval의 아이디가 제대로 저장 되는지 확인 해 봅시다 왜냐하면 Unmount를 할 때 clearInterval을 하기 위해서는 해당 아이디가 필요하기 때문입니다.

this.props가 React에 의해 스스로 설정되고 this.state가 특수한 의미가 있지만, 타이머 ID와 같이 데이터 흐름 안에 포함되지 않는 어떤 항목을 보관할 필요가 있다면 자유롭게 클래스에 수동으로 부가적인 필드를 추가해도 됩니다.

componentWillUnmount() 생명주기 메서드 안에 있는 타이머를 분해해 보겠습니다.

```javascript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

최종 코드는 다음과 같습니다.

```javascript
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
    const root = ReactDOM.createRoot(document.getElementById("root"));
    class H1 extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    // function H1(props) {
    //   return <h1>Hello, {props.name}!</h1>;
    // }

    class Tick extends React.Component {
      constructor(props) {
        // 두번째 constructor를 통해 부모 props 호출 및 state 추가
        super(props);
        this.state = {
          date: new Date(),
        };
      }

      componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      tick() {
        this.setState({
          date: new Date(),
        });
      }

      render() {
        return (
          <div>
            <H1 name="대한민국" />
            {/* 첫번째 수정 this.props => this.state */}
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }

    root.render(<Tick />);
  </script>
</html>
```

## 이전 코드에 대한 메서드 호출 순서

1. `<Tick />`가 root.render()로 전달되었을 때 React는 Tick 컴포넌트의 constructor를 호출합니다. Tick이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 this.state를 초기화합니다. 나중에 이 state를 업데이트할 것입니다.
2. React는 Tick 컴포넌트의 render() 메서드를 호출합니다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 됩니다. 그 다음 React는 Tick의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트합니다.
3. Tick 출력값이 DOM에 삽입되면, React는 componentDidMount() 생명주기 메서드를 호출합니다. 그 안에서 Tick 컴포넌트는 매초 컴포넌트의 tick() 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청합니다.
4. 매초 브라우저가 tick() 메서드를 호출합니다. 그 안에서 Tick 컴포넌트는 setState()에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행합니다. setState() 호출 덕분에 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 render() 메서드를 다시 호출합니다. 이 때 render() 메서드 안의 this.state.date가 달라지고 렌더링 출력값은 업데이트된 시각을 포함합니다. React는 이에 따라 DOM을 업데이트합니다.
5. Tick 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를 멈추기 위해 componentWillUnmount() 생명주기 메서드를 호출합니다.

## State를 올바르게 사용하기

### 직접 State를 수정 하지 마세요

예를 들어, 이 코드는 컴포넌트를 다시 렌더링하지 않습니다.

```javascript
// Wrong
this.state.comment = "Hello";
```

대신에 setState()를 사용합니다.

```javascript
// Correct
this.setState({ comment: "Hello" });
```

this.state를 지정할 수 있는 유일한 공간은 바로 constructor입니다.

### State 업데이트는 비동기적일 수도 있습니다

this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 됩니다.

예를 들어, 다음 코드는 카운터 업데이트에 실패할 수 있습니다.

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 setState()를 사용합니다. 그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것입니다.

```javascript
// Correct - 클래스 컴포넌트
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));

// Correct - 함수 컴포넌트
this.setState(function (state, props) {
  return {
    counter: state.counter + props.increment,
  };
});
```

해당 예제는 우리가 이전에 했던 `change((current) => current + 1)`에 대한 설명과 동일합니다.

### State 업데이트는 병합됩니다

setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합합니다.

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있습니다.

```javascript
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

별도의 setState() 호출로 이러한 변수를 독립적으로 업데이트할 수 있습니다.

```javascript
  componentDidMount() {
    fetchPosts().then(response => { // posts를 수정 후 내용 저장할 때
      this.setState({ // 여기서 object에 posts 하나만 넣는 것 같지만 실제로는 해당 값만 수정이 된다.
        posts: response.posts
      });
    });

    fetchComments().then(response => { // comments를 수정 후 내용 저장할 때
      this.setState({
        comments: response.comments // 여기서 object에 comments 하나만 넣는 것 같지만 실제로는 해당 값만 수정이 된다.
      });
    });
  }
```

병합은 얕게 이루어지기 때문에 this.setState({comments})는 this.state.posts에 영향을 주진 않지만 this.state.comments는 완전히 대체됩니다.

### state는 constructor에 들어가 있지 않을 수도 있습니다

아래의 두 코드는 같은 코드입니다.

```javascript
class Tick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // constructor 안에 state 사용
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <H1 name="대한민국" />
        {/* 첫번째 수정 this.props => this.state */}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

```javascript
class Tick extends React.Component {
  constructor(props) {
    // 두번째 constructor를 통해 부모 props 호출 및 state 추가
    super(props);
  }

  state = {
    // state를 따로 빼서 사용
    date: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <H1 name="대한민국" />
        {/* 첫번째 수정 this.props => this.state */}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
