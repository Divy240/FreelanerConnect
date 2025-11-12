import React, { useState } from 'react';
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payment(){
  const location = useLocation();
  const navigate = useNavigate();
  const { price = 10, freelancerName = 'Freelancer' } = location.state || {};
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const startCheckout = async () => {
    setLoading(true);
    setError(null);
    try{
      const token = localStorage.getItem('token');
      const res = await api.post('/payments/create-checkout-session', { price, freelancerName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.href = res.data.url;
    }catch(err){
      setError(err.response?.data?.message || err.message || 'Payment error');
      setLoading(false);
    }
  };

  return (
    <div className="centered">
      <div className="card">
        <h2>Payment</h2>
        <p>You're paying <strong>${price}</strong> to hire <strong>{freelancerName}</strong>.</p>
        {error && <div className="error">{error}</div>}
        <button onClick={startCheckout} disabled={loading}>{loading ? 'Redirecting...' : `Pay $${price} via Stripe`}</button>
        <button className="btn ghost" onClick={()=> navigate('/dashboard')}>Cancel</button>
      </div>
    </div>
  );
}
