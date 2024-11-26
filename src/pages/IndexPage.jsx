import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../components/Place/PlaceImg";
import { UserContext } from "../components/Context/UserContext";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [photos, setPhotos] = useState([]);
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

    if (places.length > 0) {
      // Parse photos if it's a JSON string
      let images =
        typeof places[0].photos === "string"
          ? JSON.parse(places[0].photos)
          : places[0].photos;
      setPhotos(images);
    }
  }, [places]); // Empty dependency array ensures this runs only once

  return (
    <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        photos.length > 0 &&
        places.map((place) => {
          return (
            <Link to={`/place/${place.title}`} key={place.title}>
              <div className="rounded-2xl bg-gray-500 flex">
                <PlaceImg
                  photos={photos[0]}
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
