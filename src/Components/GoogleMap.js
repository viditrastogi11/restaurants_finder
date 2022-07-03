import { GoogleMap, Marker } from "@react-google-maps/api";
import './GoogleMap.css'
const GoogleMapComponent =(props)=>{
    const {center,restaurants,selectedRestaurant,currentLocation}=props;
    return  <GoogleMap
    zoom={14}
    center={center}
    mapContainerClassName="map-container"
  >
    {restaurants.length > 0 &&
      restaurants.map((e, i) => {
        return (
          <Marker
          animation={  e === selectedRestaurant?window.google.maps.Animation.DROP:null}
            icon={
              e === selectedRestaurant
                ? ""
                : "https://img.icons8.com/ultraviolet/40/000000/marker.png"
            }
            position={{ lat: +e.latitude, lng: +e.longitude }}
          ></Marker>
        );
      })}
    <Marker
      icon={{
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: "#4185f4",
        strokeColor: "#4185f4",
        strokeOpacity: 0.5,
        fillOpacity: 1,
        strokeWeight: 20,
        scale: 5, //pixels
      }}
      position={currentLocation}
    ></Marker>
  </GoogleMap>
}
export default GoogleMapComponent;