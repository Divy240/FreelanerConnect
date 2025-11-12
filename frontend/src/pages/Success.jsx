import React from 'react';
import { Link } from 'react-router-dom';

export default function Success(){
  return (
    <div className="centered">
      <div className="card">
        <h2>Payment Successful</h2>
        <p>Thank you — payment completed successfully.</p>
        <Link to="/dashboard">Return to Dashboard</Link>
      </div>
    </div>
  );
}
