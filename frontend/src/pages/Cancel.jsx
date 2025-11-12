import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel(){
  return (
    <div className="centered">
      <div className="card">
        <h2>Payment Cancelled</h2>
        <p>You cancelled the payment.</p>
        <Link to="/dashboard">Return to Dashboard</Link>
      </div>
    </div>
  );
}
