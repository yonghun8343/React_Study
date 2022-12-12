import React from "react";
import PropTypes from "prop-types";
import "./Buttons.css";

function Buttons({ onClick }) {
  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => {
          onClick("GET");
        }}
      >
        GET
      </button>
      <button
        type="button"
        onClick={() => {
          onClick("POST");
        }}
      >
        POST
      </button>
      <button
        type="button"
        onClick={() => {
          onClick("PUT");
        }}
      >
        PUT
      </button>
      <button
        type="button"
        onClick={() => {
          onClick("DELETE");
        }}
      >
        DELETE
      </button>
      <button
        type="button"
        onClick={() => {
          onClick("ERROR");
        }}
      >
        Error
      </button>
    </div>
  );
}

Buttons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Buttons;
