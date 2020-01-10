import React, { Suspense, lazy } from 'react';
// import SensorChart from './SensorChart';
import { withTranslation, Trans } from 'react-i18next';

export const SensorChart = lazy(() => import('./SensorChart'))
class MasterSensor extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data_type: "temperature",
            room: "",
            id4: true,
            id5: true,
            id6: true,
            id7: true,
        }
        this.changeToTemperature = this.changeToTemperature.bind(this);
        this.changeToHumidity = this.changeToHumidity.bind(this);

        this.changeToGrowRoom = this.changeToGrowRoom.bind(this);
        this.changeToHarvestRoom = this.changeToHarvestRoom.bind(this);
        this.changeToAllRooms = this.changeToAllRooms.bind(this);
        this.setAppropriateRoom = this.setAppropriateRoom.bind(this);

        this.toggleId4 = this.toggleId4.bind(this);
        this.toggleId5 = this.toggleId5.bind(this);
        this.toggleId6 = this.toggleId6.bind(this);
        this.toggleId7 = this.toggleId7.bind(this);
    }

    componentDidUpdate() {
        // If state changes elsewhere, we call this setAppropriateRoom to make sure we're still highlighting the appropriate "select room" button.
        this.setAppropriateRoom();
    }

    changeToTemperature() {
        this.setState({ data_type: "temperature" })
    }

    changeToHumidity() {
        this.setState({ data_type: "humidity" })
    }

    // the "change to room" methods do double-duty, both highlighting the appropriate button (by changing this.state.room) and displaying a chart that  
    changeToGrowRoom() {
        this.setState({ room: "Grow Room", id4: true, id5: true, id6: false, id7: false })
    }

    changeToHarvestRoom() {
        this.setState({ room: "Harvest Room", id4: false, id5: false, id6: true, id7: true })
    }

    changeToAllRooms() {
        this.setState({ room: "", id4: true, id5: true, id6: true, id7: true })
    }

    //in the following methods, we alter the state to reflect whether the user wants to see data from that sensor. 
    toggleId4() {
        this.setState({id4: !this.state.id4})
    }

    toggleId5() {

        this.setState({ id5: !this.state.id5 })
    }

    toggleId6() {

        this.setState({ id6: !this.state.id6 })
    }

    toggleId7() {

        this.setState({ id7: !this.state.id7 })
    }

    // this makes sure that, if the user has manually selected and deselected sensors, this.state.room, and thus the highlighted "Select Room" button, reflect the sensors they've chosen 
    setAppropriateRoom() {
        if ((this.state.id4 || this.state.id5) && (this.state.id6 || this.state.id7) && (this.state.room !== "")) {
            this.setState({room: ""})
        } else if ((this.state.id4 || this.state.id5) && !(this.state.id6 || this.state.id7) && (this.state.room !== "Grow Room")) {
            this.setState({room: "Grow Room"})
        } else if (!(this.state.id4 || this.state.id5) && (this.state.id6 || this.state.id7) && (this.state.room !== "Harvest Room")) {
            this.setState({room: "Harvest Room"})
        }
    }

    render() {
        const { t } = this.props;

        //to the ids array, we add the id of every sensor the user wants to display
        let ids = [];
        if (this.state.id4) { ids.push(4) }
        if (this.state.id5) { ids.push(5) }
        if (this.state.id6) { ids.push(6) }
        if (this.state.id7) { ids.push(7) }

        let data_type = this.state.data_type;
        // let val = t(data_type);
        return (
            //<React.Fragment>
            // <Suspense fallback="loolol">

            <div>
                <div id="button-container">
                    <div> Select data type:
                    </div>
                    <button id={this.state.data_type === "temperature" ? "button-selected" : "button"} onClick={this.changeToTemperature}>Temperature</button>
                    <button id={this.state.data_type === "humidity" ? "button-selected" : "button"} onClick={this.changeToHumidity}>Humidity</button>

                </div>

                {/* the user clicks these buttons to select data by room. These call methods that also change the "id" state elements to reflect the sensors present in that room choice. */}
                <div id="button-container">
                    {/* using the Trans component allows for translating complex interpolated and formatted strings in a single go */}
                    <Trans i18nKey="dataTypeDisplayed" >Displaying <strong > {{val: t(data_type)}} </strong>data for...</Trans><br></br>
                    <button id={this.state.room === "" ? "button-selected" : "button"} onClick={this.changeToAllRooms}>{t('rooms.both')}</button>
                    <button id={this.state.room === "Grow Room" ? "button-selected" : "button"} onClick={this.changeToGrowRoom}>{t('rooms.grow')}</button>
                    <button id={this.state.room === "Harvest Room" ? "button-selected" : "button"} onClick={this.changeToHarvestRoom}>{t('rooms.harvest')}</button>
                </div>

                {/* the user clicks these buttons to select/deselect sensors whose data they want displayed. */}
                <div id="button-container">
                    <button id={this.state.id4 === true ? "button-selected-multi" : "button"} onClick={this.toggleId4}>{t('sensor') + " 4"}</button>
                    <button id={this.state.id5 === true ? "button-selected-multi" : "button"} onClick={this.toggleId5}>{t('sensor') + " 5"}</button>
                    <button id={this.state.id6 === true ? "button-selected-multi" : "button"} onClick={this.toggleId6}>{t('sensor') + " 6"}</button>
                    <button id={this.state.id7 === true ? "button-selected-multi" : "button"} onClick={this.toggleId7}>{t('sensor') + " 7"}</button>

                </div>

                {/* Now, we can just pass in the ids of the sensors the user selected. */}
                    <SensorChart ids={ids} data_type={data_type}/>
                </div>
                // </Suspense>

            //</React.Fragment>
        )
    }
}

export default withTranslation()(MasterSensor);