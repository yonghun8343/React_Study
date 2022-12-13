import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Delete({ isLoading, setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/1`)
      .then((res) => {
        console.log(res);
        return setData(res.data);
      })
      .then(() => setIsLoading(false));

    return () => {
      setIsLoading(false);
    };
  }, []);
  return <div>{!isLoading && `${JSON.stringify(data)}`}</div>;
}

Delete.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Delete;
