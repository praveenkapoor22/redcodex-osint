import { osintTree } from "../data/osintTree";
import { useState } from "react";

export default function CategoryManager() {
  const [name, setName] = useState("");

  const addCategory = () => {
    if (!name) return;
    osintTree.children.push({ name, children: [] });
    setName("");
    alert("Category added (reload to see changes)");
  };

  return (
    <div className="admin-box">
      <h3>Categories</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={addCategory}>Add</button>
    </div>
  );
}