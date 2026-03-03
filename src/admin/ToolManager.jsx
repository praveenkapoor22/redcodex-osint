import { osintTree } from "../data/osintTree";
import { useState } from "react";

export default function ToolManager() {
  const [category, setCategory] = useState("");
  const [tool, setTool] = useState("");
  const [url, setUrl] = useState("");

  const addTool = () => {
    const cat = osintTree.children.find(c => c.name === category);
    if (!cat) return alert("Category not found");

    cat.children.push({
      name: tool,
      url,
      tag: "T",
    });

    setTool("");
    setUrl("");
    alert("Tool added (reload to see changes)");
  };

  return (
    <div className="admin-box">
      <h3>Tools</h3>

      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Select Category</option>
        {osintTree.children.map((c, i) => (
          <option key={i}>{c.name}</option>
        ))}
      </select>

      <input
        placeholder="Tool Name"
        value={tool}
        onChange={(e) => setTool(e.target.value)}
      />

      <input
        placeholder="Tool URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={addTool}>Add Tool</button>
    </div>
  );
}