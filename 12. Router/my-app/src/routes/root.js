/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSearchParams,
  useParams,
  useLocation,
  useSubmit,
} from "react-router-dom"; // Outlet이 자식 위치 전달하는 함수
import { createContact, getContacts } from "../contacts"; // 데이터를 전달 받는 함수

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const { contact } = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

function Root() {
  const submit = useSubmit();
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  console.log("searchParam", searchParams.get("q"));
  const useparams = useParams();
  console.log("useparams", useparams);
  const uselocation = useLocation();
  console.log("useLocation", uselocation);

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            <div id="search-spinner" aria-hidden hidden />
            <div className="sr-only" aria-live="polite" />
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive }) =>
                      isActive ? "active" : "pending"
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Root;
