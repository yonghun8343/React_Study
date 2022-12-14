import React from "react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";

function Favorite({ contact }) {
  // yes, this is a `let` for later
  const { favorite } = contact;
  return (
    <Form method="post">
      <button
        type="button"
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

Favorite.propTypes = {
  contact: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Favorite;
