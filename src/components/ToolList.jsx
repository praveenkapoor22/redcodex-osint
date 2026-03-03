export default function ToolList({ tool }) {
  if (!tool) return <p>Select a tool from left panel</p>;

  return (
    <div>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <a href={tool.url} target="_blank">Open Tool</a>
    </div>
  );
}