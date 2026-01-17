import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const isVercel = !!process.env.VERCEL;

  return {
    plugins: [react()],
    base: isVercel ? "/" : "/DiverLens/",
    build: {
      outDir: isVercel ? "dist" : "docs",
    },
  };
});
