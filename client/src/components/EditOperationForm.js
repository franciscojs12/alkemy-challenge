import { useState } from 'react';

const EditOperationForm = ({
  operation,
  onAccept,
  toggleEditOperationForm,
}) => {
  const id = operation.id;
  const [description, setDescription] = useState(operation.description);
  const [amount, setAmount] = useState(operation.amount);
  const [date, setDate] = useState(operation.date);

  const onSubmit = (event) => {
    event.preventDefault();

    if (amount <= 0) {
      alert('Por favor ingrese un monto válido.');
      return;
    }

    onAccept({ id, description, amount, date });

    toggleEditOperationForm();
  };

  return (
    <div className="overlay">
      <div className="form glass center">
        <h3 className="form__title container">Editar operación:</h3>
        <form className="container" onSubmit={onSubmit}>
          <div className="form__item">
            <label htmlFor="amount-input">Monto:</label>
            <input
              type="number"
              step="0.01"
              id="amount-input"
              name="amount-input"
              min="0"
              max="999999"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="desc-input">Concepto:</label>
            <input
              type="text"
              id="desc-input"
              name="desc-input"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="date-input">Fecha:</label>
            <input
              type="date"
              id="date-input"
              name="date-input"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="form__buttons">
            <input type="submit" value="Aceptar" className="btn" />
            <button onClick={toggleEditOperationForm}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOperationForm;
