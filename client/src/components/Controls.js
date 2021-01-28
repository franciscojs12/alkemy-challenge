const Controls = ({ toggleNewOperationForm }) => {
  return (
    <section className="controls">
      <div className="container">
        <button
          className="btn"
          id="btn-new-operation"
          onClick={toggleNewOperationForm}
        >
          Registrar operación
        </button>
        <button className="btn" id="btn-income">
          Ver ingresos
        </button>
        <button className="btn" id="btn-expense">
          Ver egresos
        </button>
      </div>
    </section>
  );
};

export default Controls;
