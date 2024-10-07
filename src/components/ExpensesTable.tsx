import { useEffect, useState } from 'react';

const tableHeadingRow = ['Date', 'Merchant', 'Amount', 'Category', 'Description', 'Status']

const ExpansesTable = () => {
  const [expensesData, setExpensesData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
        headers: {
          "Content-Type": "application/json",
          Username: "rebecca.pavcic"
        }
      })

      const data = await response.json();

      setExpensesData(data);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

    return (
      <div>
        <table>
          <thead>
            <tr>
              {tableHeadingRow.map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
              {expensesData.map(({amount, category, date, description, id, merchant, status}) => (
                <tr key={id}>
                  <th>{date}</th>
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