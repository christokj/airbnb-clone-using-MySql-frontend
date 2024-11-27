import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../components/Place/PlaceImg";
import { UserContext } from "../components/Context/UserContext";
import { axiosInstance } from "../config/axiosInstance";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const { setUser, user} = useContext(UserContext);

  // Fetch places on component mount
  useEffect(() => {
    if (!places.length) {
      axios
        .get("/places")
        .then((response) => {
          setPlaces(response.data);
        })
        .catch((err) => {
          console.error("Error fetching places:", err);
        });
    }
    if (!user.success) {
      axiosInstance
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error); // Log error
      });
    }
  }, [places]); // Empty dependency array ensures this runs only once
  return (
    <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={`/place/${place.id}`} key={place.id}>
              <div className="rounded-2xl bg-gray-500 flex">
                <PlaceImg
                  photos={place.photos}
                  index={1}
                  className="rounded-2xl object-cover aspect-square"
                />
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-2">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default IndexPage;
