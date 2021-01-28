const Item = ({ operation, onDelete, onEdit }) => {
  return (
    <li className="operations-item container">
      <div className="operations-item__operation-type">
        {operation.operationType === 'income' ? 'Ingreso' : 'Egreso'}
      </div>
      <h2 className="operations-item__amount">
        <span className="operations-item__symbol">
          {operation.operationType === 'income' ? '+' : '-'}
        </span>
        <span className="operations-item__number">{operation.amount}</span>
      </h2>
      <div className="operations-item__description">
        {operation.description}
      </div>
      <div className="operations-item__date">{operation.date}</div>
      <div
        className="operations-item__edit icon"
        onClick={() => onEdit(operation.id)}
      >
        <img src="./icons/Icon awesome-edit.svg" alt="Editar" />
      </div>
      <div
        className="operations-item__delete icon"
        onClick={() => onDelete(operation.id)}
      >
        <img src="./icons/Icon awesome-trash.svg" alt="Eliminar" />
      </div>
    </li>
  );
};

export default Item;
