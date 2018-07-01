import React, { Component } from 'react';
import {
    Collapse,
    Form,
    Button,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom';

class NavbarBoot extends Component {

    constructor(props) {
        super(props)
    
        this.toggle = this.toggle.bind(this)
        this.state = {
          isOpen: false
        }
      }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem('token')
        this.props.buttonLogout.push({ pathname: '/' })
    }

    render() {
        const token = localStorage.getItem('token')
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link to="/home" className="navbar-brand">SobatNetizen</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {
                            token ?
                            <Nav navbar>
                                <NavItem>
                                    <Link to="/detail" className="nav-link">Detail Page</Link>
                                </NavItem>
                            </Nav>
                            :
                            <Nav navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link">Login</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/register" className="nav-link">Register</Link>
                                </NavItem>
                            </Nav>
                        }
                        <Nav className="ml-auto" navbar>
                            {
                                token ?
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Users
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Link to="/profile" className="nav-link">Profile</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink onClick={ this.handleLogout }>Log Out</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                :
                                ''
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavbarBoot;