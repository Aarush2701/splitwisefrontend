// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { getUserFromToken } from '../../utils/jwtUtils';

// export default function BalanceTab({ groupid }) {
//   const [balances, setBalances] = useState([]);
//   const [groupUsers, setGroupUsers] = useState([]);
//   const [viewMode, setViewMode] = useState('all'); // 'all' or 'my'
//   const [myBalance, setMyBalance] = useState([]);
//   const navigate = useNavigate();

//   const currentUser = getUserFromToken();

//   // Fetch group members
//   useEffect(() => {
//     api.get(`/group/${groupid}`)
//       .then(res => {
//         setGroupUsers(res.data.members || []);
//       })
//       .catch(err => {
//         console.error('Failed to fetch group users:', err);
//       });
//   }, [groupid]);

//   // Fetch all balances
//   useEffect(() => {
//     api.get(`/group/${groupid}/balances`)
//       .then(res => {
//         setBalances(res.data || []);
//       })
//       .catch(err => {
//         console.error('Failed to fetch group balances:', err);
//       });
//   }, [groupid]);

//   // Fetch personal balance
//   const fetchMyBalance = () => {
//     api.get(`/group/${groupid}/balances/users/${currentUser.id}`)
//       .then(res => {
//         setMyBalance(res.data || []);
//         setViewMode('my');
//       })
//       .catch(err => {
//         console.error('Failed to fetch personal balance:', err);
//       });
//   };

//   const handleSettleClick = (bal) => {
//     const match = bal.match(/^(.+?) owes (.+?) ₹([\d.]+)$/);
//     if (!match) return;

//     const paidbyUser = groupUsers.find(user => user.username === match[1].trim());
//     const paidtoUser = groupUsers.find(user => user.username === match[2].trim());

//     if (!paidbyUser || !paidtoUser) {
//       console.error('User not found:', match[1], match[2]);
//       return;
//     }

//     navigate('/settle', {
//       state: {
//         groupid,
//         paidby: paidbyUser,
//         paidto: paidtoUser,
//       },
//     });
//   };

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h3 className="text-xl font-semibold">
//           {viewMode === 'all' ? 'All Group Balances' : 'Your Balances'}
//         </h3>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={() => {
//             if (viewMode === 'all') {
//               fetchMyBalance();
//             } else {
//               setViewMode('all');
//             }
//           }}
//         >
//           {viewMode === 'all' ? 'My Balance' : 'Show All'}
//         </button>
//       </div>

//       {viewMode === 'all' ? (
//         balances.length === 0 ? (
//           <p>No balances found for this group.</p>
//         ) : (
//           <ul className="space-y-2">
//             {balances.map((bal, idx) => (
//               <li
//                 key={idx}
//                 className="border p-3 rounded flex justify-between items-center"
//               >
//                 <span>{bal}</span>
//                 <button
//                   className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                   onClick={() => handleSettleClick(bal)}
//                 >
//                   Settle
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )
//       ) : (
//         myBalance.length === 0 ? (
//           <p>You have no balances in this group.</p>
//         ) : (
//           <ul className="space-y-2">
//             {myBalance.map((bal, idx) => (
//               <li
//                 key={idx}
//                 className="border p-3 rounded flex justify-between items-center bg-yellow-100"
//               >
//                 <span>{bal}</span>
//                 <button
//                   className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                   onClick={() => handleSettleClick(bal)}
//                 >
//                   Settle
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../utils/jwtUtils';

export default function BalanceTab({ groupid }) {
  const [balances, setBalances] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'my'
  const [myBalance, setMyBalance] = useState([]);
  const navigate = useNavigate();

  const currentUser = getUserFromToken();

  // Fetch group members
  useEffect(() => {
    api.get(`/group/${groupid}`)
      .then(res => {
        setGroupUsers(res.data.members || []);
      })
      .catch(err => {
        console.error('Failed to fetch group users:', err);
      });
  }, [groupid]);

  // Fetch all balances
  useEffect(() => {
    api.get(`/group/${groupid}/balances`)
      .then(res => {
        setBalances(res.data || []);
      })
      .catch(err => {
        console.error('Failed to fetch group balances:', err);
      });
  }, [groupid]);

  // Fetch personal balance
  const fetchMyBalance = () => {
    api.get(`/group/${groupid}/balances/users/${currentUser.id}`)
      .then(res => {
        setMyBalance(res.data || []);
        setViewMode('my');
      })
      .catch(err => {
        console.error('Failed to fetch personal balance:', err);
      });
  };

  const handleSettleClick = (bal) => {
    const match = bal.match(/^(.+?) owes (.+?) ₹([\d.]+)$/);
    if (!match) return;

    const paidbyUser = groupUsers.find(user => user.username === match[1].trim());
    const paidtoUser = groupUsers.find(user => user.username === match[2].trim());

    if (!paidbyUser || !paidtoUser) {
      console.error('User not found:', match[1], match[2]);
      return;
    }

    navigate('/settle', {
      state: {
        groupid,
        paidby: paidbyUser,
        paidto: paidtoUser,
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {viewMode === 'all' ? 'All Group Balances' : 'Your Balances'}
        </h3>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            if (viewMode === 'all') {
              fetchMyBalance();
            } else {
              setViewMode('all');
            }
          }}
        >
          {viewMode === 'all' ? 'My Balance' : 'Show All'}
        </button>
      </div>

      {viewMode === 'all' ? (
        balances.length === 0 ? (
          <p>No balances found for this group.</p>
        ) : (
          <ul className="space-y-2">
  {balances.map((bal, idx) => {
    const match = bal.match(/^(.+?) owes (.+?) ₹([\d.]+)$/);
    if (!match) return null;

    const [_, paidByName, paidToName] = match;

    // Get userIds by matching groupUsers
    const paidByUser = groupUsers.find(user => user.username === paidByName.trim());
    const paidToUser = groupUsers.find(user => user.username === paidToName.trim());

    // Skip rendering if users not found
    if (!paidByUser || !paidToUser) return null;

    const isUserInvolved =
      currentUser.id === paidByUser.userId || currentUser.id === paidToUser.userId;

    return (
      <li
        key={idx}
        className="border p-3 rounded flex justify-between items-center"
      >
        <span>{bal}</span>
        <button
          disabled={!isUserInvolved}
          className={`ml-4 px-3 py-1 rounded ${
            isUserInvolved
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          onClick={() => isUserInvolved && handleSettleClick(bal)}
        >
          Settle
        </button>
      </li>
    );
  })}
</ul>


        )
      ) : (
        myBalance.length === 0 ? (
          <p>You have no balances in this group.</p>
        ) : (
          <ul className="space-y-2">
            {myBalance.map((bal, idx) => (
              <li
                key={idx}
                className="border p-3 rounded flex justify-between items-center bg-yellow-100"
              >
                <span>{bal}</span>
                <button
                  className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleSettleClick(bal)}
                >
                  Settle
                </button>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
