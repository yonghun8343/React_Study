import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Put({ isLoading, setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/1`, {
        id: 2,
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
  return <div>{!isLoading && `${JSON.stringify(data)}`}</div>;
}

Put.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Put;
