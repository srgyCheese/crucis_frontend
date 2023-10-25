import { Outlet, createBrowserRouter } from "react-router-dom";
import HeaderLayout from "./layouts/HeaderLayout";
import Posts from "./pages/Posts/Posts";
import User from "./pages/User/User";
import Users from "./pages/Users/Users";
import AdminRequire from "./layouts/AdminRequire";
import NotFound from "./pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HeaderLayout>
        <Outlet />
      </HeaderLayout>
    ),
    errorElement: (
      <HeaderLayout>
        <NotFound />
      </HeaderLayout>
    ),
    children: [
      {
        path: '/',
        element: <Posts />
      },
      {
        path: '/users/:userId',
        element: <User />
      },
      {
        path: '/users',
        element: (
          <AdminRequire>
            <Users />
          </AdminRequire>
        )
      }
    ]
  },
])