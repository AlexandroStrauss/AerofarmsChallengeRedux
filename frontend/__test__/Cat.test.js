import React from 'react';

import { MockedProvider } from '@apollo/react-testing';
import 'regenerator-runtime/runtime';
import renderer from 'react-test-renderer';

import { GET_CAT_QUERY, Cat } from '../src/components/Cat';
const wait = require('waait');


it('should render cat', async () => {
  const catMock = {
    request: {
      query: GET_CAT_QUERY,
      variables: { name: 'Chloe' },
    },
    result: {
      data: { cat: [{ id: '1', name: 'Chloe', color: 'calico' }, { id: '2', name: 'Fufa', color: 'gray' }] },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[catMock]} addTypename={false}>
      <Cat name="Chloe" />
    </MockedProvider>,
  );

  await renderer.act(async () => {
    await wait(0); // wait for response

  });

  // console.log(component.root.findByType('p'))

  const p = component.root.findByType('p');
  expect(p.children.join("")).toContain('Chloe is a calico cat');
  expect(p.children.join("")).toContain('Fufa is a gray cat');
});

it('should match snapshot', async () => {
  const catMock = {
    request: {
      query: GET_CAT_QUERY,
      variables: { name: 'Chloe' },
    },
    result: {
      data: { cat: [{ id: '1', name: 'Chloe', color: 'calico' }, { id: '2', name: 'Fufa', color: 'gray' }] },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[catMock]} addTypename={false}>
      <Cat name="Chloe" />
    </MockedProvider>,
  );

  await renderer.act(async () => {
    await wait(0); // wait for response

  });

  let tree = component.toJSON();
  // console.log(tree);
  expect(tree).toMatchSnapshot();
})
