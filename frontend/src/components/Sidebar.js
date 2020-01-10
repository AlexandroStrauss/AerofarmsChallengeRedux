import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { withTranslation, useTranslation } from 'react-i18next';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            wide: true,
        }

        this.collapseSidebar = this.collapseSidebar.bind(this);
        // this.state.i18n = i18n;

    }

    collapseSidebar () {
        let wideness = this.state.wide;
        this.setState({ wide: !wideness });
    }

    hideSidebar () {
        let openness = this.state.open;
        this.setState({ open: !openness });
    }

  

    render () {
    
        return(
            <div className={this.state.open ? (this.state.wide ? "sidebar" : "sidebar-collapsed") : "sidebar-hidden" }>
                <div className = "button-holder"> 
                    <p></p>

                    <Button onClick={this.collapseSidebar} className="button-adjust">
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </div>



                <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
                    <Nav.Item>
                        <Nav.Link href="/home"> {this.state.wide ? "Active" : "A"} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1"> {this.state.wide ? "Option 2" : "2"} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">
                        {this.state.wide ? "Option 3" : "3"}                        
                        </Nav.Link>
                    </Nav.Item>

                    <NavDropdown title={this.state.wide ? "Dropdown" : "D"} id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            </div>
        )
    }


}

export default withTranslation()(Sidebar);