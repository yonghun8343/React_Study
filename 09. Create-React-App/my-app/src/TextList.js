function TextList(props) {
  return (
    <ul>
      {props.items.map((value, index) => {
        return (
          <li key={index}>
            <span>{`이름 : ${value.name}, 상태 : ${
              !value.status ? "로그아웃" : "로그인"
            }`}</span>
            {!value.status ? (
              <button
                onClick={() => {
                  props.reStatus(index);
                }}
              >
                로그인 시키기
              </button>
            ) : (
              <button
                onClick={() => {
                  props.reStatus(index);
                }}
              >
                로그아웃 시키기
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default TextList;
