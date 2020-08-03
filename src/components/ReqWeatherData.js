import React, {useEffect, useState} from 'react';
import moment from 'moment'
import { Table, Tag, Button } from 'antd';
const { Column } = Table;

export default function ReqWeather(props){

    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(1)

    useEffect( ()=>{
        async function fetchData() {
            await fetch('/weather', {mode: "cors",})
                .then(response => response.json())
                .then(data => {
                    setData(data)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        fetchData()
    },[refresh])

    const handleRefresh = () =>{
        setRefresh(refresh + 1)
    }


    return (
        <div className='req-weather-container'>
            <Button type="primary" block className='refresh-btn' onClick={handleRefresh}>
                REFRESH
            </Button>
            <Table dataSource={data} rowKey={data => data._id}>
                <Column title="City Name" dataIndex="cityName" key="cityName" />
                <Column title="Country Name" dataIndex="countryName" key="countryName" />
                <Column title="Country Code" dataIndex="countryCode" key="countryCode" />
                <Column
                    title="Query Date"
                    dataIndex="queryDate"
                    key="queryDate"
                    defaultSortOrder='descend'
                    sorter={(a, b)=>{return new Date(a.queryDate) - new Date(b.queryDate) } }
                    render={queryDate => moment(queryDate).format('YYYY-MM-DD HH:mm:ss')}/>
                <Column
                    title="Request Result"
                    dataIndex="reqResult"
                    key="reqResult"
                    render={reqResult => (
                        <>
                            {
                                reqResult ?
                                    <Tag color="blue" key={reqResult.toString()}>
                                        {reqResult.toString()}
                                    </Tag>
                                    :
                                    <Tag color="warning" key={reqResult.toString()}>
                                        {reqResult.toString()}
                                    </Tag>
                            }
                        </>
                    )}
                />
            </Table>
        </div>

    )
}