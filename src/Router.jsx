import { createBrowserRouter } from "react-router";
import App from "./App";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import authLoader from "./loaders/unit/authLoader";
import Logout from "./components/Logout";
import BudgetList from "./pages/budget/BudgetList";
import CategoryList from "./pages/category/categoryList";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      { path: "", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
        { path: "logout", element: <Logout /> },
        {path: "category", element: <CategoryList />},
        {path: "budget", element: <BudgetList />}
        ],
    hydrateFallbackElement: <p>Loading...</p>,
  },
];

const router = createBrowserRouter(routes, {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});

export default router;