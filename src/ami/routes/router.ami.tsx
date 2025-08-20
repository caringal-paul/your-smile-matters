// src/routes/router.tsx
import {
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./routes.ami";

export const router = createBrowserRouter(createRoutesFromElements(routes));
