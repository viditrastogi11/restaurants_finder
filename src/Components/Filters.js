import { useState } from 'react';
import './Filter.css';
const Filters = (props) => {
    const {prevLocations,  setCurrentLocation}=props;
    const [value,setValue]=useState(prevLocations[props.prevLocations.length-1]);
    
  return (
    <>
    <div style={{margin: "20px",textAlign:"start" }}>
        <label>Previous Locations</label>
      <select placeholder='Previous Locations' value={value} onChange={(e)=>{
        setValue(e.target.value);
        setCurrentLocation(prevLocations[e.target.value])
       }}>
       {prevLocations.map((e,i)=>{return<option value={i}>Lattitude: {e.lat}, Longitude: {e.lng}</option>}).reverse()}
      </select>
     
    </div>
     <hr></hr>
     </>
  );
};
export default Filters;
