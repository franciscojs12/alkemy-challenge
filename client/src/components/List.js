import Item from './Item';

const List = ({
  operations,
  onDelete,
  onSelectEdit,
  toggleEditOperationForm,
  seeMore,
  seeMoreState,
}) => {
  return (
    <section className="c-list">
      <div className="glass center">
        <h3 className="c-list__title container">Últimas Operaciones:</h3>

        <ul className="operations-list">
          {operations.map((operation) => (
            <Item
              key={operation.id}
              operation={operation}
              onDelete={onDelete}
              onSelectEdit={onSelectEdit}
              toggleEditOperationForm={toggleEditOperationForm}
            />
          ))}
        </ul>

        <footer className="c-list__footer container">
          <div
            className={`c-list__load-more icon ${seeMoreRotation(
              seeMoreState
            )}`}
            onClick={() => {
              seeMore();
            }}
          >
            <img src="./icons/Icon awesome-chevron-down.svg" alt="Ver más" />
          </div>
        </footer>
      </div>
    </section>
  );
};

const seeMoreRotation = (seeMoreState) => {
  if (seeMoreState) {
    return 'rotated';
  }
};

export default List;
