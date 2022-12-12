import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Get({ setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((res) => setData(res.data))
      .then(() => setIsLoading(false));
  }, []);
  return <div>{`${JSON.stringify(data)}`}</div>;
}

Get.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Get;
