import "./App.css";
import axios from "axios";
import { UserContextProvider } from "./components/Context/UserContext";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_DOMAIN + "/api/v1/user";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
