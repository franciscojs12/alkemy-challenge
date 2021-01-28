const EditOperation = () => {
  return (
    <div className="overlay">
      <div className="form glass center">
        <h3 className="form__title container">Registrar nueva operación:</h3>
        <form action="" className="container">
          <div className="form__item">
            <label for="amount-input">Monto:</label>
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
            <label for="desc-input">Concepto:</label>
            <input type="text" id="desc-input" name="desc-input" value="" />
          </div>
          <div className="form__item">
            <label for="date-input">Fecha:</label>
            <input type="date" id="date-input" name="date-input" />
          </div>
          <div className="form__buttons">
            <input type="submit" value="Aceptar" className="btn" />
            <button>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOperation;
