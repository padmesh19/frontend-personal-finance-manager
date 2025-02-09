import { createBrowserRouter } from "react-router";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BudgetList from "./pages/budget/BudgetList";
import CategoryList from "./pages/category/categoryList";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from "./layouts/Layout";
import TransactionList from "./pages/transaction/TransactionList";
import GoalList from "./pages/goal/GoalList";

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <ProtectedRoute />
      </Layout>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "category",
        element: <CategoryList />,
      },
      {
        path: "budget",
        element: <BudgetList />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "transaction",
        element: <TransactionList />,
      },
      {
        path: "goal",
        element: <GoalList />,
      },
    ],
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
