function InputArea(props) {
  return (
    <div>
      <input type="text" onChange={props.change} value={props.value} />
      <button onClick={props.add}>추가</button>
    </div>
  );
}

export default InputArea;
