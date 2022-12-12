import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Post({ setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((res) => setData(res.data))
      .then(() => setIsLoading(false));
  }, []);
  return <div>{`${JSON.stringify(data)}`}</div>;
}

Post.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Post;
