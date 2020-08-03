import React from "react";
import CurrentWeatherData from "../CurrentWeatherData";
import {shallow} from 'enzyme'
import checkPropTypes from 'check-prop-types'

const setUp = (props={}) =>{
    const component = shallow(<CurrentWeatherData {...props}/>)
    return component
}

describe('CurrentWeatherData Component layout', function () {
    let component;
    beforeEach(()=>{
        const props = {
            weatherData : {}
        }
        component = setUp(props)
    })

    it('should render without crashing', function () {
        const wrapper = component.find('.weatherInfo-container')
        expect(wrapper.length).toBe(1)
    });
    it('should render one card', function () {
        const wrapper = component.find('.card')
        expect(wrapper.length).toBe(1)
    });
});

describe('Render with Data', function () {

    describe('Have props with data', function () {
        let component;
        beforeEach(()=>{
            const props = {
                weatherData : {
                    'cityName':'Melbourne',
                    'country':'Australia',
                    'description':'sunny',
                    'icon_url':'http://openweathermap.org/img/wn/10d@2x.png',
                    'temperature':27,
                    'feels_like':30,
                    'speed':20,
                    'humidity':50
                }
            }
            component = setUp(props)
        })

        it('should render with card-content', function () {
            const wrapper = component.find('.card-content')
            expect(wrapper.length).toBe(1)
        });
        it('should render with card-footer', function () {
            const wrapper = component.find('.card-footer')
            expect(wrapper.length).toBe(1)
        });
    })

    describe('Have props with empty data', function () {
        let component;
        beforeEach(()=>{
            const props = {
                weatherData : {}
            }
            component = setUp(props)
        })

        it('should render without card-content', function () {
            const wrapper = component.find('.card-content')
            expect(wrapper.length).toBe(0)
        });
        it('should render without card-footer', function () {
            const wrapper = component.find('.card-footer')
            expect(wrapper.length).toBe(0)
        });
    })
})

describe('Checking proptypes', function () {
    it('should not throw a warning', function () {
        const expectedProps = {
            weatherData: {}
        }
        const propsErr = checkPropTypes(CurrentWeatherData.propTypes, expectedProps,'props',CurrentWeatherData.name)
        expect(propsErr).toBeUndefined()
    });
})
