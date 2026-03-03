import { useState, useRef, useEffect } from "react";
import OsintTree from "./components/OsintTree";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

/* ================= NEURAL BACKGROUND ================= */
function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const PARTICLE_COUNT = 90;
    const MAX_DISTANCE = 130;
    let mouse = { x: null, y: null };
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = 2;
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#e10600";
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MAX_DISTANCE) {
            ctx.strokeStyle = `rgba(225,6,0,${1 - distance / MAX_DISTANCE})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse (FIXED CONDITION)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[a].x - mouse.x;
          const dy = particles[a].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(225,6,0,${1 - distance / 150})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.move();
        p.draw();
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
  <>
    {/* Subtle Gradient Layer */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(circle at 50% 30%, rgba(20,20,20,0.6), rgba(0,0,0,0.95)),
          linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))
        `,
      }}
    />

    {/* Neural Canvas */}
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    />
  </>
); }

/* ================= MAIN APP ================= */
export default function App() {
  const isAdminRoute = window.location.pathname === "/admin";

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("redcodex_admin") === "true"
  );

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem("redcodex_admin", "true");
    } else {
      localStorage.removeItem("redcodex_admin");
    }
  }, [isAdmin]);

  const [search, setSearch] = useState("");
  const resetZoomRef = useRef(null);

  if (isAdminRoute) {
    return isAdmin ? (
      <AdminDashboard
        onLogout={() => {
          setIsAdmin(false);
          window.location.href = "/";
        }}
      />
    ) : (
      <AdminLogin onLogin={() => setIsAdmin(true)} />
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0b0f14",
        position: "relative",
      }}
    >
      {/* ✅ Neural Animated Background */}
      <CanvasBackground />
{/* ================= HEADER ================= */}
<header
  style={{
    padding: "20px 40px",
    borderBottom: "1px solid #30363d",
    position: "relative",
    zIndex: 1,
  }}
>
  {/* Social Icons */}
  <div
    style={{
      position: "absolute",
      top: "20px",
      right: "40px",
      display: "flex",
      gap: "16px",
    }}
  >
    <a
      href="https://github.com/praveenkapoor22/redcodex-osint"
      target="_blank"
      rel="noreferrer"
      style={{ display: "flex" }}
    >
      <FaGithub
        size={18}
        style={{ color: "#8b949e", transition: "0.3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e10600")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8b949e")}
      />
    </a>

    <a
      href="https://linkedin.com/in/praveenkapoor22"
      target="_blank"
      rel="noreferrer"
      style={{ display: "flex" }}
    >
      <FaLinkedin
        size={18}
        style={{ color: "#8b949e", transition: "0.3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e10600")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8b949e")}
      />
    </a>

    <a
      href="https://x.com/praveenkapoor22"
      target="_blank"
      rel="noreferrer"
      style={{ display: "flex" }}
    >
      <FaTwitter
        size={18}
        style={{ color: "#8b949e", transition: "0.3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e10600")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8b949e")}
      />
    </a>
  </div>

  <h1
    style={{
      color: "#e10600",
      margin: 0,
      fontSize: "24px",
      fontWeight: 700,
    }}
  >
    RedcodeX OSINT Framework
  </h1>

  <p
    style={{
      color: "#8b949e",
      fontSize: "13px",
      marginTop: "8px",
      maxWidth: "900px",
      lineHeight: 1.6,
    }}
  >
    An interactive Open-Source Intelligence (OSINT) mind-map designed by
    RedcodeX for cybersecurity research, investigations, and intelligence gathering.
  </p>

  <input
    type="text"
    placeholder="Search tools or categories…"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      marginTop: "14px",
      width: "340px",
      padding: "9px 14px",
      background: "#0d1117",
      border: "1px solid #d21010",
      borderRadius: "6px",
      color: "#c9d1d9",
      fontSize: "13px",
      outline: "none",
    }}
  />

  <div
    style={{
      marginTop: "10px",
      display: "flex",
      gap: "20px",
      fontSize: "12px",
      color: "#8b949e",
    }}
  >
    <span><b>(T)</b> Tool</span>
    <span><b>(D)</b> Dork</span>
    <span><b>(R)</b> Requires Registration</span>
  </div>
</header>
      {/* ================= MAIN ================= */}
      <main
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          zIndex: 1,
        }}
      >
        <button
          onClick={() =>
            resetZoomRef.current && resetZoomRef.current()
          }
          style={{
            position: "absolute",
            top: "16px",
            right: "30px",
            zIndex: 10,
            background: "#161b22",
            border: "1px solid #30363d",
            color: "#c9d1d9",
            padding: "7px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          ⟳ Reset View
        </button>

        <div style={{ flex: 1 }}>
          <OsintTree
            search={search}
            onZoomReady={(resetFn) =>
              (resetZoomRef.current = resetFn)
            }
          />
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          padding: "12px 40px",
          borderTop: "1px solid #30363d",
          fontSize: "11px",
          color: "#6e7681",
          position: "relative",
          zIndex: 1,
          background: "#0b0f1450",
        }}
      >
        © {new Date().getFullYear()} RedcodeX · For educational & research use only
      </footer>
    </div>
  );
}
