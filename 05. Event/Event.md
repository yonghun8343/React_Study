# Event

React의 엘리먼트에서 이벤트를 처리하는 방법은 기본적으로 DOM에서 처리하는 것과 비슷하지만 몇가지 다른점을 소개하고 넘어가려합니다.

- React의 이벤트는 소문자 대신 카멜케이스(camelCase)를 사용합니다.
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

예를들어 HTML과 리액트의 이벤트를 선언하는 방법은 아래와 같습니다.

```javascript
// HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>

// JSX
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

이제 버튼을 클릭하면 버튼의 글자가 "ON"과 "OFF"로 바뀌는 간단한 React 예제를 만들어 봅시다.

이전에 했던 state-class.html의 파일을 불러와 함수부분에 아래와 같이 넣어 줍니다.

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
```

해당 에제는 클릭을 했을 때 state값을 수정해서 ON과 OFF로 값을 표현하는 예제입니다.

여기서 `this.handleClick = this.handleClick.bind(this);` 해당 부분을 주목 해 주어야 합니다.

우선 위에서 말한 this.handleClick을 주석 처리 해 봅니다.

그리고 버튼을 클릭하면 `Cannot read properties of undefined (reading 'setState')` 이라는 오류가 발생합니다.

이게 어떤 의미냐면 우리가 handleClick에서 사용한 this가 클래스에서 사용되는 this가 아닌 undefined가 되었기 때문에 setState를 찾을 수 없다는 오류 입니다.

그러므로 우리가 함수 안에서 this라는 것을 사용하고 싶다면 bind를 constructor에서 해 주어야 합니다.

매번 이렇게 bind를 호출 해 주는것은 매우 개발자스럽지 못하고(=귀찮다) 코드 또한 깔끔하지 않습니다

그러므로 이를 해결 할 수 있는 방법 두가지에 대해서 해 보려고 합니다.

첫번째 방법으로 사용 할 것은 이전의 예제에서도 가끔 사용해서 눈치 채신분들도 있겠지만 변수에 함수를 넣는 방식으로 함수를 호출 해 줍니다.

```javascript
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
  // 주의: 이 문법은 *실험적인* 문법입니다.
  // 하지만 우리의 Babel이 이를 안정적으로 변환 해 줍니다.
  handleClick = () => {
    // 여기서 변수 안에 함수를 넣음
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

위와 밑의 차이는 함수를 바로 선언 해 주는 것과 변수에 넣는것은 어떤 차이가 있을까요? 그것은 바로 prototype이라는 곳에 함수가 추가가 되는지 혹은 추가 되지 않는지에 대한 차이입니다.

prototype이라는 것은 클래스에 속한 함수가 어떤것이 있는지에 대해서 정리 된 객체라고 생각하면 됩니다.

확인 하는 방법은 다음과 같습니다.

```javascript
클래스명.prototype;
```

이제 우리가 Toggle과 LoggingButton의 prototype를 확인 해 봅시다.

![그림](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png)

위에 Toggle의 prototype에는 hgandleClick이 들어가 있지만 LoggingButton에는 handleClick이 없습니다.

그렇다면 정상적인 사용방법은 Toggle처럼 사용하는것이 옳지 않을까? 라고 생각 할 수 있지만 개발자는 LoggingButton과 같이 사용하고 추후 이런 방식으로 사용 할 수 있도록 개선이 될 확률이 높습니다.

그러므로 LoggingButton처럼 사용하면 된다고 생각 해 주시면 됩니다.
