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

function GraphQLMock({ ids, data_type }) {
    const { t } = useTranslation();

    const { loading, error, data } = useQuery(SENSOR_QUERY, {
        variables: { ids: ids, data_type: data_type }
    });

    if (loading) return <p>{t('loading')}</p>;
    if (error) return <p>{t('error')}</p>;
    return (
        <div>
            <ul>
                {Object.values(data.dataPointsByType).map(dataPoint => {
                    return(
                    <li>
                        <p>{dataPoint.value}</p>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default GraphQLMock;