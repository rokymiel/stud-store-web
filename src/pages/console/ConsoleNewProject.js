import React, { Component, useState } from "react";
import { styled } from "styled-components";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { newProjectService } from "../../api/console";

const ConsoleNewProject = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const [shortName, setShortName] = useState("");
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [defenceYear, setDefenceYear] = useState("");
  const [groupName, setGroupName] = useState("");
  const [mentor, setMentor] = useState("");

  // function handleSubmit(e) {
  //   // navigate("/console/project/123");

  //   console.log(shortName, description, groupName, defenceYear);

  //   // newProjectService()
  // }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    var isValid = true;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      isValid = false;
    }

    setValidated(true);

    if (!isValid) {
      return;
    }

    event.preventDefault();

    newProjectService(
      shortName,
      fullName,
      description,
      defenceYear,
      groupName,
      ""
    )
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/console/project/"+response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Main>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Новый проект</h1>
        <p>Для создания проекта заполните обязательные поля</p>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Название"
          onChange={(e) => setShortName(e.target.value)}
          required
        />
        <Form.Control
          size="sm"
          type="text"
          placeholder="Полное название темы"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Описание"
          as="textarea"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setGroupName(e.target.value)}
          required
        >
          <option selected disabled value="">
            -- Выберите вид проекта --
          </option>
          <option value="Android-приложение">Android-приложение</option>
          <option value="Web-приложение">Web-приложение</option>
          <option value="Desktop-приложение">Desktop-приложение</option>
          <option value="Игра">Игра</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setDefenceYear(e.target.value)}
          required
        >
          <option selected disabled value="">
            -- Выберите год защиты проекта --
          </option>
          {Array.from(
            { length: new Date().getFullYear() - 2014 + 1 },
            (_, index) => 2014 + index
          ).map((value, _) => (
            <option value={value}>{value}</option>
          ))}
        </Form.Select>
        <br />
        <SaveButton>Создать проект</SaveButton>
      </Form>
    </Main>
  );
};

export { ConsoleNewProject };

const Main = styled.div`
  .app-icon {
    margin-right: 10pt;
  }

  padding-left: 15%;
  padding-right: 15%;

  @media screen and (max-width: 768px) {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const SaveButton = styled.button`
  background-color: #2196f3; /* Синий цвет фона */
  color: #ffffff; /* Белый цвет текста */
  border-radius: 8px; /* Скругление углов */
  padding: 10px 20px; /* Внутренние отступы */
  border: none; /* Удаление границы */
  cursor: pointer; /* Изменение курсора при наведении */
  transition: transform 0.2s ease;

  align-self: start;
  justify-self: end;

  &:hover {
    background-color: #1976d2;
  }
  &:active {
    transform: scale(0.95); /* Уменьшение размера кнопки при нажатии */
  }
`;
