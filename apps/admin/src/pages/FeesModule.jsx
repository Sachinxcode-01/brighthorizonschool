import React, { useEffect, useState } from 'react';
import { CreditCard, DollarSign, Plus } from 'lucide-react';
import { adminApi } from '../services/api';

export default function FeesModule() {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    adminApi.resource('fees').getAll().then(res => res.success && setFees(res.data));
    adminApi.resource('payments').getAll().then(res => res.success && setPayments(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Fee Structures & Payment Collections</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Track tuition fees, issue payment receipts, and review pending balances.</p>
      </div>

      <div className="admin-card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'white' }}>Fee Payment Transactions</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Amount Paid</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>{p.receiptNo}</td>
                <td style={{ fontWeight: 600 }}>{p.studentName}</td>
                <td>{p.className}</td>
                <td style={{ color: '#4ade80', fontWeight: 600 }}>₹{p.amountPaid?.toLocaleString()}</td>
                <td>{p.paymentMethod}</td>
                <td>{p.paymentDate}</td>
                <td><span className="badge-status badge-active">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
