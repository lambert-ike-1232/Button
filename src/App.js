import React, { useState, useCallback } from "react";
import styled from "styled-components";
import * as R from "ramda";
import useInterval from "use-interval";

export const List = () => {
  const [ids, setList] = useState([]);
  const [newItem, setNewItem] = useState();
  const [active, setActive] = useState(ids[0]);

  //Getting next ID and Cyling
  const makeGetNextId = (newList) =>
    R.pipe(
      R.equals,
      R.findIndex(R.__, newList),
      R.inc,
      R.nth(R.__, newList),
      R.defaultTo(R.head(newList))
    );
  useInterval(() => {
    // Your custom logic here
    setActive(getNextId(active));
  }, 1000); // passing null instead of 1000 will cancel the interval if it is already running
  const getNextId = makeGetNextId(ids);

  //Add Function usign callback
  const addItem = useCallback(() => {
    // uniq avoids duplicates
    const newList = R.pipe(R.append(newItem), R.uniq)(ids);
    console.log({ newList });
    setList(newList);
    setNewItem("");
  }, [newItem, setList]);

  //Deleting the selected item
  const delItem = useCallback(() => {
    // uniq avoids duplicates
    const newList = R.pipe(R.without(newItem), R.uniq)(ids);
    console.log({ newList });
    setList(newList);
    setNewItem("");
  }, [newItem, setList]);

  //Return AKA What you're going to see
  return (
    <Style>
      <div>
        <div>
          ID:
          <input
            type="text"
            name="newItem"
            id="newItem"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="button" onClick={addItem}>
            Add
          </button>
          <button type="button" onClick={delItem}>
            Delete
          </button>
        </div>
        <div>
          {" "}
          {active}
          {getNextId(active)}{" "}
        </div>

        {/* Bullet points */}
        {/* <ul>
        {R.map(
          (item) => (
            <li key={item}>{item}</li>
          ),
          ids
        )}
      </ul> */}
        <ul>
          {ids.map((newItem) => (
            <li key={newItem}>
              <button
                active={active === newItem}
                onClick={() => setActive(newItem)}
              >
                {newItem}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Style>
  );
};

// Styling
const Style = styled.section`
  font-family: Georgia, "Times New Roman", Times, serif;
  margin: 2em;
  color: rgb(0, 0, 0);
  font-style: italic;
  background: rgb(255, 255, 255);
  display: grid;
  grid-template-columns: 1fr 1fr;
  div {
    outline: 1px solid black;
  }
  ul {
    list-style-type: none;
  }
`;

export default function App() {
  return (
    <>
      <List />
    </>
  );
}
