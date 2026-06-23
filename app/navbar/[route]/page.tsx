import { notFound } from "next/navigation";
import { appRoutes } from "@/app/routes";

export function generateStaticParams() {
  return appRoutes
    .filter((r) => r.href !== "/")
    .map((r) => ({ route: r.href.replace("/", "") }));
}

export default async function NavbarRoutePage({
  params,
}: {
  params: Promise<{ route: string }>;
}) {
  const { route } = await params;
  const matched = appRoutes.find((r) => r.href === `/${route}`);

  if (!matched) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">
        {matched.name}
      </h1>
      {matched.description && (
        <p className="text-[#9ca3af]">{matched.description}</p>
      )}
    </main>
  );
}
