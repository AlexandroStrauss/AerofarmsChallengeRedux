import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// Make sure the query is also exported -- not just the component
export const GET_CAT_QUERY = gql`
  query getCat($name: String) {
    cat(name: $name) {
      id
      name
      color
    }
  }
`;

export function Cat({ name }) {
  const { loading, error, data } = useQuery(
    GET_CAT_QUERY,
    { variables: { name } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <p>
      {data.cat[0].name} is a {data.cat[0].color} cat
      {data.cat[1].name} is a {data.cat[1].color} cat

    </p>
  );
}
