import React, { Component, useEffect, useState } from "react";
import { styled } from "styled-components";
import eximg from "../img-app-ex.png";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useParams } from 'react-router-dom'
import { useParams } from "react-router-dom";
import api from "../../api";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const Project = () => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    api.store
      .projectInfoService(id)
      .then(function (response) {
        console.log(response.data);
        setProjectInfo(response.data);
        return response.data.creatorId;
      })
      .then((id) => {
        api.store
          .userInfoService(id)
          .then(function (response) {
            console.log(response.data);
            setUserInfo(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDownload = () => {
    if (projectInfo.workBinary) {
      // api.console.downloadBinary(workBinary)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      window
        .open(
          "http://localhost:8000/api/v1/project/binary/" +
            projectInfo.workBinary,
          "_blank"
        )
        .focus();
    }
  };

  return (
    <>
      {projectInfo ? (
        <Container>
          <div className="content">
            <AppHeader>
              <img
                src={
                  projectInfo.icon
                    ? `http://localhost:8000/api/v1/project/image?imageId=${projectInfo.icon}&projectId=${id}`
                    : eximg
                }
                width="100"
                height="100"
                className="app-icon"
              />
              <appname>{projectInfo.shortName}</appname>
              {projectInfo.workBinary ? (
                <button
                  class="download-button"
                  onClick={() => handleDownload()}
                >
                  Скачать
                </button>
              ) : (
                <></>
              )}
            </AppHeader>

            <Photos>
              {projectInfo.photos ? (
                projectInfo.photos.map((image, _) => (
                  <img
                    src={`http://localhost:8000/api/v1/project/image?imageId=${image}&projectId=${id}`}
                    className="photo-element"
                  />
                ))
              ) : (
                <></>
              )}
            </Photos>

            <Description>
              <h1>Описание</h1>
              <a>{projectInfo.description}</a>
            </Description>

            {userInfo ? (
              <Developer>
                <h1>Разработчик</h1>
                <developer-card>
                  {/* <img src={eximg} className="dev-photo" /> */}
                  <div className="dev-name">
                    {userInfo.firstName} {userInfo.lastName}
                  </div>
                  <div className="dev-desc">
                    Студент: 2 курса {userInfo.eduProgram}
                  </div>
                </developer-card>
              </Developer>
            ) : (
              <></>
            )}
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export { Project };

const Container = styled.div`
  /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  display: grid;
  grid-template-columns: minmax(10pt, 1fr) minmax(100px, 800px) minmax(
      10pt,
      1fr
    );

  .content {
    grid-column: 2 / 3;
  }

  font-family: "Open Sans", sans-serif;
  margin-bottom: 100px;

  h1 {
    padding-top: 20pt;
  }
`;

const AppHeader = styled.div`
  display: grid;
  /* grid-template-rows: auto 1fr; Установка автоматической высоты первой строки и равной доли второй строки */
  /* grid-template-columns: 1fr; Установка равной доли столбца */
  /* gap: 10px; Промежуток между элементами */

  grid: auto-flow dense / 3fr 1fr 1fr;
  justify-content: center;

  & .app-icon {
    border-radius: 10px;
  }

  appname {
    font-size: 26px;
    font-weight: 600;

    grid-row: 2 / 2;
    grid-column: 1 / 2; /* Занимать все колонки */
    align-self: end;
  }

  & .download-button {
    grid-row: 2 / 2;
    grid-column: 3 / 3; /* Занимать все колонки */

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
  }
`;

const Photos = styled.div`
  overflow-x: auto; /* Включение горизонтальной прокрутки */
  white-space: nowrap; /* Отключение переноса элементов на новую строку */
  width: 100%; /* Ширина контейнера (может быть изменена в зависимости от вашей разметки) */
  gap: 10px;
  display: flex;
  padding-top: 20pt;

  & .photo-element {
    height: 250pt;
    width: 150pt;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Description = styled.div``;

const Developer = styled.div`
  developer-card {
    /* display: grid;
    grid-template-columns: 100px minmax(max-content, 1fr);
    grid-template-rows: auto auto;
    column-gap: 20px; */

    box-shadow: 0px 5px 10px 2px #d6d6d6;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .dev-photo {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .dev-name {
    /* align-self: self-end; */
    justify-self: start;
    font-size: 30px;
  }
`;
