function Highlight({ text, highlight }) {
  if (!text) return null;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => (
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          <span key={index}>{part}</span>
        )
      ))}
    </span>
  );
}

export default Highlight;
