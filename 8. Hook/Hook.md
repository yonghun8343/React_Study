# Hook

그 동안 클래스에서 props와 state를 위해서 this를 붙혀주고 constructor를 만들어주는 등 여러가지의 노력(?)을 하였습니다.

이제 Hook이 나옴으로써 우리는 클래스에 대한 의존도를 약간이나마 벗어날 수 있게 되었습니다.

Hook은 리액트의 16.8버전부터 나왔으며 당시에는 리액트를 쓰던 사람들이 쌍수를 들고 환영했습니다.

그 이유를 알아 볼까요?

1. 더 이상 클래스 컴포넌트를 무조건 만들 필요가 없어졌다.
2. state를 쓰는데에 있어서 엄청 큰 편리함이 생겼다.
3. 생명주기를 쓰는데에 있어 클래스 컴포넌트에서 사용할 일이 없어졌다.

즉 Hook은 그 동안에 자바스크립트에 자신이 있다라고 생각하던 사람들도 Class라는 것에 친숙하지 못하여 헤메는 등의 모습에서 다시 함수형 컴포넌트로 돌아와 자바스크립트에 대해서 큰 이해를 하지 못하더라도 리액트를 구현 할 수 있게 되었다는 점에서 큰 환영을 받았습니다.

하지만 그렇다고 모든 컴포넌트를 Function으로 구현하지는 않습니다.

예를들어 함수가 많거나 큰 틀에서 사용할 컴포넌트는 여전히 Class를 이용하고 내부에 들어가는 세세한 것들에 대해서는 Function을 사용하는 등 자신만의 기준으로 함수와 클래스를 왔다갔다 합니다.

심지어 기존에 Class로 구현된 코드들은 잘 동작하고 있기 때문에 굳이 함수형 컴포넌트로 변경 할 필요가 없습니다. (심지어 클래스 컴포넌트는 지속적으로 제공 할 것이라고 리액트에서 공식적으로 선언 하였습니다.)

## useState

useState를 하기 전에 Class형으로 버튼을 클릭 했을 때 counter가 증가하여 이를 화면에 렌더링 하는 코드를 구현 해 보겠습니다.

> hook-before.html

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
    const root = document.getElementById("root");
    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          counter: 0,
        };
      }

      add = () => {
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
  </script>
</html>
```

위의 코드는 어디서 많이 구현해 본 것 같지 않은가요?

우리는 이미 Hook을 사용 해 보았었습니다. 언제 사용했었냐면 state에서 간단하게 `useState()`를 이용해서 state값을 변경 해 보았었습니다. 클래서 컴포넌트에서 훅을 사용해 함수 컴포넌트로 바꾸어 보면서 그 때의 기억을 떠올려 봅시다.

> hook-state.html

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
  </script>
</html>
```

이제 예시에서 사용한 useState가 무엇인지 살짝 기억이 났습니다. 그러나 어떻게 사용했는지 기억이 나지 않기 때문에 다시 복습을 해 봅시다.

`const data = React.useState(0)`을 `console.log(data)`를 찍어보면 [undefined, ƒ]가 나왔습니다. 첫 번째에 있는 값이 초기값이고 두번째가 첫번째 값을 변경한다고 하였습니다.

## useEffect

