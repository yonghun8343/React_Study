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

```
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

```
class Rectangle {
  constructor(값1, 값2) {
    this.값1 = 값1
    this.값2 = 값2
  }
}
```

this.값(1,2) 는 constructor 코드 아래에서 사용되는 변수에 대해서 정의를 합니다.

### `extend`를 통한 클래스 상속(sub classing)

extends 키워드는 클래스 선언이나 클래스 표현식에서 다른 클래스의 자식 클래스를 생성하기 위해 사용됩니다.

```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
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

// 여기서 부터 작업

## 함수 컴포넌트 Class로 바꾸기

함수 컴포넌트에서 클래스로 바꾸는 방법은 아래의 다섯 단계를 이용하여

```

```
