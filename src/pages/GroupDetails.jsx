
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpensesTab from '../components/group/ExpensesTab';
import GroupMembersTab from '../components/group/GroupMembersTab';
import BalanceTab from '../components/group/BalanceTab';
import SettlementsTab from '../components/group/SettlementsTab';
import { useNavigate } from 'react-router-dom';


export default function GroupDetails() {
  const { groupid } = useParams();
  const [activeTab, setActiveTab] = useState('expenses');
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Group ID: {groupid}</h2>

      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab('expenses')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Expenses
        </button>
        <button onClick={() => setActiveTab('members')} className="bg-green-500 text-white px-4 py-2 rounded">
          Group Details
        </button>
        <button onClick={() => setActiveTab('balance')} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Balance
        </button>
        <button onClick={() => setActiveTab('settlements')} className="bg-purple-500 text-white px-4 py-2 rounded">
          Settlements
        </button>
        <button onClick={() => window.location.href = '/dashboard'} className="bg-orange-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>

      {activeTab === 'expenses' && <ExpensesTab groupid={groupid} />}
      {activeTab === 'members' && <GroupMembersTab groupid={groupid} />}
      {activeTab === 'balance' && <BalanceTab groupid={groupid} />}
      {activeTab === 'settlements' && <SettlementsTab groupid={groupid} />}
    </div>
  );
}
