import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// query GraphQL, with the array of sensor IDs whose data we want passed up
export const TEMP_SENSOR_QUERY = gql`
    query ($data_type: String!, $ids: [ID]!) {
        dataPointsByType(data_type: $data_type, ids: $ids) {
		    id
            date
        	value
        }
    }
`;

export function TemperatureBySensorChart({ ids }) {
    const { loading, error, data } = useQuery(TEMP_SENSOR_QUERY, {
        variables: { ids: ids, data_type: "temperature" }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;
    return (

        // Recharts does the heavy lifting of creating the chart.
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
            <YAxis label={{ value: "temperature (F)", dx: -50 }} domain={[45, 85]}/> {/* I adjusted the range of the Y-axis to better suit the data. */}
            <Tooltip /> {/* The Tooltip functionality lets you mouse over the chart and see each data point. */}
            <Line type="monotone" dataKey="value" dot={false} stroke="#ff0000" activeDot={{ r: 1 }} />{/* dot={false} keeps every data point from being displayed as a dot on the chart. Trust me, it's better without it.  */}
        </LineChart>
        </ResponsiveContainer>
    );
}

// export default TemperatureBySensorChart;