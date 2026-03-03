import { BRAND } from "../config/brand";

export default function Header({ onSearch }) {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      borderBottom: "1px solid #30363d"
    }}>
      <h2 style={{ color: "#e10600" }}>{BRAND.name}</h2>
      <input
        placeholder="Search tools..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
}