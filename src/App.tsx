import styles from "src/App.module.scss";
import PasswordGenerator from "./PasswordGenerator";
import Task from "./components/Task";
import TransferList from "src/TransferList";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>NxLog React Senior Tasks</h1>
      </header>
      <div className={styles.layout}>
        <Task title="Task 1 - Transfer list">
          <TransferList />
        </Task>
        <Task title="Task 2 - Password generator">
          <PasswordGenerator />
        </Task>
      </div>
    </div>
  );
}

export default App;
