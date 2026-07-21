import Link from "next/link";

const links = [
  { href: "/", label: "Início" },
  { href: "/upload", label: "Datasets" },
  { href: "/train", label: "Treinar Modelo" },
  { href: "/models", label: "Modelos" },
  { href: "/predict", label: "Predição" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white p-4 flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-4">ML Platform</h2>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}