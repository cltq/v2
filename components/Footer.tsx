export default function Footer() {
  return (
    <footer className="grid grid-cols-3 items-center px-8 py-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] text-[13px] text-zinc-600">
      <div />
      <p className="text-center justify-self-center">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-zinc-500">Fumi</span>
      </p>
      <div />
    </footer>
  );
}
