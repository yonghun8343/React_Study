# Class

JSX와 Props에서는 함수 컴포넌트를 이용하여 리액트를 구현해 왔습니다.

하지만 함수형으로 구현 하였을 때에 가지고 있는 단점들이 있고 이를 해결하기 위해 보통 React에서는 함수 컴포넌트 보다는 클래스를 이용하여 코드를 선언 합니다.

클래스는 리액트의 문법이 아니라 ES6에서 추가된 문법입니다.

추후 클래스에 대한 추가적인 정보를 알고 싶다면 [링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)에서 확인 해 주세요.

3장의 내용을 완전히 이해하지 않더라도 React를 구현하는데에 큰 무리가 없습니다. 기본 형태와 대충 이렇다~ 라는 식으로 알고 넘어가시고 리액트나 JS에 대한 이해가 더 생겼을 때 Class를 봐주셔도 상관 없습니다.

## Class 기초 설명

간단히 설명을 하자면 Class는 객체를 생성하기 위한 템플릿입니다.

### Class 기본형

Class를 선언하는 기본 형태는 다음과 같습니다.

``` javascript
class Rectangle {
  ...
}
```

위의 예시는 사각형이라는 class를 만드는 것을 예로 들었습니다.

class 뒤에 클래스 명을 입력 해 주고 객체를 의미하는 {} 안에 값을 넣습니다.

### Constructor (생성자)

constructor 메서드는 class 로 생성된 객체를 생성하고 초기화하기 위한 특수한 메서드입니다.

"constructor" 라는 이름을 가진 특수한 메서드는 클래스 안에 한 개만 존재할 수 있습니다. 만약 클래스에 여러 개의 constructor 메서드가 존재하면 SyntaxError 가 발생할 것입니다.

constructor는 부모 클래스의 constructor를 호출하기 위해 super 키워드를 사용할 수 있습니다.

여기서 constructor는 영어 의미로는 `생성자` 라는 의미를 가지고 있습니다. 즉 class를 만드는데 필요한 값에 대해서 선언을 해 줍니다.

``` javascript
class Rectangle {
  constructor(값1, 값2) {
    this.값1 = 값1
    this.값2 = 값2
  }
}
```

this.값(1,2) 는 constructor 코드 아래에서 사용되는 변수에 대해서 정의를 합니다.

### `extend`를 통한 클래스 상속(sub classing), `super`를 통한 상위 클래스 호출

extends 키워드는 클래스 선언이나 클래스 표현식에서 다른 클래스의 자식 클래스를 생성하기 위해 사용됩니다.

super는 부모 클래스에서 내부에 값을 저장 한 하는 코드를 하는 일을 대신 해 달라는 것 입니다.

다음 세가지 예시를 보면서 extend와 super를 알아봅시다.

``` javascript
class Animal { // 부모 클래스를 정의 합니다.
  constructor(name) { // 해당 클래스는 name을 받아 내부에 값을 저장합니다.
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`); // 콘솔 로그를 실행하는 함수 입니다.
  }
}

class Dog extends Animal { // extends를 통해 부모 클래스를 정의 합니다.
  constructor(name) {
    super(name); // super class 생성자를 호출하여 name 매개변수 전달
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

``` javascript
class Person { // 부모 클래스를 정의 합니다.
    constructor(name, first, second) { // 해당 클래스는 name, first, second를 받아 내부에 값을 저장합니다.
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum(){
        return this.first+this.second; // first와 second를 더하여 값을 출력
    }
}

class PersonPlus extends Person { // extends를 통해 부모 클래스를 정의 합니다.
    constructor(name, first, second, third){
        super(name, first, second); // super class 생성자를 호출하여 name 매개변수 전달
        this.third = third; // 자식에서 사용할 값 추가
    }
    sum(){
        return super.sum()+this.third;
    }
    avg(){
        return (this.first+this.second+this.third)/3;
    }
}

var hun = new PersonPlus('hun', 10, 20, 30);
console.log("hun.sum()", hun.sum());
console.log("hun.avg()", hun.avg());
```

``` javascript
class Cat { // 부모 클래스를 정의 합니다.
  constructor(name) {
    this.name = name;  // 해당 클래스는 name을 받아 내부에 값을 저장합니다.
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Lion extends Cat { // extends를 통해 부모 클래스를 정의 합니다.
  speak() {
    super.speak(); // 부모 함수를 받아와 실행합니다.
    console.log(`${this.name} roars.`);
  }
}

let l = new Lion('Fuzzy');
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.
```

## 함수 컴포넌트 Class로 바꾸기

함수 컴포넌트에서 클래스로 바꾸는 방법은 아래의 다섯 단계를 이용하여 변환 할 수 있습니다.

1. React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다.
2. render()라고 불리는 빈 메서드를 추가합니다.
3. 함수의 내용을 render() 메서드 안으로 옮깁니다.
4. render() 내용 안에 있는 props를 this.props로 변경합니다.
5. 남아있는 빈 함수 선언을 삭제합니다.

우리가 기존에 사용했던 함수 컴포넌트를 Class로 바꾸어 보겠습니다.

``` javascript
function Userinfo(props) {
  return (
    <div className="UserInfo">
      <h1 className="work">{props.author.work}</h1>
      <h2 className="UserInfo-name">{props.author.name}</h2>
    </div>
  );
}
```

우선 "1번 React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다."를 진행 해 줍니다.

``` javascript
class Userinfo extends React.Component {

}
```

"2번 render()라고 불리는 빈 메서드를 추가합니다."를 진행 해 줍니다.

``` javascript
class Userinfo extends React.Component {
  render() {

  }
}
```

"3번 함수의 내용을 render() 메서드 안으로 옮깁니다."를 진행 해 줍니다.

``` javascript
class Userinfo extends React.Component {
  render() {
    return (
      <div className="UserInfo">
        <h1 className="work">{props.author.work}</h1>
        <h2 className="UserInfo-name">{props.author.name}</h2>
      </div>
    );
  }
}
```

"4번 render() 내용 안에 있는 props를 this.props로 변경합니다."을 진행 해 줍니다.

``` javascript
class Userinfo extends React.Component {
  render() {
    return (
      <div className="UserInfo">
        <h1 className="work">{this.props.author.work}</h1>
        <h2 className="UserInfo-name">{this.props.author.name}</h2>
      </div>
    );
  }
}
```

"5번 남아있는 빈 함수 선언을 삭제합니다."는 Userinfo 코드를 이제 Class다 옮겼으니 삭제 한다는 뜻 입니다.

아래의 코드를 가지고 한번 더 시도 해 봅시다.

``` javascript
function Comment(props) {
  return (
    <div className="Comment">
      <Userinfo author={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

우선 "1번 React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다."를 진행 해 줍니다.

``` javascript
class Comment extends React.Component {

}
```

"2번 render()라고 불리는 빈 메서드를 추가합니다."를 진행 해 줍니다.

``` javascript
class Comment extends React.Component {
  render() {

  }
}
```

"3번 함수의 내용을 render() 메서드 안으로 옮깁니다."를 진행 해 줍니다.

``` javascript
class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <Userinfo author={props.author} />
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    );
  }
}
```

"4번 render() 내용 안에 있는 props를 this.props로 변경합니다."을 진행 해 줍니다.

``` javascript
class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        <Userinfo author={this.props.author} />
        <div className="Comment-text">{this.props.text}</div>
        <div className="Comment-date">{formatDate(this.props.date)}</div>
      </div>
    );
  }
}
```

"5번 남아있는 빈 함수 선언을 삭제합니다."는 Userinfo 코드를 이제 Class다 옮겼으니 삭제 한다는 뜻 입니다.

### 언제 무엇을 써야할까?

우리가 만들 컴포넌트가 Event에서 나오는 라이프 사이클이라는 API나 state를 사용하지않고, props만을 전달 받아 뷰를 렌더링 한다고 했을 때에는 함수형 컴포넌트를 이용하는 것이 훨씬 코드가 간결하고 보기가 좋습니다.

그래서 Class만을 고집해야한다! 라는 것은 아니니 함수 컴포넌트와 클래스 컴포넌트 둘 다 눈에 익혀두는 것이 좋습니다.
