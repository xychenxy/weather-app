import React from 'react';
import { Card  } from 'antd';
import PropTypes from 'prop-types'

export default function CurrentWeatherData(props){
    const weatherData = props.weatherData
    const isEmptyObject = (obj) => {
        for(let n in obj){return false}
        return true
    }
    return (
        <div className='weatherInfo-container'>
            {
                !isEmptyObject(weatherData) ?
                    <Card className='card'
                          title={<div><p className='city'>{weatherData.cityName},{weatherData.country}</p><p>{weatherData.description}</p></div>}
                          extra={<img className='weather-img' src={weatherData.icon_url} alt=""/>} style={{ width: 500 }}>
                        <div className="card-content">
                            <div className="card-content-temperature">
                                {weatherData.temperature}℃
                            </div>
                            <div className="card-content-detail">


                                <table>
                                    <thead className='details-header'>
                                        <tr>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='details-name'>Feels like</td>
                                            <td>{weatherData.feels_like}℃</td>
                                        </tr>
                                        <tr>
                                            <td className='details-name'>Wind</td>
                                            <td>{weatherData.speed}m/s</td>
                                        </tr>
                                        <tr>
                                            <td className='details-name'>Humidity</td>
                                            <td>{weatherData.humidity}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            { new Date().toLocaleString()}
                        </div>
                    </Card>
                    :
                    <Card className='card' title={<div><p className='city'>No Data</p></div>}  style={{ width: 500 }}></Card>
            }

        </div>
    )
}

CurrentWeatherData.propTypes = {
    weatherData: PropTypes.object.isRequired
}