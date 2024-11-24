import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../components/Place/PlaceImg";
import { UserContext } from "../components/Context/UserContext";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const { setUser, setReady, user, ready } = useContext(UserContext);

  // Fetch places on component mount
  useEffect(() => {
    if (!user.length) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error); // Log error
        });
    }
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((err) => {
        console.error("Error fetching places:", err);
      });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => {
          let photos = [];
          try {
            // Parse photos if it's a JSON string
            photos =
              typeof place.photos === "string"
                ? JSON.parse(place.photos)
                : place.photos;
          } catch (err) {
            console.error("Error parsing photos:", err);
          }

          return (
            <Link to={`/place/${place.title}`} key={place.title}>
              <div className="rounded-2xl bg-gray-500 flex">
                {photos.length > 0 && (
                  <PlaceImg
                    photos={photos[0]}
                    className="rounded-2xl object-cover aspect-square"
                  />
                )}
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
