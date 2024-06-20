import React, { Component, useEffect, useState } from "react";
import { styled } from "styled-components";
import eximg from "./img-app-ex.png";
import { FaPlus } from "react-icons/fa";
import { Stack, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api";
import { useNavigate } from "react-router";

const AdminMain = () => {
  const [screenData, setScreenData] = useState(null);
  const navigate = useNavigate();

  const statusName = {
    NEW: "Скрыто",
    PRIVATE: "Приватная зона",
    PUBLIC: "Публичная зона",
  };

  const statusAction = {
    NEW: "Скрыть",
    PRIVATE: "Показать в приватной",
    PUBLIC: "Показать в публичной",
  };

  const statusAvalableActions = {
    NEW: ["PRIVATE"],
    PRIVATE: ["NEW", "PUBLIC"],
    PUBLIC: ["PRIVATE"],
  };

  useEffect(() => {
    api.admin
      .allProjectsService()
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setScreenData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onStatusChangeClick = (event, project, index, newStatus) => {
    api.admin
      .statusUpdateService(project.id, newStatus)
      .then(function (response) {
        var data = screenData;
        data[index].project.status = newStatus;
        setScreenData(data);
        window.location.reload();
      });
  };

  const onProjectClicked = (project) => {
    navigate("/project/"+project.id);
  }

  return (
    <Main>
      {/* <h1>Ваши проекты</h1>
        <AppsList className="appRecomendation">


          <ProjectCell>
            <Stack direction="horizontal">
              <img src={eximg} className="app-icon" />
              <Stack>
                <appname>Smart App asd as da as da sda asd </appname>
                <projectDescription>
                  Smart App asd as da as da sda asdasa asdas
                </projectDescription>
              </Stack>
            </Stack>
            <author>Кузнецов Михаил Александрович</author>
          </ProjectCell>
        </AppsList> */}
      <Table striped responsive className="main-table" hover>
        <thead>
          <tr>
            <th className="col-name">Название</th>
            <th className="col-fio">Фио Студента</th>
            <th className="col-type">Тип проекта</th>
            <th className="col-course">Курс</th>
            <th className="col-status">Статус</th>
          </tr>
        </thead>
        <tbody>
          {screenData ? (
            screenData.map((data, index) => (
              <tr onClick={(e) => onProjectClicked(data.project)}>
                <td>{data.project.fullName}</td>
                <td>
                  {data.creator.firstName} {data.creator.lastName}
                </td>
                <td>{data.project.groupName}</td>
                <td>
                  {data.creator.eduProgram}{" "}
                  {data.project.defenceYear - data.creator.eduYear} курс
                </td>
                <td>
                  <Stack gap={2}>
                    <StatusLabel className={data.project.status + "_STYLE"}>
                      {statusName[data.project.status]}
                    </StatusLabel>
                    <Stack direction="horizontal" gap={2}>
                      {statusAvalableActions[data.project.status].map(
                        (value, _) => (
                          <StatusButton 
                            onClick={(e) =>
                              onStatusChangeClick(e, data.project, index, value)
                            }
                          >
                            {statusAction[value]}
                          </StatusButton>
                        )
                      )}
                    </Stack>
                  </Stack>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
          {/* {Array.from({ length: 12 }).map((_, index) => (

          ))} */}
        </tbody>
      </Table>
    </Main>
  );
};

export { AdminMain };

const StatusLabel = styled.div`
  font-size: small;
  padding: 4pt;
  background-color: gray;
  border-radius: 4pt;
  color: white;
  text-align: center;

  &.PRIVATE_STYLE {
    background-color: blue;
  }

  &.PUBLIC_STYLE {
    background-color: green;
  }
`;

const Main = styled.div`
  .StatusLabel-hidden {
    background-color: gray;
  }
  .StatusLabel-close-pub {
    background-color: blue;
  }
  .StatusLabel-public {
    background-color: green;
  }
  .StatusLabel-negative {
    background-color: red;
  }
  .main-table {
    width: 100%;
    min-width: 600pt;
  }

  .col-name {
    /* max-width: 30vw; */
    width: 30%;
  }
  .col-fio {
    width: 30%;
  }
  .col-type {
    width: 20%;
  }
  .col-course {
    width: 10%;
  }
  .col-status {
    width: 10%;
  }

  .col-td-name {
    /* max-width: 10vw; */
  }
`;

const AppsList = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  flex-direction: column;
`;

const ProjectCell = styled.div`
  display: flex;
  flex-direction: row;

  .app-icon {
    width: 60pt;
    height: 60pt;
    border-radius: 10px;
  }

  projectDescription {
    padding-left: 10pt;
  }

  appname {
    font-size: 26px;
    font-weight: 600;
    flex-grow: 1;
    align-self: self-start;
    max-height: 80pt;

    padding-left: 10pt;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  author {
    padding-left: 10pt;
    font-size: 20px;
    font-weight: 600;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    author {
      padding-left: 0pt;
      padding-top: 10pt;
    }

    appname {
      font-size: 20px;
    }
  }
`;

const DownloadButton = styled.button`
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

const StatusButton = styled.button`
  background-color: #e6e6e6; /* Синий цвет фона */

  border-radius: 8px; /* Скругление углов */
  padding: 10px 20px; /* Внутренние отступы */
  border: none; /* Удаление границы */
  cursor: pointer; /* Изменение курсора при наведении */
  transition: transform 0.2s ease;
  width: fit-content;
  white-space: nowrap;

  align-self: start;
  justify-self: end;

  &:hover {
    background-color: #c9c9c9;
  }
  &:active {
    transform: scale(0.95); /* Уменьшение размера кнопки при нажатии */
  }
`;
