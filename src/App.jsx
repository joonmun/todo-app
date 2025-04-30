import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import { setItem, getItem } from "./utils/localStorage";

function App() {
  const [toggleList, setToggleList] = useState(() => {
    const item = getItem("toggleList");
    return item || 0;
  });

  const [listObjects, setListObjects] = useState(() => {
    const item = getItem("listObjects");
    return item || [];
  });

  const [listIds, setListIds] = useState(() => {
    const item = getItem("listIds");
    return item || [];
  });

  const [nextId, setNextId] = useState(() => {
    const item = getItem("nextId");
    return item || 0;
  });

  useEffect(() => {
    setItem("toggleList", toggleList);
  }, [toggleList]);

  useEffect(() => {
    setItem("listIds", listIds);
  }, [listIds]);

  useEffect(() => {
    setItem("listObjects", listObjects);
  }, [listObjects]);

  useEffect(() => {
    setItem("nextId", nextId);
  }, [nextId]);

  const makeNewList = () => {
    setListObjects((prev) => [...prev, { id: nextId, name: `List ${nextId}` }]);
    setToggleList(nextId);
    setNextId(nextId + 1);
  };

  const switchList = (id) => {
    // setToggleList to input
    setToggleList(id);
  };

  const renameList = (id, value) => {
    setListObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, name: value } : obj))
    );
  };

  return (
    <>
      <div className="list-nav-bar">
        {listObjects.map(
          ({ id, name }) =>
            id === toggleList && (
              <ToDoList
                key={id}
                listId={id}
                nameOfList={name}
                onRename={renameList}
              />
            )
        )}
      </div>
      <div>
        <button onClick={() => makeNewList()}>Create New List</button>
      </div>
      <div>
        {listObjects.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => switchList(id)}
            style={{ fontWeight: toggleList === id ? "bold" : "normal" }}
          >
            <h4>{name}&nbsp;</h4>
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
