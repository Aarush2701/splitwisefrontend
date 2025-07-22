// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';
// import { useNavigate, useParams } from 'react-router-dom';

// export default function ExpensesTab({ groupid }) {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//     // const { groupid } = useParams();


//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const res = await api.get(`/group/${groupid}/expenses`);
//         setExpenses(res.data || []);
//       } catch (err) {
//         console.error('Error fetching expenses:', err);
//         setError('Failed to load expenses.');
//       }
//     };

//     fetchExpenses();
//   }, [groupid]);

//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold mb-2">Group Expenses</h3>
//       <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate(`/group/${groupid}/add-expense`)}>
//         Add Expense
//         </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {expenses.length === 0 ? (
//         <p>No expenses found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {expenses.map((expense) => (
//             <li
//               key={expense.expenseid}
//               className="border p-3 rounded bg-gray-50 shadow-sm"
//             >
//               <p className="font-medium">{expense.description}</p>
//               <p>
//                 ₹{expense.amount} paid by{' '}
//                 <strong>{expense.userid.username}</strong>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../utils/jwtUtils'; // Make sure this utility extracts userId

export default function ExpensesTab({ groupid }) {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [showingMyExpenses, setShowingMyExpenses] = useState(false);
  const navigate = useNavigate();

  const currentUser = getUserFromToken(); // assuming it returns object with userId, username, etc.

  useEffect(() => {
    fetchAllExpenses();
  }, [groupid]);

  const fetchAllExpenses = async () => {
    setError(null);
    setShowingMyExpenses(false);
    try {
      const res = await api.get(`/group/${groupid}/expenses`);
      setExpenses(res.data || []);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses.');
    }
  };

  const fetchMyExpenses = async () => {
    setError(null);
    setShowingMyExpenses(true);
    try {
      const res = await api.get(`/group/${groupid}/expenses/users/${currentUser.id}`);
      setExpenses(res.data || []);
    } catch (err) {
      console.error('Error fetching my expenses:', err);
      setError('Failed to load your expenses.');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">
        {showingMyExpenses ? 'My Expenses' : 'Group Expenses'}
      </h3>

      <div className="space-x-2 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/group/${groupid}/add-expense`)}
        >
          Add Expense
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchMyExpenses}
        >
          My Expenses
        </button>

        {showingMyExpenses && (
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={fetchAllExpenses}
          >
            Show All Expenses
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense.expenseid}
              className="border p-3 rounded bg-gray-50 shadow-sm"
            >
              <p className="font-medium">{expense.description}</p>
              <p>
                ₹{expense.amount} paid by{' '}
                <strong>{expense.userid.username}</strong>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
