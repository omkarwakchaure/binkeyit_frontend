import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import UserMenu from "../components/UserMenu";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import Address from "../pages/user/Address";
import MyOrders from "../pages/user/MyOrders";
import Category from "../pages/admin/Category";
import UploadProduct from "../pages/admin/UploadProduct";
import Products from "../pages/admin/Products";
import SubCategory from "../pages/admin/SubCategory";
import AdminPermission from "../layouts/AdminPermission"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "user-Menu",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element:(
              <AdminPermission>
                <Category/>
                </AdminPermission>
            ),
          },
          {
            path: "sub-category",
            element: (
              <AdminPermission>
                <SubCategory/>
                </AdminPermission>
            ),
          },
          {
            path:"upload-product",
            element:(
              <AdminPermission>
                <UploadProduct/>
                </AdminPermission>
            )
          },
          {
            path: "products",
            element: <Products/>
          },
          {
            path: "*",
            element: <div>Page not found</div>,
          },
        ],
      },
    ],
  },
]);
export default router;
