# Axios

HTML에서 우리는 HTTP통신을 할 때 XMLHttpRequest를 이용하였습니다. 이 때 우리가 사용 하는 방법이나 데이터를 넣는 것이 다소 불편하고 응답을 받은 뒤에 처리를 하는 것도 다소 불편한 부분이 있었습니다.

그래서 React에서는 Axios라는 모듈을 이용하여 Http통신을 합니다.

React에서 Http통신을 위해 자주 사용하는 모듈은 크게 두가지가 있습니다. fetch 와 Axios가 있는데 각각의 특징을 알아 보겠습니다.

자세한 사항은 [한글 링크](https://velog.io/@eunbinn/Axios-vs-Fetch), [영어 링크](https://meticulous.ai/blog/fetch-vs-axios/)를 참고 해 주세요.

fetch

- ES6 이상의 자바스크립트에 기본적으로 내장된 API
- 장점
  - Promise로 비동기 처리가 가능하다.
  - 별도의 모듈 설치 없이 사용이 가능함.
  - Axios보다 가볍다.
- 단점
  - 가벼운 만큼 별 기능이 없다.

Axios

- Node.js와 브라우저를 위한 Promise 기반 HTTP 비동기 통신 라이브러리
- 장점
  - Promise로 비동기 처리가 가능하다.
  - responseType를 설정 해 두면 별도의 추가 동작 필요없이 바로 응답값을 사용 할 수 있다.
  - POST보낼 때 자동으로 JSON.stringify를 해 준다. 👍
- 단점
  - 기능이 추가된 만큼 무겁다. (큰 차이는 없다)

Axios는 Node.js와 Browser를 위한 Promise기반의 HTTP 비동기 통신 라이브러리입니다.

XMLHttpReqeust와는 다르게 비동기 통신을 가능하게하고, promise를 이용할 수 있기 때문에 XMLHttpReqeust보다 큰 장점이 있습니다.

이제 CRA에서 axios를 사용하기 위해 설치를 해 줍시다.

```bash
npm i axios
```

모듈 설치가 완료 되었으면 우리는 Axios를 사용 할 수 있습니다.

Axios를 테스트 해 보기 위해 별도의 서버를 구동하지 않고 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)를 이용 합니다.

## 사전 준비

상태를 지정하는 값을 두고 버튼을 클릭 했을 때 각각의 버튼에서 GET, POST, PUT, DELETE, Error를 실행 해 보려 합니다.

사전 준비를 위한 코드는 10.Axios의 my-app에서 src폴더를 참고 해 주세요.

## GET

GET을 보내는 방법은 다음과 같습니다.

```javascript
axios.get("경로?파라미터");

axios
  .get("/user?ID=12345")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

## POST

POST를 보내는 방법은 다음과 같습니다.

```javascript
axios
  .post("경로", body 값)

axios
  .post("/user", {
    firstName: "Fred",
    lastName: "Flintstone",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## PUT

PUT을 보내는 방법은 다음과 같습니다.

```javascript

axios
  .put("경로", body 값)

axios
  .put("/user", {
    firstName: "Fred",
    lastName: "Flintstone",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## DELETE

DELETE를 보내는 방법은 다음과 같습니다.

```javascript
axios.delete("경로?파라미터");

axios
  .delete("/user?ID=12345")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

## 공통 처리

GET이나 POST와 상관 없이 공통적으로 처리 하는 방법은 아래와 같다.

```javascript
// Send a POST request
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
});
// GET request for remote image in node.js
axios({
  method: "get",
  url: "https://bit.ly/2mTM3nY",
  responseType: "json",
}).then(function (response) {
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});
```

## Error 처리

에러가 발생할 경우 아래와 같이 세부적으로 처리 할 수 있지만 보통은 그냥 catch에서 에러만 별도로 처리 해 준다.

```javascript
axios.get("/user/12345").catch(function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
});
```

## 응답 스키마

요청에 따른 응답 결과에는 다음의 정보가 들어 있습니다.

```json
{
  // `data`는 서버가 제공한 응답(데이터)입니다.
  "data": {},

  // `status`는 서버 응답의 HTTP 상태 코드입니다.
  "status": 200,

  // `statusText`는 서버 응답으로 부터의 HTTP 상태 메시지입니다.
  "statusText": "OK",

  // `headers` 서버가 응답 한 헤더는 모든 헤더 이름이 소문자로 제공됩니다.
  "headers": {},

  // `config`는 요청에 대해 `axios`에 설정된 구성(config)입니다.
  "config": {},

  // `request`는 응답을 생성한 요청입니다.
  // 브라우저: XMLHttpRequest 인스턴스
  // Node.js: ClientRequest 인스턴스(리디렉션)
  "request": {}
}
```
