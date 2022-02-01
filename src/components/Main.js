import React,{Fragment} from "react";
import { useEffect } from "react";
import "./Main.css";
import  Aos  from "aos";
import "aos/dist/aos.css";

const Main= (props) =>{
  useEffect(() => {
    Aos.init({duration:2000});
  }, []);

    return(
        <Fragment>
            <div data-aos="fade-left" className="main">
            <p  className="temperature">{props.value.cellsius}{props.symbol && <span>°C</span>} </p>
            <p className="condition">{props.value.condition}</p>
              {props.conditions&&<div className="conditions">
                {props.value.condition?.toLowerCase() === "sunny" &&<p><i className="fas fa-sun"></i></p>}
                {props.value.condition?.toLowerCase() === "clear" &&<p><i className="fas fa-sun"></i></p>}
                {props.value.condition?.toLowerCase() === "overcast" &&<p><i className="fas fa-cloud"></i></p>}
                {props.value.condition?.toLowerCase() === "rainy" &&<p><i className="fas fa-cloud-rain"></i></p>}
                {props.value.condition?.toLowerCase() === "partly cloudy" &&<p><i className="fas fa-cloud-sun"></i></p>}
                {props.value.condition?.toLowerCase() === "light rain" &&<p><i class="fas fa-cloud-rain"></i></p>}
                {props.value.condition?.toLowerCase() === "light snow showers" &&<p><i class="far fa-snowflake"></i></p>}
                {props.value.condition?.toLowerCase() === "light snow" &&<p><i class="far fa-snowflake"></i></p>}
                {props.value.condition?.toLowerCase() === "cloudy" &&<p><i class="fas fa-cloud"></i></p>}
                </div>}
              <h1 data-aos="fade-left" className="city-name">
                    {props.value.name}
                </h1>
            </div>
        </Fragment>
    )
}

export default Main;