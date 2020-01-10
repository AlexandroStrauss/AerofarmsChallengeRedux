import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


// query GraphQL, with the array of sensor IDs whose data we want passed up
const SENSOR_QUERY = gql`
    query ($data_type: String!, $ids: [ID]!) {
        dataPointsByType(data_type: $data_type, ids: $ids) {
		    id
            date
        	value
        }
    }
`;

function SensorChart({ ids, data_type }) {
    const { t } = useTranslation();

    const { loading, error, data } = useQuery(SENSOR_QUERY, {
        variables: { ids: ids, data_type: data_type }
    });


    if (loading) return <p>{t('loading')}</p>;
    if (error) return <p>{t('error')}</p>;
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
            <YAxis label={{ value: data_type === "temperature" ? t("temperature") : t("humidity"), dx: -50 }} domain={[45, 85]}/> {/* I adjusted the range of the Y-axis to better suit the data. */}
            <Tooltip /> {/* The Tooltip functionality lets you mouse over the chart and see each data point. */}
            <Line type="monotone" dataKey="value" dot={false} stroke={data_type === "temperature" ? "#ff0000" : "#8884d8"} activeDot={{ r: 1 }} />{/* dot={false} keeps every data point from being displayed as a dot on the chart. Trust me, it's better this way.  */}
        </LineChart>
        </ResponsiveContainer>
    );
}

export default SensorChart;