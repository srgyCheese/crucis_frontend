import { createBrowserRouter } from "react-router-dom";
import HeaderLayout from "./layouts/HeaderLayout";
import Posts from "./pages/Posts/Posts";
import User from "./pages/User/User";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Posts />
      },
      {
        path: '/users/:userId',
        element: <User />
      },
    ]
  }
])