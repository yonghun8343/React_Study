# Props

여러분들이 HTML을 할 때 태그 안에 별도의 값을 넣어 이를 받아 JS에서 처리하고 싶다는 생각을 해 보신 적이 있을 것 입니다.

Props는 Properties의 줄임말입니다.

우선 아래의 코드를 작성 해 봅시다.

> props.html

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

위의 예시에는 다음과 같은 일들이 일어납니다.

1. tick 함수내에서 element 변수 내에 선언된 것으로 root.render()를 호출합니다.

2. React는 {name: '대한민국'}를 props로 하여 H1컴포넌트를 호출 합니다.

3. H1 컴포넌트는 결과적으로 `<h1>Hello, 대한민국</h1>` 엘리먼트를 반환합니다.

4. React Dom은 `<h1>Hello, 대한민국</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트 합니다.

## 컴포넌트 추출

props를 이용하게 되면 여러개의 컴포넌트로 나누게 되었을 때 정보를 효율적으로 나눌 수 있게 됩니다.

props-exp1.html고 아래의 내용을 넣어 봅시다.

> props-exp1.html

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
    const root = ReactDOM.createRoot(document.getElementById("root"));

    function Comment(props) {
      return (
        <div className="Comment">
          <div className="UserInfo">
            <h1 className="work">{props.author.work}</h1>
            <h2 className="UserInfo-name">{props.author.name}</h2>
          </div>
          <div className="Comment-text">{props.text}</div>
          <div className="Comment-date">{formatDate(props.date)}</div>
        </div>
      );
    }

    const comment = {
      date: new Date(),
      text: "리액트 Props 테스트 입니다.",
      author: {
        name: "hun",
        work: "효성직업전문학원",
      },
    };

    function formatDate(date) {
      return date.toLocaleDateString();
    }

    root.render(
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />
    );
  </script>
</html>
```

이 코드에서 userInfo의 코드를 컴포넌트로 묶어서 표현 하는 것을 props-exp2.html에서 작업 해 봅시다.

> props-exp2.html

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
    const root = ReactDOM.createRoot(document.getElementById("root"));

    function Userinfo(props) {
      return (
        <div className="UserInfo">
          <h1 className="work">{props.author.work}</h1>
          <h2 className="UserInfo-name">{props.author.name}</h2>
        </div>
      );
    }

    function Comment(props) {
      return (
        <div className="Comment">
          <Userinfo author={props.author} />
          <div className="Comment-text">{props.text}</div>
          <div className="Comment-date">{formatDate(props.date)}</div>
        </div>
      );
    }

    const comment = {
      date: new Date(),
      text: "리액트 Props 테스트 입니다.",
      author: {
        name: "hun",
        work: "효성직업전문학원",
      },
    };

    function formatDate(date) {
      return date.toLocaleDateString();
    }

    root.render(
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />
    );
  </script>
</html>

```

# Props 관련 속성 값들

만약 여러 사람과 작업을 진행할 때 Props와 관련된 속성값을 썻을 때 필요한 속성값이 들어가지 않거나 타입이 다를 경우 이를 에러나 정의를 했다는 것을 표현 할 필요가 있습니다.

props-exp2.html에서 Comment에 설정한 text값을 없애 봅시다. 이 때 text값을 사용하는 Comment-text 클래스는 아무 에러가 없이 렌더링이 되지 않습니다. 즉 우리가 여기서 Props를 제대로 넣지 않았어도 이것이 정상적으로 작동하는지 비정상적인지에 대한 구분이 불분명합니다.

코드를 유지보수할 때에도 다른 사람이 보았을 때 해당 Props에 대해서 정보를 확인 할 필요가 있으므로 다음으로 나오는 속성들에 대해서는 사용하고 관련 설정들을 알 필요가 있습니다.

## Props 기본 값 설정 : defaultProps

props-exp2.html에서 삭제한 text에서 해당 값이 없을 때 무엇인가 기본 값을 넣거나 해당 값이 없다는 것을 보여주기 위해서는 defaultProps를 이용하면 됩니다.

function Comment {} 의 밑에 아래의 코드를 넣어 봅시다.

> props-exp2.html

```
Comment.defaultProps = {
  text: "기본값이 들어갔습니다. 값을 확인 해 주세요."
}
```

자 이제 text값을 넣지 않았음에도 렌더링은 진행이 되었고 해당 값으로는 우리가 기본 값으로 설정 해 둔 것이 들어갔습니다.

## Props 타입 검증 : propsTypes

props에 들어가는 값이 문자열인지 숫자형인지 혹은 Object인지에 대해서 구분을 해야할 때에는 propsTypes를 사용합니다. 특히나 Object를 받아야하는데 해당 코드를 처음 접한 사람은 타입을 실수하기 쉽습니다.

React를 패키지에서 설치하여 사용 할 때에는 props-types라는 패키지가 자동으로 설치가 되지만, 우리는 현재 html에서만 작업을 하고 있기 때문에 script부분에 아래의 코드를 넣어줍니다.

아래의 코드는 prop-types에서 사용할 코드를 별도로 불러와 줍니다.

> props-exp2.html

```
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
```

위의 코드를 추가 하고 나서 Comment.defaultProps 아래에 아래의 코드를 넣어 봅시다.

> props-exp2.html

```
Comment.propTypes = {
  text: PropTypes.string, // text는 props 타입을 문자열로 설정
};
```

이제 제대로 동작하는지 확인 하기 위해서 혹시나 이전의 defaultProps에서 text={comment.text}를 삭제 했다면 다시 채워 넣고, comment object에서 text값을 숫자 5로 바꾸어 봅시다.

이제 콘솔창에서 다음과 같은 에러를 볼 수 있습니다.

```
Warning: Failed prop type: Invalid prop `text` of type `number` supplied to `Comment`, expected `string`
```

즉 text의 타입이 문자열(string)이어야 하는데 현재 들어온 타입은 숫자형(number)이라는 에러를 띄워 줍니다. 이를 통해 우리가 어디부분에서 타입을 잘못 넣었는지 체크를 할 수 있습니다.

## 필수 propTypes 설정

props를 설정 하지 않았을 때 default를 통해서 기본값입니다! 라고 렌더링 하는 것이 아니라 콘솔에 에러를 띄우고 싶을 때에는 propTypes를 통해서 설정 할 수 있습니다.

연습 해 보기 위해 아래의 코드로 바꾸어 주세요

> props-exp2.html

```
Comment.propTypes = {
  text: PropTypes.string.isRequired
};
```

이제 text를 문자열로 하고 새로고침을 하면 그래도 해당 값이 들어는 왔기 때문에 string타입으로 넣어 달라는 에러가 발생합니다.

그렇다면 우리가 애초에 해당 값이 없을 때 에러를 보고싶었기 때문에
`text={comment.text}`를 삭제 해 봅시다.

이 때 isRequired이어도 default값이 string으로 들어갔기 때문에 propTypes에서는 제대로 된 값이 들어왔다고 판단합니다.

이는 propTypes코드와 defaultProps코드의 순서를 바꾸어도 동일하게 됩니다.

즉 defaultProps -> propTypes 의 순서로 동작 된다고 생각하면 좋습니다.

자 이제 defaultProps도 주석을 하였을 때 아래의 에러 콘솔을 볼 수 있습니다.

```
react.development.js:199 Warning: Failed prop type: The prop `text` is marked as required in `Comment`, but its value is `undefined`.
```

에러를 제대로 출력 하는 것도 중요합니다. 즉 해당 순서를 잘 알고 익숙해 져야 능동적으로 사용 할 수 있을 것 입니다.

## propTypes에 넣을 수 있는 타입의 종류

propTypes에 넣을 수 있는 타입은 다음 [링크](https://github.com/facebook/prop-types#usage)에서 자세히 참고해 주시고 아래에는 많이 쓰는 타입들을 설명 하였습니다.

| 타입 예시                                                   | 설명                          |
| :---------------------------------------------------------- | :---------------------------- |
| array                                                       | 배열                          |
| bool                                                        | 불린(참, 거짓)                |
| func                                                        | 함수                          |
| number                                                      | 숫자                          |
| object                                                      | 객체                          |
| string                                                      | 문자열                        |
| symbol                                                      | 심볼(ES6)                     |
| node                                                        | 렌더링할 수 있는 노드         |
| element                                                     | 리액트 요소                   |
| instanceOf(MyClass)                                         | 특정 클래스의 인스턴스        |
| oneOf(['News', 'Photos'])                                   | 주어진 배열 중 하나           |
| oneOfType([PropTypes.string,PropTypes.number])              | 주어진 배열의 타입 중 하나    |
| arrayOf(PropTypes.number)                                   | 주어진 타입으로 이루어진 배열 |
| objectOf(propTypes.number)                                  | 주어진 타입으로 이루어진 객체 |
| shape({color: PropTypes.string,fontSize: PropTypes.number}) | 주어진 형태를 가진 객체       |
| any                                                         | 아무 타입                     |

## defaultProps와 propTypes를 꼭 사용해야 할까요?

그렇지는 않습니다. 위에서 설명 했다시피 여러 사람이 코드를 구성할 때나 추후 유지보수를 진행할 때에 결국에는 사람이 코드를 이해하고 다시 구현 할 때 이를 조금더 명확하고 빠르게 코드를 이해 할 수 있도록 도와주는 것이지 필수는 아니라고 생각하면 됩니다.
