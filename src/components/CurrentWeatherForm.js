import React, { useState } from 'react';
import { Form, Input, Button, AutoComplete, notification, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import handleSearchCountryCode from "../services/handleSearchCountryCode";


export default function CurrentWeatherForm(props){

    const [options, setOptions] = useState([]);
    const [countryCode, setCountryCode] = useState('')
    const weatherAPI = 'e35c4e28ff20ffd73523b89a41535bb3'

    const onFinish = async values => {
        let query = countryCode === '' ? values.cityName : values.cityName + ',' + countryCode
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${weatherAPI}`
        await fetch(url, { mode: "cors" })
            .then(response => {
                if(response.status !== 200){
                    message.error("Can not find this city!")
                    props.getWeatherData()
                }else{
                    return response.json()
                }
            })
            .then(data => {
                let country, reqResult = false
                if (typeof data !== 'undefined'){
                    let cityName = data.name
                    country = data.sys.country
                    let temperature = data.main.temp
                    let feels_like = data.main.feels_like
                    let humidity = data.main.humidity
                    let speed = data.wind.speed
                    let main = data.weather[0].main
                    let icon = data.weather[0].icon
                    let description = data.weather[0].description
                    const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
                    props.getWeatherData({cityName,temperature,main,icon_url,feels_like,humidity,speed,description,country})
                    reqResult = true
                    message.success('Query ' + cityName + ' success.')
                }else {}
                // save to mongoDB
                saveToMongoDB(values.cityName, country?country:'', countryCode, reqResult)

            })
            .catch(err => {
                console.log(err)
            })

    };

    const saveToMongoDB = async (cityName, country, countryCode, reqResult)=>{
        console.log(reqResult)
        if (reqResult){
            console.log('ttt')
        }
        await fetch('/weather', {
            mode: "cors",
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "cityName":cityName,
                "countryName":country,
                "countryCode":countryCode,
                "reqResult":reqResult
            })
        })
            .then(response => {
                if (response.status === 201 || response.status === 200){
                    message.success("Weather data have been stored in MongoDB")
                    return response.json()
                }else {
                    message.error("Weather data cannot be stored in MongoDB")
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const handleSearch = async value => {
        if(value === ''){
            value = 'A'
        }
        try {
            const countryInfo = await handleSearchCountryCode(value)
            if(typeof countryInfo.status === 'undefined'){
                let result
                if(typeof countryInfo === 'undefined'){
                    result = []
                }else{
                    result = countryInfo.map(item => ({
                        value: item.alpha2Code,
                        label: (
                            <div style={{display: 'flex',justifyContent: 'space-between',}}>
                                <span>{item.name} = {item.alpha2Code}</span>
                            </div>
                        )
                    }))
                }
                setOptions(result);
            }else{
                message.error('Cannot find this country!!')
            }
        }catch (e) {
            console.log(e)
        }

    };

    const onSelect = value => {
        setCountryCode(value)
        message.success("You have selected " + value)
    };

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Searching Tips',
            description: 'We recommend to search weather by the combination of city name and country. ' +
                'Searching only by city name may get unambiguous result for your city.'

        });
    };


    return (
        <div className='form-container'>

            <Button size="large" onClick={() => openNotificationWithIcon('info')}>Tips</Button>


            <AutoComplete
                className='autocomplete-input'
                dropdownMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input
                    size="large" className='country-name-input' placeholder="Country Name"  prefix={<SearchOutlined  className="site-form-item-icon"/>} />
            </AutoComplete>


            <Form className='city-name-form' name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item
                    name="cityName"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the city name!',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        prefix={<SearchOutlined  className="site-form-item-icon" />}
                        placeholder="City Name"
                        style={{
                            width: 300,
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                    >
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}