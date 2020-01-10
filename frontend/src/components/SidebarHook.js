import React, { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function SidebarHook () {
        const { i18n } = useTranslation();
        const [wide, setWide] = useState(true);
        let open = true;
        console.log(i18next.language)


        function ChangeLanguage(lang) {
          i18n.changeLanguage(lang);
        }

        function collapseSidebar() {
            setWide(!wide);
        }

        return(
            <div className={open ? (wide ? "sidebar" : "sidebar-collapsed") : "sidebar-hidden" }>
                <div className = "button-holder"> 
                    <p></p>

                    <Button onClick={()=>collapseSidebar()} className="button-adjust">
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </div>

                <Button className={i18next.language === 'pt' ? "transButtonHighlighted" : "transButton"} onClick={()=>ChangeLanguage('pt')} > 
                    {wide ? "Portugues" : "PT"}
                </Button>

                <Button className={i18next.language === 'en' ? "transButtonHighlighted" : "transButton"} onClick={()=>ChangeLanguage('en')} > 
                    {wide ? "English" : "EN"}
                </Button>


                <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
                    <Nav.Item>
                        <Nav.Link href="/home"> {wide ? "Active" : "A"} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1"> {wide ? "Option 2" : "2"} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">
                        {wide ? "Option 3" : "3"}                        
                        </Nav.Link>
                    </Nav.Item>

                    <NavDropdown title={wide ? "Dropdown" : "D"} id="nav-dropdown">
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

export default SidebarHook;