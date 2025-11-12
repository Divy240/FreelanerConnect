import React, { useEffect, useState } from "react";
import axios from "axios";

const FreelancerDashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", budget: "" });

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
      fetchMyProjects();
    }
  }, []);

  const fetchMyProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/projects/create`,
        newProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProject({ title: "", description: "", budget: "" });
      fetchMyProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-wrapper">
      <nav className="top-nav">
        <h1>FreelancerConnect</h1>
        <div className="nav-right">
          <span>Hello, {user.name}</span>
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
        <h2 className="section-title">Create a New Project</h2>
        <form onSubmit={handleCreateProject} className="create-form">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          ></textarea>
          <input
            type="number"
            placeholder="Budget (₹)"
            value={newProject.budget}
            onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
          />
          <button type="submit">Add Project</button>
        </form>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">My Projects</h2>
        <div className="card-grid">
          {projects.map((p) => (
            <div key={p._id} className="card project-card">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span>💰 ₹{p.budget}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
