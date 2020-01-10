import React, { Suspense } from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() })
it('renders without crashing', async () => {

  let tree = renderer.create(

    <MockedProvider addTypename={false}>
      {/* <Suspense fallback="loading"> */}
        {/* <I18nextProvider i18n={i18n}> */}
          <App />
        {/* </I18nextProvider> */}
      {/* </Suspense> */}
    </MockedProvider>
    ).toJSON();


    // let tree = Enzyme.mount(
    //   // <I18nextProvider i18n={i18n}>
    //   <App />
    //   // </I18nextProvider>
    // )
  
  // })

  await renderer.act(async () => {
    await wait(0); // wait for response

  });

    
  console.log(tree);
  expect(tree).toMatchSnapshot();
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
