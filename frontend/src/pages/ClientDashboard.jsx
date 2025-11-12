import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [hires, setHires] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const u = JSON.parse(data);
      setUser(u);
      fetchProjects();
      fetchHires();
    }
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data.projects);
  };

  const fetchHires = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/hire/myhires`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHires(res.data.hires);
  };

  const handleHire = async (freelancerId, projectId) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_API_URL}/hire/create`,
      { freelancerId, projectId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchHires();
    alert("Freelancer Hired!");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-wrapper client-view">
      <nav className="top-nav client-nav">
        <h1>FreelancerConnect</h1>
        <div className="nav-right">
          <span>Welcome, {user.name}</span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-section">
        <h2 className="section-title">Explore Freelancers</h2>
        <div className="card-grid">
          {projects.map((p) => (
            <div key={p._id} className="card freelancer-card">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span>💰 ₹{p.budget}</span>
              <p>👤 {p.freelancer?.name}</p>
              <button onClick={() => handleHire(p.freelancer._id, p._id)}>Hire</button>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">My Hires</h2>
        <div className="hire-list">
          {hires.length === 0 ? (
            <p className="no-data">You haven’t hired anyone yet.</p>
          ) : (
            hires.map((h) => (
              <div key={h._id} className="hire-item">
                <span>{h.freelancer.name}</span>
                <span className="status">{h.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
