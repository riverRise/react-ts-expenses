import { useEffect, useState } from 'react';

const tableHeadingRow = ['Date', 'Merchant', 'Amount', 'Category', 'Description', 'Status'];

const ExpansesTable = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
        headers: {
          "Content-Type": "application/json",
          Username: "rebecca.pavcic"
        }
      })

      const data = await response.json();

      if (data) {
        setExpensesData(data);
        setLoading(false);
      }
   
    } catch (e) {
      setError(true);
    }
  }

  const handleDate = (date: string) => {
    const newDate = new Date(date)
    const prettyDate = new Intl.DateTimeFormat('en-GB', {
      month: 'short',
      day: 'numeric'
    }).format(newDate);
    return prettyDate;
  }

  useEffect(() => {
    fetchData();
  }, []);


  let content;
  if (loading) {
    content = <div>Loading ...</div>
  } else if (error) {
    content = <div>Sorry, something went wrong. Please try again.</div>
  } else {
    content = (
      <>
        {expensesData.length !== 0 ? 
          expensesData.map(({amount, category, date, description, id, merchant, status}) => (
            <tr key={id} className='table-contents'>
              <th>{handleDate(date)}</th>
              <th>{merchant}</th>
              <th>{amount}</th>
              <th>{category}</th>
              <th>{description}</th>
              <th>{status}</th>
            </tr>
          )) 
          : <tr><th>No data available</th></tr>}
      </>

    )
  }

    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              {tableHeadingRow.map((item, index) => (
                <th key={index} className='table-headings'>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
              {content}
          </tbody>
        </table>
      </div>
    )
};

export default ExpansesTable;