function ListNavBar() {
  const createHandler = () => {};
  // This component lets the user navigate between different lists and create new ones
  return (
    <div>
      <button className="create-list" onClick={createHandler}>
        ➕
      </button>
    </div>
  );
}

export default ListNavBar;
