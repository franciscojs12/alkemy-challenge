import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import List from './components/List';
import Controls from './components/Controls';
import Footer from './components/Footer';
import NewOperationForm from './components/NewOperationForm';

const App = () => {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const getOperations = async () => {
      const operationsFromServer = await fetchOperations();
      setOperations(operationsFromServer.reverse());
    };

    getOperations();
  }, []);

  // Fetch operations from server
  const fetchOperations = async () => {
    const res = await fetch('http://localhost:4000/operations');
    const data = await res.json();
    return data;
  };

  // Show or hide new operation form
  const [showNewOperationForm, setShowNewOperationForm] = useState(false);

  // Add new operation
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

  // Delete operation by id
  const deleteOperation = async (id) => {
    await fetch(`http://localhost:4000/operations/${id}`, {
      method: 'DELETE',
    });

    setOperations(operations.filter((operation) => operation.id !== id));
  };

  // Edit operation by id
  const editOperation = async (id, operation) => {
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
          onAdd={addOperation}
          toggleNewOperationForm={() => setShowNewOperationForm(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
