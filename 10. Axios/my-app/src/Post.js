import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Post({ isLoading, setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    console.log(isLoading);
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        title: "123",
        body: "123",
        userId: 1,
      })
      .then((res) => setData(res.data))
      .then(() => setIsLoading(false));

    return () => {
      setIsLoading(false);
    };
  }, []);
  console.log(isLoading);
  return <div>{!isLoading && `${JSON.stringify(data)}`}</div>;
}

Post.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Post;
