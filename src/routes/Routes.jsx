import { createBrowserRouter } from "react-router-dom";
import axios from "axios";
import { ErrorPage } from "../components/User/ErrorPage";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import PlacesPage from "../pages/PlacesPage";
import PlacesFormPage from "../pages/PlacesFormPage";
import PlacePage from "../pages/PlacePage";
import BookingsPage from "../pages/BookingsPage";
import BookingPage from "../pages/BookingPage";
import Layout from "../layouts/Layout";

// Set Axios defaults
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

// Define the routes using `createBrowserRouter`
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <IndexPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signUp", element: <SignUpPage /> },
      { path: "account", element: <ProfilePage /> },
      { path: "account/places", element: <PlacesPage /> },
      { path: "account/places/new", element: <PlacesFormPage /> },
      { path: "account/places/:id", element: <PlacesFormPage /> },
      { path: "place/:title", element: <PlacePage /> },
      { path: "account/bookings", element: <BookingsPage /> },
      { path: "account/bookings/:id", element: <BookingPage /> },
    ],
  },
]);
