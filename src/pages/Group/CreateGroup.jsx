
import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';


export default function CreateGroup({ onGroupCreated }) {
  const [groupname, setGroupName] = useState('');
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    try {
      const emailList = emails.split(',').map(email => email.trim());

      // Call API to get userIds from emails
      const resolveRes = await api.post('/users/resolve-ids', {
        emails: emailList
      });

      const userIds = resolveRes.data.userIds;

      // Call API to create group
      await api.post('/group', {
        groupname,
        userIds
      });

      alert('Group created successfully!');
      setGroupName('');
      setEmails('');
      if (onGroupCreated) onGroupCreated(); // optional callback
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Group creation error:', err);
    }
  };

  return (
    <div className="p-4 border rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Create Group</h2>

      <input
        type="text"
        placeholder="Group Name"
        value={groupname}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <textarea
        placeholder="Enter user emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        rows={3}
      />

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <div className="flex space-x-4 mb-6">
      <button
        onClick={handleCreateGroup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Group
      </button>
      <button onClick={() => navigate(-1)} className="bg-orange-500 text-white px-4 py-2 rounded ">
          Back
        </button></div>
    </div>
  );
}
