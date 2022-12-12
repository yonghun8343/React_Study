import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Error({ setIsLoading }) {
  const [data, setData] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/showmeerro`)
      .then((res) => setData(res.data))
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setData(err.response.status);
      });
  }, []);
  return <div>{`${JSON.stringify(data)}`}</div>;
}

Error.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Error;
