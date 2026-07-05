const tech = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Bun",
  "Geist Mono",
];

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-4 text-[11px] text-zinc-600">
      <div className="flex items-center gap-2">
        <span className="text-zinc-700">//</span>
        {tech.map((t, i) => (
          <span key={t}>
            <span className="text-zinc-500">{t}</span>
            {i < tech.length - 1 && <span className="text-zinc-700 ml-2">·</span>}
          </span>
        ))}
      </div>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-zinc-500">Fumi</span>
      </p>
    </footer>
  );
}
