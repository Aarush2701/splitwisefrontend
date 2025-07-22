import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api/axios';

export default function SettleForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state || !state.groupid || !state.paidby || !state.paidto) {
    return (
      <div className="text-red-500 text-center mt-8">
        Missing required data. Please go back and try again.
      </div>
    );
  }

  const { groupid, paidby, paidto } = state;
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/group/${groupid}/settlements`, {
        paidby: paidby.userId,
        paidto: paidto.userId,
        amount: parseFloat(amount),
      });
      setErrorMessage(null);
      alert('Settlement created successfully!');
      navigate(-1); // go back
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Error creating settlement';
      setErrorMessage(msg);
    }
  };

   const handleBackToBalance = () => {
    navigate(`/group/${groupid}`, {
      state: { tab: 'balance' },
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Settle Up</h2>

      {errorMessage && (
        <div className="text-red-600 mb-4 font-semibold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Paid By:</label>
          <div>{paidby.username}</div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Paid To:</label>
          <div>{paidto.username}</div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Amount:</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border p-2 rounded w-full"
            placeholder="Enter custom amount"
          />
        </div>
        
       <div className="flex space-x-4 mb-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Settlement
          </button>

          <button
            type="button"
            onClick={handleBackToBalance}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Balance
          </button>
        </div>

      </form>
      
    </div>
  );
}
