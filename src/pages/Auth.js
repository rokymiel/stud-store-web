import React, { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { loginFailure, loginSucess } from "../store/auth/authReducer";

import { useSelector } from "react-redux";
import { FloatingLabel, Form, Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";

const Auth = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [register, setRegister] = useState({});

  const isLoggedIn = useSelector((state) => !!state.auth.authData.accessToken);

  const handleLoginSubmit = (e) => {
    api.auth
      .loginService(login, password)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(loginSucess(response.data.accessToken));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginFailure(error.message));
      });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log(register);
    api.auth
      .registerService(
        register.email,
        register.password,
        register.firstName,
        register.lastName,
        register.fatherName,
        register.eduYear,
        register.eduProgram
      )
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        api.auth
          .loginService(register.email, register.password)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            dispatch(loginSucess(response.data.accessToken));
          })
          .catch(function (error) {
            console.log(error);
            dispatch(loginFailure(error.message));
          });
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginFailure(error.message));
      });
  };

  const hah = () => {
    // api.auth.refreshToken()
    api.auth
      .logout()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Main>
      {/* <topEmpty /> */}
      <Card>
        <Tabs
          defaultActiveKey="login_tab"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="login_tab" title="Войти">
            <div>
              <FloatingLabel label="Логин (почта)" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel label="Пароль">
                <Form.Control
                  type="password"
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <LoginButton onClick={handleLoginSubmit}>Войти</LoginButton>
            </div>
          </Tab>

          {/* Регистрация */}

          <Tab eventKey="register_tab" title="Зарегистрироваться">
            <Form onSubmit={handleRegisterSubmit}>
              <FloatingLabel label="Имя">
                <Form.Control
                  size="m"
                  type="text"
                  placeholder="Название"
                  onChange={(e) => {
                    var r = register;
                    r.firstName = e.target.value;
                    setRegister(r);
                  }}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Фамилия">
                <Form.Control
                  size="m"
                  type="text"
                  placeholder="Название"
                  onChange={(e) => {
                    var r = register;
                    r.lastName = e.target.value;
                    setRegister(r);
                  }}
                  required
                />
              </FloatingLabel>

              <FloatingLabel label="Отчество">
                <Form.Control
                  size="m"
                  type="text"
                  placeholder="Название"
                  onChange={(e) => {
                    var r = register;
                    r.fatherName = e.target.value;
                    setRegister(r);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel label="Образовательная программа">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    var r = register;
                    r.eduProgram = e.target.value;
                    setRegister(r);
                  }}
                  required
                >
                  <option selected disabled value="">
                    -- Выберите название ОП --
                  </option>
                  <option value="ПИ ФКН">ПИ ФКН</option>
                  <option value="ПМИ ФКН">ПМИ ФКН</option>
                  <option value="КНАД ФКН">КНАД ФКН</option>
                  <option value="ДРИП ФКН">ДРИП ФКН</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel label="Год зачисления">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    var r = register;
                    r.eduYear = e.target.value;
                    setRegister(r);
                  }}
                  required
                >
                  <option selected disabled value="">
                    -- Выберите год зачисления --
                  </option>
                  {Array.from(
                    { length: new Date().getFullYear() - 2014 },
                    (_, index) => 2014 + index
                  ).map((value, _) => (
                    <option value={value}>{value}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel label="Почта">
                <Form.Control
                  size="m"
                  type="text"
                  placeholder="Название"
                  onChange={(e) => {
                    var r = register;
                    r.email = e.target.value;
                    setRegister(r);
                  }}
                  required
                />
              </FloatingLabel>

              <FloatingLabel label="Пароль">
                <Form.Control
                  type="password"
                  placeholder="*******"
                  onChange={(e) => {
                    var r = register;
                    r.password = e.target.value;
                    setRegister(r);
                  }}
                />
              </FloatingLabel>
              <LoginButton>Зарегистрироваться</LoginButton>
            </Form>
          </Tab>
        </Tabs>
      </Card>
      {/* <bottomEmpty/> */}
    </Main>
  );
};

export { Auth };

const Main = styled.div`
  display: flex;

  font-family: "Open Sans", sans-serif;

  height: 100vh;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 768px) {
  }
`;

const Card = styled.div`
  width: 300pt;
  box-shadow: 0px 5px 10px 2px #d6d6d6;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: auto;

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;

const LoginButton = styled.button`
  background-color: #2196f3; /* Синий цвет фона */
  color: #ffffff; /* Белый цвет текста */
  border-radius: 8px; /* Скругление углов */
  padding: 10px 20px; /* Внутренние отступы */
  border: none; /* Удаление границы */
  cursor: pointer; /* Изменение курсора при наведении */
  transition: transform 0.2s ease;
  margin-top: 10pt;
  width: 100%;

  align-self: start;
  justify-self: end;

  &:hover {
    background-color: #1976d2;
  }
  &:active {
    transform: scale(0.95); /* Уменьшение размера кнопки при нажатии */
  }
`;
