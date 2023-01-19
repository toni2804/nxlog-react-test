import './App.css';
import PasswordGenerator from './components/PasswordGenerator';
import Task from './components/Task';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NxLog React Senior Tasks</h1>
        <Task title='Task 2 - Password generator'>
          <PasswordGenerator />
        </Task>
      </header>
    </div>
  );
}

export default App;
