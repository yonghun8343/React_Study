import { Form, useLoaderData, useParams } from "react-router-dom";
import React from "react";
import Favorite from "./favorite";
import { getContact } from "../contacts";

export async function loader({ params }) {
  return getContact(params.contactId);
}

function Contact() {
  const contact = useLoaderData();
  const param = useParams();
  console.log(param);

  return (
    <div id="contact">
      <div>
        <img alt="" key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <div>
              {contact.first} {contact.last}
            </div>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            // onSubmit={(event) => {
            //   if (!confirm("Please confirm you want to delete this record.")) {
            //     event.preventDefault();
            //   }
            // }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
