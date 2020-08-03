import React, {useState} from 'react';
import CurrentWeatherForm from "../components/CurrentWeatherForm";
import CurrentWeatherData from "../components/CurrentWeatherData";

function Home() {

    const [weatherData, setWeatherData] = useState({})

    const getWeatherData = (data) => {
        setWeatherData(data)
    }

    return (
        <>
            <CurrentWeatherForm getWeatherData={getWeatherData} weatherData={weatherData}/>
            <CurrentWeatherData weatherData={weatherData}/>
        </>
    );
}

export default Home;