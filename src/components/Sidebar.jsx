import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Sidebar({ categories, onSelect }) {
  return (
    <aside
      style={{
        width: "300px",
        padding: "20px",
        background: "rgba(12,16,22,0.85)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(225,6,0,0.2)",
        boxShadow: "4px 0 25px rgba(0,0,0,0.6)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* ================= NOTES SECTION ================= */}
      <div>
        <h3 style={{ color: "#ff2a2a", marginBottom: "10px" }}>
          📝 Notes
        </h3>
        <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#c9d1d9" }}>
          This OSINT framework is designed to help researchers and analysts
          discover publicly accessible intelligence tools and resources.
          Many platforms listed here provide free access, while some may
          offer extended features through premium tiers.
        </p>

        <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#c9d1d9" }}>
          The goal is to make open-source investigation easier across
          cybersecurity, journalism, research, compliance, and other
          professional domains.
        </p>
      </div>

      {/* ================= UPDATE SECTION ================= */}
      <div>
        <h3 style={{ color: "#ff2a2a", marginBottom: "10px" }}>
          🔔 Updates
        </h3>
        <p style={{ fontSize: "13px", color: "#c9d1d9" }}>
          Follow project updates and improvements through our social
          channels. New tools and refinements are added regularly.
        </p>
      </div>

      {/* ================= SOCIAL ICONS ================= */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "10px",
        }}
      >
        <a href="#" target="_blank" rel="noreferrer">
          <FaGithub
            size={18}
            style={{ color: "#8b949e", transition: "0.3s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#e10600")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#8b949e")
            }
          />
        </a>

        <a href="#" target="_blank" rel="noreferrer">
          <FaTwitter
            size={18}
            style={{ color: "#8b949e", transition: "0.3s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#e10600")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#8b949e")
            }
          />
        </a>

        <a href="#" target="_blank" rel="noreferrer">
          <FaLinkedin
            size={18}
            style={{ color: "#8b949e", transition: "0.3s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#e10600")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#8b949e")
            }
          />
        </a>
      </div>

      {/* ================= FEEDBACK ================= */}
      <div>
        <h3 style={{ color: "#ff2a2a", marginBottom: "10px" }}>
          💬 Suggestions
        </h3>
        <p style={{ fontSize: "13px", color: "#c9d1d9" }}>
          Have a tool recommendation or improvement idea?
          Contributions and feedback are always welcome.
        </p>
      </div>
    </aside>
  );
}