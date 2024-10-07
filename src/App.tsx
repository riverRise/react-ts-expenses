import ExpansesTable from "./components/ExpensesTable";

function App() {
  return (
    <div className='main-app'>
      <h1 className='u-h1'>Expenses</h1>
      <div className='divider' role='presentation'/>
      <ExpansesTable />
    </div>
  );
}

export default App;
