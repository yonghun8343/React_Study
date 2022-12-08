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
