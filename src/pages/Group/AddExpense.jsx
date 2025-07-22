// src/pages/Group/AddExpense.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { getUserFromToken } from '../../utils/jwtUtils';

export default function AddExpense() {
  const { groupid } = useParams();
   const groupId = groupid;
  console.log("groupid from URL:", groupid);
  const navigate = useNavigate();
  const user = getUserFromToken();

  const [form, setForm] = useState({
    amount: '',
    description: '',
    paidBy: user?.id,
    participants: [],
    splitType: 'EQUAL',
    values: []
  });

  const [users, setUsers] = useState([]);

useEffect(() => {
  api.get(`/group/${groupid}`)
    .then(res => {
      setUsers(res.data.members || []);
    })
    .catch(err => console.error("Failed to load group members:", err));
}, [groupid]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleParticipantToggle = (id) => {
  let updatedParticipants;

  if (form.participants.includes(id)) {
    updatedParticipants = form.participants.filter(p => p !== id);
  } else {
    updatedParticipants = [...form.participants, id];
  }

  // Update values array to match number of participants
  const updatedValues = updatedParticipants.map((_, i) => form.values[i] || '');

  setForm({
    ...form,
    participants: updatedParticipants,
    values: updatedValues
  });
};


  const handleValuesChange = (index, value) => {
    const updatedValues = [...form.values];
    updatedValues[index] = parseFloat(value);
    setForm({ ...form, values: updatedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/group/${groupid}/expenses`, form);
      alert("Expense added!");
      navigate(`/group/${groupid}`);
    } catch (err) {
  console.error("Failed to add expense:", err);

  const backendMessage = err.response?.data || "Failed to add expense";
  alert(backendMessage);
}
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2" required />
        <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" className="w-full border px-3 py-2" required />

        <select name="splitType" value={form.splitType} onChange={handleChange} className="w-full border px-3 py-2">
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENTAGE">Percentage</option>
        </select>

        <div>
          <label className="block font-semibold">Select Participants</label>
          {users.map(u => (
            <div key={u.userId}>
              <label>
                <input
                  type="checkbox"
                  checked={form.participants.includes(u.userId)}
                  onChange={() => handleParticipantToggle(u.userId)}
                />
                {u.username}
              </label>
            </div>
          ))}
        </div>

        {(form.splitType === "EXACT" || form.splitType === "PERCENTAGE") && (
          <div>
            <label className="block font-semibold">Enter Values</label>
            {form.participants.map((id, index) => (
                 <div key={id} className="mb-3">  {/* adds spacing below each item */}
                 <label className="block font-medium">
                    {users.find(u => u.userId === id)?.username}:
                    </label>
                    <input
                    type="number"
                    value={form.values[index] || ''}
                    onChange={(e) => handleValuesChange(index, e.target.value)}
                    className="border px-2 py-1 mt-1 w-full"
                    required/>
                    </div>
                ))}
                </div>
            )}
        <div className="flex space-x-4 mb-6">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded space-y-4 ">Add Expense</button>
        <button onClick={() => navigate(-1)} className="bg-orange-500 text-white px-4 py-2 rounded ">
          Back
        </button></div>
      </form>
    </div>
  );
}
