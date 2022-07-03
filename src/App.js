import "./App.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { mapApiKey } from "./constant";
import { useEffect, useState } from "react";
import ListOfRestraurants from "./Components/ListOfRestaurants";

import LoadingSpinner from "./Components/LoadingSpinner";
import GoogleMapComponent from "./Components/GoogleMap";

const libraries = ["places"];
function App() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [prevLocations, setPrevLocation] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApiKey,
    libraries: libraries,
  });

  const getPrevListOfLocation = () => {
    if (currentLocation.lat === 0 && currentLocation.lng === 0) {
      return;
    }
    const locations = localStorage.getItem("location");
    if (locations === null) {
      localStorage.setItem(
        "location",
        JSON.stringify([
          {
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          },
        ])
      );
      setPrevLocation([
        {
          lat: currentLocation.lat,
          lng: currentLocation.lng,
        },
      ]);
    } else {
      const listOfLocation = JSON.parse(locations);
      const index = listOfLocation.findIndex(
        (e) => e.lat === currentLocation.lat && e.lng === currentLocation.lng
      );
      if (index < 0) {
        listOfLocation.push({
          lat: currentLocation.lat,
          lng: currentLocation.lng,
        });
        if (listOfLocation.length > 10) {
          listOfLocation.shift();
        }
      }

      localStorage.setItem("location", JSON.stringify(listOfLocation));
      setPrevLocation(listOfLocation);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition((position) => {
              setCurrentLocation({
                lat: +position.coords.latitude,
                lng: +position.coords.longitude,
              });
            });
          } else if (result.state === "prompt") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition((position) => {
              setCurrentLocation({
                lat: +position.coords.latitude,
                lng: +position.coords.longitude,
              });
            });
          } else if (result.state === "denied") {
            console.log(result.state);

            alert("Please allow location to use this feature.");
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    setRestaurants([]);
    setCenter(currentLocation);
    getPrevListOfLocation();
  }, [currentLocation]);

  useEffect(() => {
    setCenter({
      lat: +selectedRestaurant.latitude,
      lng: +selectedRestaurant.longitude,
    });
  }, [selectedRestaurant]);
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        {isLoaded ? (
          <GoogleMapComponent
            {...{ center, restaurants, selectedRestaurant, currentLocation }}
          ></GoogleMapComponent>
        ) : (
          <LoadingSpinner></LoadingSpinner>
        )}

        <ListOfRestraurants
          {...{
            currentLocation,
            setCurrentLocation,
            restaurants,
            setRestaurants,
            setSelectedRestaurant,
            prevLocations,
          }}
        ></ListOfRestraurants>
      </div>
    </div>
  );
}

export default App;
