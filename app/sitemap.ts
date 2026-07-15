import type { MetadataRoute } from "next";
import { appRoutes } from "@/app/routes";

const baseUrl = "https://applefumi.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return appRoutes.map((route) => ({
    url: `${baseUrl}${route.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.href === "/" ? 1 : 0.8,
  }));
}
