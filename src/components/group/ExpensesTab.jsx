// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { getUserFromToken } from '../../utils/jwtUtils'; // Make sure this utility extracts userId

// export default function ExpensesTab({ groupid }) {
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   const [showingMyExpenses, setShowingMyExpenses] = useState(false);
//   const navigate = useNavigate();

//   const currentUser = getUserFromToken(); // assuming it returns object with userId, username, etc.

//   useEffect(() => {
//     fetchAllExpenses();
//   }, [groupid]);

//   const fetchAllExpenses = async () => {
//     setError(null);
//     setShowingMyExpenses(false);
//     try {
//       const res = await api.get(`/group/${groupid}/expenses`);
//       setExpenses(res.data || []);
//     } catch (err) {
//       console.error('Error fetching expenses:', err);
//       setError('Failed to load expenses.');
//     }
//   };

//   const fetchMyExpenses = async () => {
//     setError(null);
//     setShowingMyExpenses(true);
//     try {
//       const res = await api.get(`/group/${groupid}/expenses/users/${currentUser.id}`);
//       setExpenses(res.data || []);
//     } catch (err) {
//       console.error('Error fetching my expenses:', err);
//       setError('Failed to load your expenses.');
//     }
//   };

//   const handleDelete = async (expenseid) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
//   if (!confirmDelete) return;

//   try {
//     await api.delete(`/group/${groupid}/expenses/${expenseid}`);
//     alert("Expense deleted successfully");
//     fetchAllExpenses(); // refresh after deletion
//   } catch (error) {
//     console.error("Delete failed:", error);
//     alert("Failed to delete expense");
//   }
// };


//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold mb-2">
//         {showingMyExpenses ? 'My Expenses' : 'Group Expenses'}
//       </h3>

//       <div className="space-x-2 mb-4">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => navigate(`/group/${groupid}/add-expense`)}
//         >
//           Add Expense
//         </button>

//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={fetchMyExpenses}
//         >
//           My Expenses
//         </button>

//         {showingMyExpenses && (
//           <button
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//             onClick={fetchAllExpenses}
//           >
//             Show All Expenses
//           </button>
//         )}
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {expenses.length === 0 ? (
//         <p>No expenses found.</p>
//       ) : (
//         <ul className="space-y-2">
//   {expenses.map((expense) => (
//     <li
//       key={expense.expenseid}
//       className="border p-3 rounded bg-gray-50 shadow-sm"
//     >
//       <p className="font-medium">{expense.description}</p>
//       <p>
//         ₹{expense.amount} paid by{' '}
//         <strong>{expense.userid.username}</strong>
//       </p>

//       <div className="mt-2 flex gap-3">
//         <button
//           onClick={() =>
//             navigate(`/group/${groupid}/expenses/${expense.expenseid}/edit`)
//           }
//           className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//         >
//           Edit
//         </button>

//         <button
//           onClick={() => handleDelete(expense.expenseid)}
//           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//         >
//           Delete
//         </button>
//       </div>
//     </li>
//   ))}
// </ul>

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
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
const [splits, setSplits] = useState([]);
const [loadingSplits, setLoadingSplits] = useState(false);



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

  const handleViewSplits = async (expenseid) => {
  if (selectedExpenseId === expenseid) {
    // Collapse if same expense is clicked again
    setSelectedExpenseId(null);
    setSplits([]);
    return;
  }

  try {
    setSelectedExpenseId(expenseid);
    setLoadingSplits(true);
    const res = await api.get(`/group/${groupid}/expenses/${expenseid}/splits`);
    setSplits(res.data || []);
  } catch (err) {
    console.error('Error fetching splits:', err);
    setSplits([]);
  } finally {
    setLoadingSplits(false);
  }
};


  const handleDelete = async (expenseid) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/group/${groupid}/expenses/${expenseid}`);
    alert("Expense deleted successfully");
    fetchAllExpenses(); // refresh after deletion
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete expense");
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

            <div className="mt-2 flex gap-3">
              <button
                onClick={() =>
                  navigate(`/group/${groupid}/expenses/${expense.expenseid}/edit`)
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(expense.expenseid)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>

              <button
                onClick={() => handleViewSplits(expense.expenseid)}
                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
              >
                View
              </button>
            </div>

            {selectedExpenseId === expense.expenseid && (
              <div className="mt-2 bg-gray-100 p-2 rounded">
                {loadingSplits ? (
                  <p>Loading splits...</p>
                ) : splits.length === 0 ? (
                  <p>No participant data found.</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {splits.map((s, index) => (
                      <li key={index}>
                        {s.username}: ₹{s.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}
