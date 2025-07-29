import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function EditExpense() {
  const { groupid, expenseid } = useParams();  // 🔁 Renamed here
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: [],
    splitType: 'EQUAL',
    values: [],
  });

  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, groupRes] = await Promise.all([
          api.get(`/group/${groupid}/expenses/${expenseid}`),
          api.get(`/group/${groupid}`),
        ]);

        const expense = expenseRes.data;
        const groupData = groupRes.data;

        const members = groupData.members.map((u) => ({
          userid: u.userId,
          username: u.username,
        }));

        setGroupMembers(members);

        const participantIds = expense.participants
          ? expense.participants.map((p) => p.userId)
          : members.map((m) => m.userid);

        setForm({
          description: expense.description || '',
          amount: expense.amount || '',
          paidBy: expense.userid?.userid || '',
          participants: participantIds,
          splitType: expense.splitType || 'EQUAL',
          values: expense.values || [],
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to load expense or group data', error);
        alert('Failed to load expense');
      }
    };

    fetchData();
  }, [groupid, expenseid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleParticipantsChange = (userId) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.includes(userId)
        ? prev.participants.filter((id) => id !== userId)
        : [...prev.participants, userId],
    }));
  };

  const handleValueChange = (index, newValue) => {
    const updated = [...form.values];
    updated[index] = newValue;
    setForm({ ...form, values: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      description: form.description,
      amount: parseFloat(form.amount),
      paidBy: form.paidBy,
      participants: form.participants,
      splitType: form.splitType,
      values: form.splitType !== 'EQUAL' ? form.values.map(Number) : [],
    };

    try {
      await api.put(`/group/${groupid}/expenses/${expenseid}`, payload);
      alert('Expense updated successfully');
      navigate(`/group/${groupid}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update expense');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="font-semibold">Select Payer:</label>
          <select
            name="paidBy"
            value={form.paidBy}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Payer --</option>
            {groupMembers.map((user) => (
              <option key={user.userid} value={user.userid}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Select Participants:</label>
          {groupMembers.map((user) => (
            <div key={user.userid}>
              <label>
                <input
                  type="checkbox"
                  checked={form.participants.includes(user.userid)}
                  onChange={() => handleParticipantsChange(user.userid)}
                />
                {user.username}
              </label>
            </div>
          ))}
        </div>

        <div>
          <label className="font-semibold">Split Type:</label>
          <select
            name="splitType"
            value={form.splitType}
            onChange={handleChange}
            className="w-full p-2 border rounded border-orange-400"
          >
            <option value="EQUAL">EQUAL</option>
            <option value="EXACT">EXACT</option>
            <option value="PERCENTAGE">PERCENTAGE</option>
          </select>
        </div>

        {(form.splitType === 'EXACT' || form.splitType === 'PERCENTAGE') && (
          <div>
            <label className="font-semibold">Enter Values:</label>
            {form.participants.map((id, index) => {
              const member = groupMembers.find((u) => u.userid === id);
              return (
                <div key={id}>
                  <label>{member?.username}:</label>
                  <input
                    type="number"
                    value={form.values[index] || ''}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full p-1 border rounded mb-1"
                  />
                </div>
              );
            })}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
}
