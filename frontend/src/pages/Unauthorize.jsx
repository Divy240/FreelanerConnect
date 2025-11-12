import React from "react";

const Unauthorized = () => (
  <div className="unauthorized">
    <h2>Access Denied 🚫</h2>
    <p>You do not have permission to view this page.</p>
    <a href="/login">Go to Login</a>
  </div>
);

export default Unauthorized;
