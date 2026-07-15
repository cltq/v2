import type { MetadataRoute } from "next";
import { appRoutes } from "@/app/routes";

const domains = ["https://applefumi.xyz", "https://w.vreni.xyz"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const domain of domains) {
    for (const route of appRoutes) {
      entries.push({
        url: `${domain}${route.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route.href === "/" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
