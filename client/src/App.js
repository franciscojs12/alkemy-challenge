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

  const [seeMore, setSeeMore] = useState(false);

  const newOperationsFirst = (_operations) => {
    return _operations.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  };

  const filteredOperations =
    selectedOperationType === 'all'
      ? operations
      : operations.filter(
          ({ operationType }) => operationType === selectedOperationType
        );

  const displayedOperations = !seeMore
    ? filteredOperations.slice(0, 10)
    : filteredOperations;

  const totalBalance = operations.reduce((acc, { amount, operationType }) => {
    if (operationType === 'income') {
      return acc + Number(amount);
    } else {
      return acc - Number(amount);
    }
  }, 0);

  // GET operations from DB
  const getOperations = async () => {
    const res = await fetch('http://localhost:4000/operations');
    const data = await res.json();
    return data;
  };

  // POST new operation to DB
  const addOperation = async (_operation) => {
    const res = await fetch('http://localhost:4000/operations', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(_operation),
    });

    const data = await res.json();
    // newOperationsFirst(setOperations([data, ...operations]));
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
    setOperations((prev) =>
      prev.map((_operation) => {
        if (operation.id === _operation.id) {
          return operation;
        }
        return _operation;
      })
    );
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

  // Load all operations on mount
  useEffect(() => {
    getOperations().then((loadedOperations) => {
      setOperations(newOperationsFirst(loadedOperations));
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Main balance={totalBalance} />
      <List
        operations={displayedOperations}
        onDelete={deleteOperation}
        onSelectEdit={selectEditOperation}
        toggleEditOperationForm={() => setIsEditOperationFormEnabled(true)}
        seeMore={() => setSeeMore(!seeMore)}
        seeMoreState={seeMore}
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
