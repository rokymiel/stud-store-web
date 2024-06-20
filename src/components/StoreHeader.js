import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import hse_logo from "../pages/hse_logo.png";
import { store } from "../store";
import api from "../api";
import { logoutUser } from "../store/auth/actionCreators";

export const StoreHeader = () => {
  const location = useLocation();
  const isLoggedIn = !!store.getState().auth.authData.accessToken;

  const activeKey = location.pathname;

  const logout = () => {
    store.dispatch(logoutUser());
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
        // as={Link} to="/" eventKey="/"
        >
          <img
            alt=""
            src={hse_logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          ⏐ STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={activeKey}>
            <Nav.Link as={Link} to="/" eventKey="/">
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to="/store" eventKey="/store">
              Магазин
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Студентам"
              id="basic-nav-dropdown"
              className="d-flex"
            >
              <NavDropdown.Item as={Link} to="/console">
                Консоль разработчика
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {isLoggedIn ? (
                <Button onClick={(e) => logout()}>Выйти</Button>
              ) : (
                <NavDropdown.Item as={Link} to="/auth">
                  Войти
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
