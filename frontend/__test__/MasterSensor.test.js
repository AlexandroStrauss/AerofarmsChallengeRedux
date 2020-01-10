import React, { Suspense, lazy } from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import 'regenerator-runtime/runtime';

import toJson from 'enzyme-to-json';
// import MasterSensor from '../src/components/MasterSensorChart';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import SensorChart from '../src/components/SensorChart';
const MasterSensor = lazy(() => import('../src/components/MasterSensorChart'))

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    translate: () => Component => props => <Component t={() => ''} {...props} />,
  }));
  
function createNodeMock() {
    const doc = document.implementation.createHTMLDocument();
    return { parentElement: doc.body };
  }
  
const wait = require('waait');
// import 'core-js/stable';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../src/components/SensorChart', () => 'SensorChart');

// afterEach(cleanup);

describe('Rendering SensorChart', () => {
    it('should render SensorChart component', () => {

        const tree = Enzyme.mount(
            <Suspense fallback="ugh we still doing this huh">
                <MasterSensor />
                </Suspense>
        );

        // await renderer.act(async () => {
        //     await wait(0); // wait for response
        // }); 

        expect(tree.contains("data type")).toBe(true);

        // expect(toJson(tree)).toMatchSnapshot();
    })


    it('should render appropriate things', async () => {
        const options = {createNodeMock}

        // let component;
        const component = renderer.create(
            <Suspense fallback="looolol">

                <MockedProvider addTypename={false}>
                {/* // <I18nextProvider i18n={i18n}> */}
                    <MasterSensor />
                {/* // </I18nextProvider> */}
                </MockedProvider >
                </Suspense>, options
            );

        await renderer.act(async () => {
            await wait(0); // wait for response
        }); 

        // console.log(component); 

        const tree = component.root.toJSON();

        // console.log(tree);

        //this doesn't feel right; feels waaaaay too specific to find a specific string in the page
        expect(tree.children[1].children[0].children.join('')).toContain('Displaying temperature data for...')

    })

    it('should change to humidity display when you hit the button', async () => {
        const options = {createNodeMock}

        // renderer.act(() => {
        const component = renderer.create(
                <MockedProvider addTypename={false}>
                    <Suspense fallback="loading">
                        <I18nextProvider i18n={i18n}>


                    <MasterSensor />
                    </I18nextProvider>
                    </Suspense>
                </MockedProvider >, options
            );
        // })

        await renderer.act(async () => {
            await wait(0); // wait for response

        });


        // THIS WORKS! This finds the right button, clicks it, waits for state to change, then checks for updated state
        const root = component.root;

        // console.log(root);

        const button = root.findAllByType('button')[1];

        button.props.onClick();

        await renderer.act(async () => {
            await wait(0); // wait for response

        });


        const tree = component.toJSON();
        expect(tree.children[1].children[0].children.join('')).toContain('Displaying humidity data for...')

    })
})

it('should work', async () => {
    const options = {createNodeMock}
    console.log(MasterSensor.WrappedComponent);
    const tree = renderer.create(
        // <Suspense fallback={<div>Loading</div>}>
        <MasterSensor />
        // </Suspense>, options
    );

    // await import('../src/components/SensorChart');

    await renderer.act(async () => {
        await wait(0); // wait for response
    });

    // await wait(0);
    // await tree.getInstance().loadingPromise;

    console.log(tree.toJSON());
    expect(true).toBe(true); 
})