import { useState } from "react";
import tools from "./data/tools.json";
import Header from "./components/Header";
import ToolList from "./components/ToolList";


export default function App() {
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);

  const filtered = tools.map(cat => ({
    ...cat,
    tools: cat.tools.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase())
    )
  }));

  return (
    <>
      <Header onSearch={setSearch} />
      <div style={{ display: "flex" }}>
        <Sidebar categories={filtered} onSelect={setSelectedTool} />
        <main style={{ padding: "20px" }}>
          <ToolList tool={selectedTool} />
        </main>
      </div>
    </>
  );
}