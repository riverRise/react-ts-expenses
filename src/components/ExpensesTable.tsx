import { useEffect, useState } from 'react';

const tableHeadingRow = ['Date', 'Merchant', 'Amount', 'Category', 'Description', 'Status'];

// Fix the Date rendering
// Adjust the styles (font weight, alignment);

const ExpansesTable = () => {
  const [expensesData, setExpensesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
        headers: {
          "Content-Type": "application/json",
          Username: "rebecca.pavcic"
        }
      })

      const data = await response.json();
      console.log({data});

      if (data && data.length) {
        setExpensesData(data);
      }

    } catch (e) {
      console.log(e);
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
              {expensesData.map(({amount, category, date, description, id, merchant, status}) => (
                <tr key={id} className='table-contents'>
                  <th>{handleDate(date)}</th>
                  <th>{merchant}</th>
                  <th>{amount}</th>
                  <th>{category}</th>
                  <th>{description}</th>
                  <th>{status}</th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
};

export default ExpansesTable;