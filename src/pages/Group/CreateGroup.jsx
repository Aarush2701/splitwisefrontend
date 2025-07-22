import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateGroup() {
  const [form, setForm] = useState({
    groupname: '',
    userIds: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        groupname: form.groupname,
        userIds: form.userIds.split(',').map(id => parseInt(id.trim())),
      };

      await api.post('/group', payload);
      alert('Group created successfully!');
      navigate('/dashboard'); // redirect back to groups page
    } catch (err) {
      console.error('Failed to create group:', err);
      alert('Group creation failed!');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Group Name</label>
          <input
            type="text"
            value={form.groupname}
            onChange={(e) => setForm({ ...form, groupname: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">User IDs (comma-separated)</label>
          <input
            type="text"
            value={form.userIds}
            onChange={(e) => setForm({ ...form, userIds: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}
