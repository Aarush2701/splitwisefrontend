import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { getUserFromToken } from '../utils/jwtUtils';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ groupname: '', userIds: '' });
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const user = getUserFromToken(localStorage.getItem('token'));
    if (user?.id) {
      setUserId(user.id);
      fetchGroups(user.id);
    }
  }, []);

  const fetchGroups = async (id) => {
    try {
      const res = await api.get(`/group/users/${id}`);
      setGroups(res.data);
    } catch (err) {
      console.error('Failed to load groups:', err);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const userIdsArray = form.userIds
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));

    try {
      await api.post('/group', {
        groupname: form.groupname,
        userIds: [userId, ...userIdsArray],
      });
      alert('Group created successfully!');
      setForm({ groupname: '', userIds: '' });
      setShowForm(false);
      fetchGroups(userId);
    } catch (err) {
      console.error('Error creating group:', err);
      alert('Failed to create group.');
    }
  };

  const showGroupDetails = async (groupId) => {
    try {
      const res = await api.get(`/group/${groupId}`);
      setSelectedGroup(res.data);
      console.log('Selected Group:', res.data);
    } catch (err) {
      console.error('Failed to fetch group details:', err);
      alert('Failed to load group details.');
    }
  };
  
  const removeUserFromGroup = async (userIdToRemove) => {
  if (!selectedGroup?.groupId) return;

  const confirmRemove = window.confirm("Are you sure you want to remove this user from the group?");
  if (!confirmRemove) return;

  try {
    await api.delete(`/group/${selectedGroup.groupId}/users/${userIdToRemove}`);
    alert("User removed successfully!");

    // Refresh group details
    const res = await api.get(`/group/${selectedGroup.groupId}`);
    setSelectedGroup(res.data);
  } catch (err) {
    console.error("Failed to remove user:", err);
    if (
      err.response &&
      err.response.data &&
      typeof err.response.data === 'string' &&
      err.response.data.toLowerCase().includes("unsettled")
    ) {
      alert("Cannot remove user: They have unsettled balances in the group.");
    } else {
      alert("Failed to remove user from the group.");
    }
  }
};

  return (
  <div className="p-4">
    {!selectedGroup ? (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Groups</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {showForm ? 'Cancel' : 'Create Group'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateGroup} className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Group Name"
              value={form.groupname}
              onChange={(e) => setForm({ ...form, groupname: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="User IDs (comma separated)"
              value={form.userIds}
              onChange={(e) => setForm({ ...form, userIds: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </form>
        )}

        <ul className="space-y-3">
          {groups.length > 0 ? (
            groups.map(group => (
              <li
                key={group.groupid}
                className="flex justify-between items-center border p-3 rounded shadow"
              >
                <span className="font-medium">{group.groupname}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => showGroupDetails(group.groupid)}
                >
                  Details
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No groups found.</p>
          )}
        </ul>
      </>
    ) : (
      <div className="p-4 border rounded bg-gray-100 shadow mt-4">
        <h3 className="text-lg font-semibold mb-2">Group Details</h3>
        <p><strong>ID:</strong> {selectedGroup.groupId}</p>
        <p><strong>Name:</strong> {selectedGroup.groupname}</p>
        <p><strong>Members:</strong></p>
        <ul className="list-disc list-inside mb-3">
        {selectedGroup.members?.map(member => (
    <li key={member.userId} className="flex justify-between items-center">
      <span>{member.username} (ID: {member.userId})</span>
      <button
        className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
        onClick={() => removeUserFromGroup(member.userId)}
      >
        Remove
      </button>
    </li>
  ))}
</ul>


        <button
          onClick={() => setSelectedGroup(null)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Back to Group List
        </button>
      </div>
    )}
  </div>
);
}