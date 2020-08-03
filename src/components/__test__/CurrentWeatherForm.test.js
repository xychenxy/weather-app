import React from "react";
import {shallow} from 'enzyme'

import checkPropTypes from 'check-prop-types'
import CurrentWeatherForm from "../CurrentWeatherForm";

const setUp = (props={}) =>{
    const component = shallow(<CurrentWeatherForm {...props}/>)
    return component
}

jest.mock('../../services/handleSearchCountryCode')

describe('CurrentWeatherForm Component layout', function () {
    let component;
    beforeEach(()=>{
        const props = {
            getWeatherData : function () {
                
            }
        }
        component = setUp(props)
    })

    it('should have a city name input', function () {
        const wrapper = component.find('.city-name-form')
        expect(wrapper.length).toBe(1)
    });


});

describe('Checking proptypes', function () {
    it('should not throw a warning', function () {
        const expectedProps = {
            getWeatherData : function () {

            }
        }
        const propsErr = checkPropTypes(CurrentWeatherForm.propTypes, expectedProps,'props',CurrentWeatherForm.name)
        expect(propsErr).toBeUndefined()
    });
})

describe('', ()=>{
    let component;
    beforeEach(()=>{
        const props = {
            getWeatherData : function () {

            }
        }
        component = setUp(props)
    })

    it('should load weather data on mount', function () {
        component.find('.autocomplete-input').simulate('onSelect', {
            value:'Australia'
        })
        expect(component.find('.autocomplete-input').prop('value')).toEqual(undefined)
    });
})

describe('Mocking fetch', function () {
    let component;
    beforeEach(()=>{
        const props = {
            getWeatherData : function () {

            }
        }
        component = setUp(props)

    })
    it('should load weather data on mount', function (done) {
        setTimeout(()=>{
            component.update()
            expect(component.find("#rc_select_0").length).toEqual(0)
            done()
        })
    });
})