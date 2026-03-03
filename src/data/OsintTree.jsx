import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { osintTree } from "../data/osintTree";

export default function OsintTree() {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    const width = 1400;
    const height = 900;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(
        d3.zoom().on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
      );

    const g = svg.append("g").attr("transform", "translate(80,40)");

    const root = d3.hierarchy(osintTree);
    root.children.forEach(collapse);

    const treeLayout = d3.tree().size([height - 100, width - 400]);

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
      treeLayout(root);

      // LINKS
      const links = g.selectAll(".link").data(root.links(), d => d.target.data.name);

      links.enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-width", 1.5)
        .merge(links)
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x)
        );

      links.exit().remove();

      // NODES
      const nodes = g.selectAll(".node").data(root.descendants(), d => d.data.name);

      const nodeEnter = nodes.enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .style("cursor", "pointer")
        .on("click", (e, d) => {
          if (d.data.url) {
            window.open(d.data.url, "_blank");
          } else {
            d.children = d.children ? null : d._children;
            update(d);
          }
        });

      nodeEnter.append("circle")
        .attr("r", 6)
        .attr("fill", d => d._children ? "#e10600" : "#fff");

      nodeEnter.append("text")
        .attr("x", 12)
        .attr("dy", "0.35em")
        .text(d => d.data.name)
        .style("fill", "#c9d1d9");

      nodes.exit().remove();
    }

    update(root);
  }, []);

  return <div ref={ref}></div>;
}