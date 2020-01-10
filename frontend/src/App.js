import React, { Suspense } from 'react';
import MasterSensor from './components/MasterSensorChart';
import SidebarHook from './components/SidebarHook';

function App() {
  // const { i18n } = useTranslation();

  // function ChangeLanguage(lang) {
  //   i18n.changeLanguage(lang);
  // }


  return (
    // <Suspense fallback="spinner">
      <div className="main-container">

      {/* <NavBar /> */}
      <Suspense fallback = "loading"> 
        <SidebarHook />
      </Suspense>

      {/* <Button className="transButton" onClick={()=>ChangeLanguage('pt')} > 
          Portugues
      </Button>

      <Button className="transButton" onClick={()=>ChangeLanguage('en')} > 
          English
      </Button>
 */}
        {/* <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}

        {/* I've wrapped both chart components in larger "Master" components. This makes it easier to manage the button inputs I want to have.
        The buttons affect the variables passed into the query in the chart components, and thus what is displayed on the chart. 
        Having them adjust state in a higher-order component makes it easier to control what's passed down to the chart and its query at any point.
        
        Since the two "Master" and the two chart components are functionally very similar, I've included further comments only in the "Temperature" version of each.
        */}
        {/* <div id="component-container">

        <div id="graph-title">Temperature By Room</div>
            <MasterTemperatureBySensor />
        </div>

        <div id="component-container">

        <div id="graph-title">Humidity By Room</div>
            <MasterHumidityBySensor />
        </div> */}

        <div id="component-container">
          <Suspense fallback="loading">
          <MasterSensor />
          </Suspense>
        </div>

      </div>
    // </Suspense>
  );
}

export default App;
