// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { getUserFromToken } from '../utils/jwtUtils';
// import { useNavigate } from 'react-router-dom';

// export default function Groups() {
//   const user = getUserFromToken();
//   const [groups, setGroups] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user?.id) return;
//     fetchUserGroups();
//   }, [user?.id]);

//   const fetchUserGroups = async () => {
//     try {
//       const res = await api.get(`/group/users/${user.id}`);
//       setGroups(res.data || []);
//     } catch (err) {
//       console.error('Failed to fetch groups:', err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
//       <ul className="space-y-2">
//         {groups.map(group => (
//           <li key={group.groupid} className="flex justify-between items-center border p-2 rounded">
//             <span>{group.groupname}</span>
//             <button
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//               onClick={() => navigate(`/group/${group.groupid}`)}
//             >
//               View
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// src/pages/Groups.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { getUserFromToken } from '../utils/jwtUtils';
import { useNavigate } from 'react-router-dom';

export default function Groups() {
  const user = getUserFromToken();
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    fetchUserGroups();
  }, [user?.id]);

  const fetchUserGroups = async () => {
    try {
      const res = await api.get(`/group/users/${user.id}`);
      setGroups(res.data || []);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Groups</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate('/create-group')}
        >
          Create Group
        </button>
      </div>

      <ul className="space-y-2">
        {groups.map(group => (
          <li key={group.groupid} className="flex justify-between items-center border p-2 rounded">
            <span>{group.groupname}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => navigate(`/group/${group.groupid}`)}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
