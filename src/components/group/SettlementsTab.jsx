// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';

// export default function SettlementTab({ groupid }) {
//   const [settlements, setSettlements] = useState([]);

//   useEffect(() => {
//     api.get(`/group/${groupid}/settlements`)
//       .then(res => setSettlements(res.data || []))
//       .catch(err => console.error('Error fetching settlements:', err));
//   }, [groupid]);

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch (e) {
//       return '';
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4">Settlement History</h3>
//       {settlements.length === 0 ? (
//         <p>No settlements found in this group.</p>
//       ) : (
//         <ul className="space-y-2">
//           {settlements.map((settle, index) => (
//             <li
//               key={index}
//               className="border p-3 rounded flex justify-between items-center"
//             >
//               <span>
//                 <strong>{settle.paidby?.username || `User#${settle.paidby?.userid}`}</strong> paid{' '}
//                 <strong>₹{settle.amount.toLocaleString()}</strong> to{' '}
//                 <strong>{settle.paidto?.username || `User#${settle.paidto?.userid}`}</strong>
//               </span>
//               <span className="text-sm text-gray-500">
//                 {formatDate(settle.date)}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { getUserFromToken } from '../../utils/jwtUtils';

export default function SettlementTab({ groupid }) {
  const [settlements, setSettlements] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const user = getUserFromToken();

  useEffect(() => {
    if (!user?.id) return;

    let endpoint = `/group/${groupid}/settlements`;

    if (activeTab === 'PAID_BY_ME') {
      endpoint = `/group/${groupid}/settlements/paidby/${user.id}`;
    } else if (activeTab === 'PAID_TO_ME') {
      endpoint = `/group/${groupid}/settlements/paidto/${user.id}`;
    }

    api.get(endpoint)
      .then(res => setSettlements(res.data || []))
      .catch(err => console.error('Error fetching settlements:', err));
  }, [groupid, activeTab, user?.id]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return '';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Settlement History</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded ${activeTab === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('ALL')}
        >
          All Settlements
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'PAID_BY_ME' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('PAID_BY_ME')}
        >
          Paid by Me
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'PAID_TO_ME' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('PAID_TO_ME')}
        >
          Paid to Me
        </button>
      </div>

      {settlements.length === 0 ? (
        <p>No settlements found for this view.</p>
      ) : (
        <ul className="space-y-2">
          {settlements.map((settle, index) => (
            <li
              key={index}
              className="border p-3 rounded flex justify-between items-center"
            >
              <span>
                <strong>{settle.paidby?.username || `User#${settle.paidby?.userid}`}</strong> paid{' '}
                <strong>₹{settle.amount.toLocaleString()}</strong> to{' '}
                <strong>{settle.paidto?.username || `User#${settle.paidto?.userid}`}</strong>
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(settle.date)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
