import ProtectedRoute from "./ProtectedRoute";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginForm from "../components/Authentication/Login/LoginForm";
import Page404 from "./../components/Page404/page404";
import RedirectRoute from "./RedirectingRoute";
import Rooms from "../components/RoomCard/room";
import BookingTable from "../components/BookingTable/BookTable";
import Booking from "../components/BookingRooms/Booking";
import EditBookingData from "../components/BookingList/EditBookingList";
import RouterLayout from "./RouterLayout";
const Routes = () => {
  const routesForPublic = [
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          path: "/",
          element: <RedirectRoute />,
          children: [
            {
              path: "/",
              element: <Navigate replace to="/hotelmanagement/login" />,
            },
            {
              path: "/hotelmanagement/login",
              element: <LoginForm />,
            },
            {
              path: "*",
              element: <Page404 />,
            },
          ],
        },
      ],
    },
  ];
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/hotelmanagement/roomdetail",
              element: <Rooms />,
            },
            {
              path: "/hotelmanagement/timetable",
              element: <BookingTable />,
            },
            {
              path: "/hotelmanagement/booking",
              element: <Booking />,
            },
            {
              path: "/hotelmanagement/edituser",
              element: <EditBookingData />,
            },
          ],
        },
      ],
    },
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
