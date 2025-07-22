// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';

// export default function GroupMembersTab({ groupid }) {
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     api.get(`/group/${groupid}`)
//       .then(res => setMembers(res.data.members || []))
//       .catch(err => console.error('Failed to load group members:', err));
//   }, [groupid]);

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-2">Group Members</h3>
//       {members.length === 0 ? (
//         <p>No members found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {members.map((member) => (
//             <li key={member.userId} className="border p-3 rounded">
//               {member.username} (ID: {member.userId})
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function GroupMembersTab({ groupid }) {
  const [members, setMembers] = useState([]);
  const [newUserId, setNewUserId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadMembers = () => {
    api.get(`/group/${groupid}`)
      .then(res => {
        setMembers(res.data.members || []);
        setError(null);
      })
      .catch(err => {
        setError('Failed to load group members');
        console.error(err);
      });
  };

  useEffect(() => {
    loadMembers();
  }, [groupid]);

  const handleAddMember = () => {
    if (!newUserId) return;

    api.put(`/group/${groupid}/users/${newUserId}`)
      .then(() => {
        setSuccess(`User ${newUserId} added to group`);
        setNewUserId('');
        setError(null);
        loadMembers();
      })
      .catch(err => {
        const message = err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data || 'Failed to add user';
        setError(message);
        setSuccess(null);
      });
  };

  const handleRemoveMember = (userId) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove user ${userId} from the group?`);
    if (!confirmDelete) return;

    api.delete(`/group/${groupid}/users/${userId}`)
      .then(() => {
        setSuccess(`User ${userId} removed from group`);
        setError(null);
        loadMembers();
      })
      .catch(err => {
        const message = err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data || 'Failed to remove user';
        setError(message);
        setSuccess(null);
      });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Group Members</h3>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="number"
          placeholder="Enter user ID"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleAddMember}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.userId} className="border p-3 rounded flex justify-between items-center">
              <span>{member.username} (ID: {member.userId})</span>
              <button
                onClick={() => handleRemoveMember(member.userId)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
