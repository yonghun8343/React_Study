import React, { useState, useMemo } from "react";
import InputArea from "./InputArea";
import TextArea from "./TextArea";
import TextList from "./TextList";

function App(props) {
  const user = [
    {
      id: 0,
      name: "홍길동",
      status: true,
    },
    {
      id: 1,
      name: "김아무개",
      status: false,
    },
    {
      id: 2,
      name: "이아무개",
      status: true,
    },
    {
      id: 3,
      name: "최아무개",
      status: false,
    },
    {
      id: 4,
      name: "박아무개",
      status: true,
    },
  ];

  const [users, changeUsers] = useState(user);
  const [value, changeValue] = useState("");

  const addUser = () => {
    changeUsers([...users, { id: users.length, name: value, status: true }]);
    changeValue("");
  };

  const reValue = (e) => {
    changeValue(e.target.value);
  };

  const reStatus = (index) => {
    changeUsers(
      users.map((user) =>
        user.id === index ? { ...user, status: !user.status } : user
      )
    );
  };

  const memo = useMemo(() => {
    return users.filter((user) => user.status === true).length;
  }, [users]);

  return (
    <React.Fragment>
      <InputArea value={value} change={reValue} add={addUser} />
      <TextArea count={memo} />
      <TextList items={users} reStatus={reStatus} />
    </React.Fragment>
  );
}

export default App;
