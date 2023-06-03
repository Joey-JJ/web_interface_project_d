import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/pages/ErrorPage";
import {
  ADDRESS_SEARCH_ROUTE,
  IMAGES_ROUTE,
  ROOT_ROUTE,
} from "./utils/constants";
import ImagesPage from "./components/pages/ImagesPage";
import BuildingsPage from "./components/pages/BuildingsPage";
import AddressSearchPage from "./components/pages/AddressSearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROOT_ROUTE,
        element: <BuildingsPage />,
      },
      {
        path: ADDRESS_SEARCH_ROUTE,
        element: <AddressSearchPage />,
      },
      {
        path: IMAGES_ROUTE,
        element: <ImagesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
