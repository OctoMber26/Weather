import React,{Fragment, lazy, Suspense} from "react";
import { useState, useEffect } from "react";
import "./Weather.css";
import  Aos  from "aos";
import "aos/dist/aos.css";

const Main= lazy(() => import("./Main"));

const Weather=() =>{
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const [place, setPlace]=useState("")
    const [placeinfo, setPlaceInfo]= useState({})
    const [conditions, setConditions]=useState(false)
    const [showSymbol, setShowSymbol]=useState(false)
    const [condition, setCondition]=useState(true)
    const [error, setError]=useState(false);

    const validInput=(event) =>{
        setPlace(event.target.value)
    }

    const HideError=() =>{
      setError(null)
    }

    const showLabel=()=>{
      setCondition(true)
    }

    useEffect(() => {
      handleFetch();
      Aos.init({duration:2000});
    }, []);

    const handleFetch=() =>{
        if(place.trim().length === 0){
          setError({
            message:"Enter a city"
          })
            return;
        }
        fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${place}&days=1&aqi=no&alerts=no`
          )
        .then(response => response.json())
        .then((data) => 
        setPlaceInfo({
          name: data.location.name,
          cellsius:data.current.temp_c,
          condition: data.current.condition.text
        })
      );
      setPlace(" ");
      setConditions(true);
      setShowSymbol(true);
      setCondition(false);
    }
    return(
        <Fragment >
          <div className="weather">
          <Suspense fallback={<div className="lazy_loading">Loading...</div>}>
           <Main 
       conditions={conditions}
       value={placeinfo}
       symbol={showSymbol}
       />
       </Suspense>
          <div className="form">
            {condition &&<label data-aos="fade-down" htmlFor="text">
              What's the weather in your city?
            </label>}
            {error&&<p data-aos="fade-down" className="error">{error.message}</p>}
       <input data-aos="fade-down"
       type="text"
       value={place}
       onChange={validInput}
       onClick={showLabel, HideError}
       />
       <button data-aos="fade-down" className="btn btn-outline-light" onClick={handleFetch} type="search">Search</button>
       </div>
       <h1 data-aos="flip-left" className="date">{date}</h1>
       </div>
        </Fragment>
    )
}

export default Weather;