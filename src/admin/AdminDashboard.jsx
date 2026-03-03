import { useState } from "react";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toolName, setToolName] = useState("");
  const [toolUrl, setToolUrl] = useState("");

  const addCategory = () => {
    if (!newCategory) return;
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  const addTool = () => {
    if (!toolName || !toolUrl || !selectedCategory) return;

    setTools([
      ...tools,
      { category: selectedCategory, name: toolName, url: toolUrl },
    ]);

    setToolName("");
    setToolUrl("");
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">RedcodeX Admin Panel</h1>

      <div className="admin-grid">
        {/* CATEGORY CARD */}
        <div className="admin-card">
          <h2>Manage Categories</h2>

          <div className="form-row">
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={addCategory}>Add</button>
          </div>

          <ul className="admin-list">
            {categories.map((cat, i) => (
              <li key={i}>{cat}</li>
            ))}
          </ul>
        </div>

        {/* TOOL CARD */}
        <div className="admin-card">
          <h2>Add Tools</h2>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Tool Name"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tool URL"
            value={toolUrl}
            onChange={(e) => setToolUrl(e.target.value)}
          />

          <button onClick={addTool}>Add Tool</button>

          <ul className="admin-list">
            {tools.map((tool, i) => (
              <li key={i}>
                <strong>{tool.name}</strong>
                <span>{tool.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}