import React from "react";
import ProductsPage from "./pages/PorductsPage";
import ProductCategory from "./pages/ProductCategoriesPage";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Login from "./pages/Login";
import UserRegister from "./components/user/UserRegistration";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "products",
          element: <ProductCategory />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <UserRegister />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
