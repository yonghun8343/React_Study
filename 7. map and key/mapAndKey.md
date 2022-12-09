# map and Key

## map

여기서 우리는 map에 대해서 알아보고 리액트에서 map을 이용하여 렌더링을 하는 방법에 대해서 구현을 해 보려고 합니다.

이 후 리스트를 렌더링을 했을 때 리액트에서 선언 해 달라고 하는 key를 이용하여 리스트를 출력 하고 이를 수정하는 것 까지 하는 예제를 해 보려 합니다.

우선 map()함수가 어떤 것인지 다시 알아 봅시다.

### map의 특징

map은 배열(Array)에 속한 함수입니다. 그러므로 배열이 아닌 객체(Object)나 문자(String)등의 자료형에서는 사용이 불가능합니다.

map은 forEach처럼 하나씩 값을 꺼내 계산을 합니다. 그러므로 value에는 배열에서 첫번째 값을 꺼내오고 그 다음 연산으로 다음 값을 꺼내옵니다.

그리고 map은 새롭게 꺼내오고 함수 안에서 return한 값을 모아서 새로운 배열로 할당 해 줍니다.

기본 형태는 다음과 같습니다.

```javascript
배열.map((value, index, array) => {
  value : "배열의 첫번째 부터 하나 씩 꺼내져 오는 값",
  index : "해당 값이 있는 배열의 index"
  array : "원본 배열"
})

const array = [1,2,3];
const newArray = array.map((value) => value * 2)  // [2, 4, 6]
```

## JSX에 map 할당하기

map을 이용해서 배열안에 있는 값들을 여러 컴포넌트로 할당 할 수 있습니다.

아래의 예제를 같이 해 봅시다.

```javascript
const number = [1, 2, 3, 4, 5];
const itemList = number.map((value) => {
  return <li>{value}</li>;
});
```

이를 ul에 넣고 리액트로 렌더를 하게 되면 li에 숫자가 들어간 리스트를 보여 줍니다.

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
const array = [1, 2, 3, 4, 5];
const array2 = array.map((value) => {
  return <li>{value}</li>;
});
function ClientList(props) {
  return <ul>{props.clientList}</ul>;
}
root.render(<ClientList clientList={array2} />);
```

## Key

map을 통해서 li를 렌더링을 하였을 때 콘솔을 보면 key를 넣어야 한다는 경고가 나옵니다.

"key"는 리스트를 만들 때 포함해야하는 특수한 문자열 어트리뷰트입니다.

key는 우리가 props를 넣듯이 JSX에서 해당 값을 `key={특정 id}`를 넣어주면 해결이 됩니다.

우리는 map을 통해서 값을 넣었기 때문에 특정 id가 없습니다.

그러므로 index를 이용해서 key를 처리 해 봅시다.

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
const array = [1, 2, 3, 4, 5];
const array2 = array.map((value, index) => {
  return <li key={index}>{value}</li>;
});
function ClientList(props) {
  return <ul>{props.clientList}</ul>;
}
root.render(<ClientList clientList={array2} />);
```

이제 key를 넣어 달라는 콘솔의 경고가 사라 졌습니다.

참고로 key는 리액트에서 관리를 하기 때문에 function이라던지 클래스 내에서 관리가 됩니다. 그러므로 다른 function이나 class에서는 같은 id값이 사용되더라도 큰 지장은 없습니다.

위의 코드를 조금 더 깔끔하게 가다듬어 봅시다.

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
const array = [1, 2, 3, 4, 5];
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberLists(props) {
  const number = props.number;
  const listItem = number.map((value, index) => {
    return <ListItem key={index} value={value} />;
  });

  return <ul>{listItem}</ul>;
}

root.render(<NumberLists number={array} />);
```

우리는 여기서 JSX안에 map을 넣을 수 있다는 것을 생각 해야합니다.

이제 NumberLists함수에서 listItem 부분에 map을 넣어봅시다.

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
const array = [1, 2, 3, 4, 5];

function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberLists(props) {
  const number = props.number;
  return (
    <ul>
      {number.map((value, index) => {
        return <ListItem key={index} value={value} />;
      })}
    </ul>
  );
}

root.render(<NumberLists number={array} />);
```

참고로 key값은 id와는 다르게 전체 코드에서 유일 할 필요는 없습니다.

함수나 클래스 컴포넌트 안에서만 고유하면 됩니다!

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
const array = [1, 2, 3, 4, 5];

function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberLists(props) {
  const number = props.number;
  return (
    <ul>
      {number.map((value, index) => {
        return <ListItem key={index} value={value} />;
      })}
    </ul>
  );
}
function NumberLists2(props) {
  const number = props.number;
  return (
    <ul>
      {number.map((value, index) => {
        return <ListItem key={index} value={value} />;
      })}
    </ul>
  );
}

function AllLists(props) {
  return (
    <div>
      <NumberLists number={array} />
      <NumberLists2 number={array} />
    </div>
  );
}

root.render(<AllLists number={array} />);
```

자 이제 우리는 리스트로 된 데이터를 화면에 빠르고 간단한 코드로 구현 할 수 있게 되었습니다.

이제 리스트를 추가하고 삭제하는 코드를 구현 해 봅시다.

우선 위의 코드아래의 코드를 구현 후 각각을 설명 하겠습니다.

> list.html

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

    function AddArea(props) {
      return (
        <div>
          <input value={props.value} onChange={props.onChange} />
          <button onClick={props.onClick}>추가</button>
        </div>
      );
    }

    function ListItem(props) {
      console.log(props);
      return <li onDoubleClick={props.onDoubleClick}>{props.value}</li>;
    }

    function TextLists(props) {
      const items = props.items;
      return (
        <ul>
          {items.map((value, index) => {
            return (
              <li
                key={index}
                onDoubleClick={() => {
                  props.onDoubleClick(index);
                }}
              >
                {value}
              </li>
            );
          })}
        </ul>
      );
    }

    class ListControl extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          list: [1, 2, 3],
          value: "",
        };
      }

      handleChange = (e) => {
        this.setState({ value: e.target.value });
      };

      handleInsert = () => {
        this.setState({
          // list: this.state.list.concat(this.state.value),
          list: [...this.state.list, this.state.value],
          value: "",
        });
      };

      handleRemove = (index) => {
        const lists = this.state.list;
        this.setState({
          list: [
            ...lists.slice(0, index),
            ...lists.slice(index + 1, lists.length),
          ],
        });
      };

      render() {
        return (
          <React.Fragment>
            <AddArea
              value={this.state.value}
              onChange={this.handleChange}
              onClick={this.handleInsert}
            />
            <TextLists
              items={this.state.list}
              onDoubleClick={this.handleRemove}
            />
          </React.Fragment>
        );
      }
    }

    root.render(<ListControl />);
  </script>
</html>

```

위 코드에서 전체를 렌더링 하는 ListControl을 만들고 root에 렌더링합니다.

그리고 별도의 div로 감싸주지 않기 위해 React.Fragment를 이용하였습니다.

제일 처음 input과 button을 넣기 위해 AddArea를 만들어 줍니다. 그리고 하위 리스트를 출력하기 위한 TextLists를 만들어 줍니다.

그 뒤 기본 형태를 찾으면 constructor에서 props와 state를 받아줍니다.

특히나 state에서는 input에서 현재 작성중인 값인 value와 전체 리스트 값인 list를 만들어 줍니다.
