import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Put({ setIsLoading }) {
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
      .then((res) => {
        return setData(JSON.stringify(res.data));
      });
    return () => {
      setIsLoading(false);
    };
  }, []);
  return <div>{data}</div>;
}

Put.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Put;
