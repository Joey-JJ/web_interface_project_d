import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { Test } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/layout/ErrorPage";
import AddressForm from "./components/addressForm";
import Table from "./components/table";
import {
  ADDRESS_SEARCH_ROUTE,
  IMAGES_ROUTE,
  ROOT_ROUTE,
} from "./utils/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROOT_ROUTE,
        element: <Table />,
      },
      {
        path: ADDRESS_SEARCH_ROUTE,
        element: <AddressForm />,
      },
      {
        path: IMAGES_ROUTE,
        element: <Test />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
