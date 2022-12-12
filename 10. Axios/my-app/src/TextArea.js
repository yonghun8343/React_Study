function TextArea(props) {
  return (
    <div>
      <span>{`현재 온라인 한 고객의 수는 ${props.count}명 입니다.`}</span>
    </div>
  );
}

export default TextArea;
