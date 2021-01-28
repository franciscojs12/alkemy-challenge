import { useState } from 'react';

const NewOperationForm = ({ onAdd, toggleNewOperationForm }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0');
  const [operationType, setOperationType] = useState('expense');
  const [date, setDate] = useState('2021-01-28');

  const onSubmit = (event) => {
    event.preventDefault();

    if (amount <= 0) {
      alert('Por favor ingrese un monto válido.');
      return;
    }

    onAdd({ description, amount, operationType, date });

    setDescription('');
    setAmount('');
    toggleNewOperationForm();
  };

  return (
    <div className="overlay">
      <div className="form glass center">
        <h3 className="form__title container">Registrar nueva operación:</h3>
        <form className="container" onSubmit={onSubmit}>
          <div className="form__item">
            <label for="amount-input">Monto:</label>
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
            <label for="type-input">Tipo de operación:</label>
            <select
              id="type-input"
              name="type-input"
              value={operationType}
              onChange={(event) => setOperationType(event.target.value)}
            >
              <option value="expense">Egreso</option>
              <option value="income">Ingreso</option>
            </select>
          </div>
          <div className="form__item">
            <label for="desc-input">Concepto:</label>
            <input
              type="text"
              id="desc-input"
              name="desc-input"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="form__item">
            <label for="date-input">Fecha:</label>
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
            <button onClick={toggleNewOperationForm}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOperationForm;
