class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  func = () => {
    this.setState({
      count: 1,
    });
  };
}

function func(props) {
  const [count, setState] = useState(0);

  setState(1);
}

class Life extends React.Component {
  componentDidMount() {
    console.log("렌더가 되었을 때");
  }

  componentDidUpdate() {
    console.log("업데이트가 되었을 때");
  }

  componentDidUnmount() {
    console.log("언마운트 되었을 때");
  }
}

function life(props) {
  React.useEffect(() => {
    console.log("렌더 & 업데이트가 되었을 때");

    return function funcName() {
      console.log("언마운트 되었을 때");
    };
  });
}
