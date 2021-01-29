import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import List from './components/List';
import Footer from './components/Footer';
import NewOperationForm from './components/NewOperationForm';
import EditOperationForm from './components/EditOperationForm';

const App = () => {
  const [operations, setOperations] = useState([]);
  const [selectedOperationType, setSelectedOperationType] = useState('all'); // income/expense/all
  const [selectedEditOperation, setSelectedEditOperation] = useState([]);

  // Toggle forms
  const [isNewOperationFormEnabled, setIsNewOperationFormEnabled] = useState(
    false
  );
  const [isEditOperationFormEnabled, setIsEditOperationFormEnabled] = useState(
    false
  );

  const filteredOperations =
    selectedOperationType === 'all'
      ? operations
      : operations.filter(
          ({ operationType }) => operationType === selectedOperationType
        );

  useEffect(() => {
    const getOperations = async () => {
      const operationsFromServer = await fetchOperations();
      setOperations(operationsFromServer.reverse());
    };
    console.log('useEffect triggered');
    getOperations();
  }, []);

  // GET operations from DB
  const fetchOperations = async () => {
    const res = await fetch('http://localhost:4000/operations');
    const data = await res.json();
    return data;
  };

  // POST new operation to DB
  const addOperation = async (operation) => {
    const res = await fetch('http://localhost:4000/operations', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(operation),
    });

    const data = await res.json();
    setOperations([data, ...operations]);
  };

  // DELETE operation by id
  const deleteOperation = async (id) => {
    await fetch(`http://localhost:4000/operations/${id}`, {
      method: 'DELETE',
    });
    setOperations(operations.filter((operation) => operation.id !== id));
  };

  // Select edit operation by id
  const selectEditOperation = (id) => {
    const operationsArray = operations;
    const selectedOperation = operationsArray.filter(
      (operation) => operation.id === id
    )[0];
    setSelectedEditOperation(selectedOperation);
  };
  // Edit operation by id
  const editOperation = async (operation) => {
    const res = await fetch(
      `http://localhost:4000/operations/${operation.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(operation),
      }
    );
    const data = await res.json();
    return data;
  };

  return (
    <div className="App">
      <Header />
      <Main balance={10} />
      <List
        operations={operations}
        onDelete={deleteOperation}
        onSelectEdit={selectEditOperation}
        toggleEditOperationForm={() => setIsEditOperationFormEnabled(true)}
      />

      <section className="controls">
        <div className="container">
          <button
            className="btn"
            id="btn-expense"
            onClick={() => setSelectedOperationType('all')}
          >
            Ver todo
          </button>
          <button
            className="btn"
            id="btn-income"
            onClick={() => setSelectedOperationType('income')}
          >
            Ver ingresos
          </button>
          <button
            className="btn"
            id="btn-expense"
            onClick={() => setSelectedOperationType('expense')}
          >
            Ver egresos
          </button>
          <button
            className="btn"
            id="btn-new-operation"
            onClick={() =>
              setIsNewOperationFormEnabled(!isNewOperationFormEnabled)
            }
          >
            Registrar operación
          </button>
        </div>
      </section>

      {isNewOperationFormEnabled && (
        <NewOperationForm
          onAccept={addOperation}
          toggleNewOperationForm={() => setIsNewOperationFormEnabled(false)}
        />
      )}
      {isEditOperationFormEnabled && (
        <EditOperationForm
          operation={selectedEditOperation}
          onAccept={editOperation}
          toggleEditOperationForm={() => setIsEditOperationFormEnabled(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
