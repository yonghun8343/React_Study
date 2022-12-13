import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Delete({ setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/1`)
      .then((res) => {
        return setData(res.data);
      })
      .then(() => setIsLoading(false));
  }, []);
  return <div>{`${JSON.stringify(data)}`}</div>;
}

Delete.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Delete;
