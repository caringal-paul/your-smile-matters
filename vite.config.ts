import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: true, // Allow external access (0.0.0.0)
		port: 5002, // Match your Docker port
		allowedHosts: ["staging.ami.altinvest.suites.digital"], // Prevent Vite from blocking the hostname
	},
});
