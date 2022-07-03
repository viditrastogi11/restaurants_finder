import { useEffect, useState } from "react";
import { rapidApiKey } from "../constant";
import Filters from "./Filters";
import LoadingSpinner from "./LoadingSpinner";

const ListOfRestraurants = (props) => {
  const {
    currentLocation,
    setCurrentLocation,
    restaurants,
    setRestaurants,
    setSelectedRestaurant,
    prevLocations,
  } = props;
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    fetchRestaurantHandler();
  }, [restaurants]);

  async function fetchRestaurantHandler() {
    setIsloading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key":rapidApiKey,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };
    if (restaurants.length < 100 && currentLocation.lat !== 0) {
      const response = await fetch(
        `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&distance=1000&offset=${restaurants.length}&lunit=km&lang=en_US`,
        options
      );
      const data = await response.json();
     if(!data.data)
     {
      alert("Api limit crossed. See you in next month.")
      return; 
     }
      const restaurant = data.data;
      setRestaurants((prevState) => [...prevState, ...restaurant]);
    }
    setIsloading(false);
  }

  return (
    <>
      {
        <div style={{ maxWidth: "400px", height: "100vh", overflow: "hidden" }}>
          <Filters {...{ prevLocations, setCurrentLocation }}></Filters>
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div style={{ height: "90%", overflow: "scroll"}}>
              {restaurants.map((e, i) => {
                return e.name && e.address ? (
                  <>
                    {
                      <div
                        onClick={() => {
                          setSelectedRestaurant(e);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "start",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        <div>
                          {e.name +
                            (e.distance_string
                              ? ` (${e.distance_string ?? ""})`
                              : "")}
                        </div>
                        <div style={{ fontSize: "14px", color: "grey" }}>
                          {e.address}
                        </div>
                      </div>
                    }
                    <hr></hr>
                  </>
                ) : (
                  <></>
                );
              })}
              
            </div>
          )}
        </div>
      }
    </>
  );
};
export default ListOfRestraurants;
