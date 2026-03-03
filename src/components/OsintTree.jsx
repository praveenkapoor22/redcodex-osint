import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { osintTree } from "../data/osintTree";

export default function OsintTree({ search, onZoomReady }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomRef = useRef(null);
  const initialTransformRef = useRef(null);

  const [openCat, setOpenCat] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  /* ================= INIT SVG ================= */
  useEffect(() => {
    if (svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight - 220;

    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("cursor", "grab");

    const g = svg.append("g");

    svgRef.current = svg;
    gRef.current = g;

    const zoom = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    zoomRef.current = zoom;
    svg.call(zoom);

    const initialTransform = d3.zoomIdentity.translate(
      150,
      height / 2
    );

    initialTransformRef.current = initialTransform;
    svg.call(zoom.transform, initialTransform);

    if (onZoomReady) {
      onZoomReady(() => {
        svg
          .transition()
          .duration(400)
          .call(zoom.transform, initialTransformRef.current);
      });
    }
  }, []);

  /* ================= DRAW TREE ================= */
  useEffect(() => {
    const g = gRef.current;
    if (!g) return;

    g.selectAll("*").remove();

    const searchTerm = search.toLowerCase().trim();

    const rootX = 0;
    const rootY = 0;

const catX = 300;   // slightly more from root
const subX = 600;   // 🔥 increased distance
const toolX = 950;  // 🔥 more space for tools

    const CAT_GAP = 60;
    const SUB_GAP = 40;
    const TOOL_GAP = 34;

    function curve(x1, y1, x2, y2) {
      return `M${x1},${y1}
              C${x1 + 80},${y1}
               ${x2 - 80},${y2}
               ${x2},${y2}`;
    }

    /* ROOT */
    g.append("rect")
      .attr("x", rootX - 20)
      .attr("y", rootY - 20)
      .attr("width", 260)
      .attr("height", 36)
      .attr("rx", 8)
      .attr("class", "root-node");

    g.append("text")
      .attr("x", rootX)
      .attr("y", rootY + 6)
      .attr("class", "root-text")
      .text(osintTree.name);

    osintTree.children.forEach((cat, ci) => {
      const catY =
        -((osintTree.children.length - 1) * CAT_GAP) / 2 +
        ci * CAT_GAP;

      g.append("path")
        .attr("d", curve(rootX + 240, rootY, catX, catY))
        .attr("class", "tree-link");

      const catMatches =
        search &&
        cat.name.toLowerCase().includes(search.toLowerCase());

      const shouldOpenCat =
        openCat === ci ||
        catMatches ||
        (search &&
          cat.children.some(sub =>
            sub.name.toLowerCase().includes(search.toLowerCase()) ||
            sub.children.some(tool =>
              tool.name.toLowerCase().includes(search.toLowerCase())
            )
          ));

      const catGroup = g
        .append("g")
        .attr("class", "tree-node")
        .style("cursor", "pointer")
        .on("click", () => {
          setOpenCat(openCat === ci ? null : ci);
          setOpenSub(null);
        });

      catGroup.append("rect")
        .attr("x", catX - 15)
        .attr("y", catY - 18)
        .attr("width", 220)
        .attr("height", 32)
        .attr("rx", 8)
        .attr("class", catMatches ? "node-card highlight" : "node-card");

      catGroup.append("text")
        .attr("x", catX + 10)
        .attr("y", catY + 5)
        .attr("class", "node-text")
        .text("📁 " + cat.name);

      if (shouldOpenCat) {
        cat.children.forEach((sub, si) => {
          const subY =
            catY -
            ((cat.children.length - 1) * SUB_GAP) / 2 +
            si * SUB_GAP;

          g.append("path")
            .attr("d", curve(catX + 200, catY, subX, subY))
            .attr("class", "tree-link-light");

          const subMatches =
            search &&
            sub.name.toLowerCase().includes(search.toLowerCase());

          const toolMatchExists =
            search &&
            sub.children.some(tool =>
              tool.name.toLowerCase().includes(search.toLowerCase())
            );

          const shouldOpenSub =
            openSub === `${ci}-${si}` ||
            subMatches ||
            toolMatchExists;

          const subGroup = g
            .append("g")
            .attr("class", "tree-node")
            .style("cursor", "pointer")
            .on("click", (e) => {
              e.stopPropagation();
              setOpenSub(
                openSub === `${ci}-${si}` ? null : `${ci}-${si}`
              );
            });

          subGroup.append("rect")
            .attr("x", subX - 15)
            .attr("y", subY - 15)
            .attr("width", 200)
            .attr("height", 28)
            .attr("rx", 6)
            .attr("class", subMatches ? "node-card highlight" : "node-card");

          subGroup.append("text")
            .attr("x", subX + 8)
            .attr("y", subY + 4)
            .attr("class", "node-text")
            .text("📂 " + sub.name);

          if (shouldOpenSub) {
            sub.children.forEach((tool, ti) => {
              const toolY =
                subY -
                ((sub.children.length - 1) * TOOL_GAP) / 2 +
                ti * TOOL_GAP;

              g.append("path")
                .attr("d", curve(subX + 180, subY, toolX, toolY))
                .attr("class", "tree-link-light");

              const toolMatches =
                search &&
                tool.name.toLowerCase().includes(search.toLowerCase());

              const toolNode = g
                .append("g")
                .attr("class", "tree-node")
                .style("cursor", "pointer")
                .on("click", (e) => {
                  e.stopPropagation();
                  setSelectedTool(tool);
                });

              toolNode.append("rect")
                .attr("x", toolX - 15)
                .attr("y", toolY - 13)
                .attr("width", 260)
                .attr("height", 24)
                .attr("rx", 6)
                .attr(
                  "class",
                  toolMatches
                    ? "node-card highlight pulse"
                    : "node-card"
                );

              toolNode.append("text")
                .attr("x", toolX + 6)
                .attr("y", toolY + 4)
                .attr("class", "node-text small")
                .text(`🔗 ${tool.name} (${tool.tag})`);
            });
          }
        });
      }
    });
  }, [openCat, openSub, search]);

  return (
    <>
      <div ref={containerRef} />

{selectedTool && (
  <div className="tool-panel">
    <div className="tool-panel-header">
      <h3>{selectedTool.name}</h3>
      <button onClick={() => setSelectedTool(null)}>✕</button>
    </div>

    <div className="tool-meta">
      <span className="tool-badge">{selectedTool.tag}</span>
    </div>

    <div className="tool-description">
      <p>
        This resource is part of the RedcodeX OSINT ecosystem and can assist
        with reconnaissance, intelligence gathering, and open-source investigations.
      </p>
    </div>

    <a
      href={selectedTool.url}
      target="_blank"
      rel="noreferrer"
      className="tool-link-btn"
    >
      Open Tool →
    </a>

    {/* ================= SHARE SECTION ================= */}
    <div className="tool-share">
      <span>Share:</span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          selectedTool.name
        )}&url=${encodeURIComponent(selectedTool.url)}`}
        target="_blank"
        rel="noreferrer"
        className="share-icon"
      >
        🐦
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          selectedTool.url
        )}`}
        target="_blank"
        rel="noreferrer"
        className="share-icon"
      >
        💼
      </a>
    </div>

    {/* ================= UPDATE & COMMUNITY ================= */}
    <div className="tool-updates">
      <h4>🔔 Updates</h4>
      <p>
        Stay connected for new OSINT tools, improvements,
        and framework updates.
      </p>

      <div className="update-links">
        <a
          href="https://www.facebook.com/groups/redcodex/"
          target="_blank"
          rel="noreferrer"
        >
          Join RedcodeX Community →
        </a>
      </div>
    </div>

    {/* ================= FEEDBACK SECTION ================= */}
    <div className="tool-feedback">
      <h4>💬 Suggestions & Feedback</h4>
      <p>
        Have a new tool recommendation or improvement idea?
        We welcome community contributions.
      </p>

      <a
        href="https://www.facebook.com/groups/redcodex/"
        target="_blank"
        rel="noreferrer"
        className="feedback-link"
      >
        Submit Feedback →
      </a>
    </div>
  </div>
)}
    </>
  );
}