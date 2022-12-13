import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Get({ isLoading, setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((res) => setData(res.data))
      .then(() => setIsLoading(false));

    return () => {
      setIsLoading(false);
    };
  }, []);
  return <div>{!isLoading && `${JSON.stringify(data)}`}</div>;
}

Get.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Get;
