import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DekatEvent",
    short_name: "DekatEvent",
    description:
      "Informasi event lokal dan pendaftaran program DekatLokal dalam satu tempat.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fbff",
    theme_color: "#0255F5",
    orientation: "portrait-primary",
    categories: ["events", "education", "business"],
    lang: "id",
    icons: [
      {
        src: "/icons/dekatevent-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/dekatevent-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/dekatevent-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
