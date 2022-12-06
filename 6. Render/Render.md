# 조건부 렌더링

이번 장에서는 그냥 렌더링에 대한 것을 보는 것이 아닌 조건부 렌더링에 대해서 리액트로 표현하는 방법에 대해서 해 보려고 합니다.

조건부 렌더링은 어떤 상황에서 사용이 되는지 생각을 해 보면 예를들어서 로그인 버튼과 로그아웃 버튼이 있을 때 로그인을 하지 않았을 때에는 로그인 버튼이 표현되어야하지만 로그인을 한 상태에서는 로그아웃 버튼이 출력이 되어야합니다. 이러한 경우를 처리 한 코드를 조건부 렌더링이라고 합니다.

우리는 예시로 아래의 두 컴포넌트를 만들어 봅시다.

``` javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

로그인을 한 상태에 따라서 렌더링을 하는 방법은 다음과 같습니다.

``` javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
```

위의 예시는 isLoggedIn값에 따라 다른 인사말을 렌더링 해 줍니다.

이번 예시는 로그인 버튼과 로그아웃 버튼을 조건부 렌더링을 해 보려고 합니다.

``` javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);
```

위의 예제를 통해 setState를 이용하여 상태값을 바꾸고 각 상황에 맞는 컴포넌트를 출력 하는 방법을 해 보았습니다.

지금까지의 예제는 if문을 통하여 우리가 이해하기 쉽게 진행을 해 보았고 다음부터는 조금 더 개발자 스럽게 조건부 렌더링을 하는 코드를 구현 해 보려고 합니다.

## 논리 && 연잔자로 IF를 인라인으로 표현하기

&&는 `true && expression`으로 코드를 구현한 경우에 `expression`이 나오고, `false && expression`으로 코드를 구현한 경우에는 `false`가 나옵니다.

&&연산자는 필요할 경우 렌더링을 해 주고 필요 없을 경우에는 렌더링을 하지 않는 상황일 때 사용 해 주면 좋습니다.

다음 예제를 해 봅시다.

``` javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
// const messages = []

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Mailbox unreadMessages={messages} />);
```

위 예제의 messages변수에 있는 주석을 바꿔가면서 어떻게 동작되는지 파악 해 봅시다.

## 삼항연산자를 이용하여 인라인으로 표현하기

이번에는 주로 많이 쓰는 삼항연산자를 이용하여 조건부 렌더링을 구현 해 보려고 합니다.

``` javascript
// 이전의 LoginControl Class에 추가 해 봅니다.
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

혹은 조금 더 큰 표현식에도 삼항연산자를 표현 할 수 있습니다.

``` javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```
