import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import List from './components/List';
import Controls from './components/Controls';
import Footer from './components/Footer';
import NewOperationForm from './components/NewOperationForm';
import EditOperationForm from './components/EditOperationForm';

const App = () => {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const getOperations = async () => {
      const operationsFromServer = await fetchOperations();
      setOperations(operationsFromServer.reverse());
    };

    getOperations();
  }, []);

  // GET operations from DB
  const fetchOperations = async () => {
    const res = await fetch('http://localhost:4000/operations');
    const data = await res.json();
    return data;
  };
  // GET single operation from DB
  const fetchOperation = async (id) => {
    const res = await fetch(`http://localhost:4000/operations/${id}`);
    const data = await res.json();
    return data;
  };

  // Toggle form for new operation
  const [showNewOperationForm, setShowNewOperationForm] = useState(false);
  // Toggle form for edit operation
  const [showEditOperationForm, setShowEditOperationForm] = useState(false);

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

  // Edit operation by id
  const editOperation = async (id) => {
    const operationToEdit = await fetchOperation(id);
    const editOperation = { ...operationToEdit };
    console.log('edit', id);
  };

  return (
    <div className="App">
      <Header />
      <Main />
      <List
        operations={operations}
        onDelete={deleteOperation}
        onEdit={editOperation}
      />
      <Controls
        toggleNewOperationForm={() =>
          setShowNewOperationForm(!showNewOperationForm)
        }
      />
      {showNewOperationForm && (
        <NewOperationForm
          onAccept={addOperation}
          toggleNewOperationForm={() => setShowNewOperationForm(false)}
        />
      )}
      {showEditOperationForm && (
        <EditOperationForm
          onAccept={editOperation}
          toggleEditOperationForm={() => setShowEditOperationForm(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
