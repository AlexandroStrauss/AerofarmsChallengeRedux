import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer
} from 'recharts';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const HUMID_SENSOR_QUERY = gql`    
query ($data_type: String!, $ids: [ID]!) {
    dataPointsByType(data_type: $data_type, ids: $ids) {
        id
        date
        value
    }
}
`;

function HumidityBySensorChart({ ids }) {
    const { loading, error, data } = useQuery(HUMID_SENSOR_QUERY, {
        variables: { ids: ids, data_type: "humidity" }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <ResponsiveContainer width="100%" height={600} >

        <LineChart
            // width={700}
            // height={400}
            data={data.dataPointsByType}
            margin={{
                top: 5, right: 30, left: 80, bottom: 10,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: "time", dy: 15 }} />
            <YAxis label={{ value: "% humidity", dx: -50 }} domain={[40, 80]}/>
            <Tooltip />
            <Line type="monotone" dataKey="value" dot={false} stroke="#8884d8" activeDot={{ r: 1 }} />
        </LineChart>
        </ResponsiveContainer>
    );
}

export default HumidityBySensorChart;