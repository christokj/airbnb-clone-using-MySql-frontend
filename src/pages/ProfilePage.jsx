import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/Context/UserContext";
import AccountNav from "../components/User/AccountNav";
import PlacesPage from "./PlacesPage";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  async function logout() {
    await axios.post("/logout");
    setUser((prevUser) => ({
      ...prevUser, // Copy existing properties
      success: false, // Update the success property
    }));
    navigate("/", { replace: true });
  }

  if (!ready && !user.success ) {
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && user.success && (
        <div className="text-center max-w-lg mx-auto my-5">
          Logged in as {user?.data?.email} <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
