import { useState } from 'react';

const EditOperation = ({ onAccept, toggleEditOperationForm }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState('2021-01-28');

  const onSubmit = (event) => {
    event.preventDefault();

    if (amount <= 0) {
      alert('Por favor ingrese un monto válido.');
      return;
    }

    onAccept({ description, amount, date });

    setDescription('');
    setAmount('');
    toggleEditOperationForm();
  };

  return (
    <div className="overlay">
      <div className="form glass center">
        <h3 className="form__title container">Registrar nueva operación:</h3>
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
            />
          </div>
          <div className="form__item">
            <label htmlFor="desc-input">Concepto:</label>
            <input type="text" id="desc-input" name="desc-input" value="" />
          </div>
          <div className="form__item">
            <label htmlFor="date-input">Fecha:</label>
            <input type="date" id="date-input" name="date-input" />
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

export default EditOperation;
