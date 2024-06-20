import React, { Component, useEffect, useState } from "react";
import { styled } from "styled-components";
import eximg from "./img-app-ex.png";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import api from "../../api";

const ConsoleHome = () => {
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.console
      .myProjectsService()
      .then((response) => {
        setApps(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSubmit(e) {
    navigate("/console/project/new");
  }

  function handleClickedApp(id) {
    navigate("/console/project/"+id);
  }

  return (
    <Main>
      <h1>Ваши проекты</h1>
      <AppsList className="appRecomendation">
        <PlusButton onClick={handleSubmit}>
          <buttonTitle>Добавить проект</buttonTitle>
          <FaPlus />
        </PlusButton>

        {apps ? (
          apps.map((value, _) => (
            <AppCell onClick={(e) => handleClickedApp(value.id)}>
              <img
                src={
                  value.icon
                    ? `http://localhost:8000/api/v1/project/image?imageId=${value.icon}&projectId=${value.id}`
                    : eximg
                }
                className="app-icon"
              />
              <appname>{value.shortName}</appname>
            </AppCell>
          ))
        ) : (
          <></>
        )}
      </AppsList>
    </Main>
  );
};

export { ConsoleHome };

const Main = styled.div`
  .plusButton {
  }

  padding-left: 15%;
  padding-right: 15%;

  @media screen and (max-width: 768px) {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const PlusButton = styled.button`
  max-width: 50%;
  align-self: center;
  width: 100%;
  border: 1px solid #f2f2f2;
  border-radius: 6pt;
  background-color: #f2f2f2;
  padding-top: 4pt;
  padding-bottom: 4pt;

  margin-top: 10pt;
  margin-bottom: 10pt;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  buttonTitle {
    margin-right: 10pt;
  }

  &:hover {
    background-color: #ebebeb;
  }

  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`;

const AppsList = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  flex-direction: column;
`;

const AppCell = styled.div`
  display: flex;
  height: 100pt;
  /* max-width: 300pt; */
  transition: 0.2s ease;
  padding: 10pt;
  border-radius: 10pt;

  .app-icon {
    width: 80pt;
    height: 80pt;
    border-radius: 10px;
  }

  appname {
    font-size: 26px;
    font-weight: 600;
    flex-grow: 1;
    align-self: center;
    max-height: 80pt;

    padding-left: 10pt;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &:hover {
    background-color: #d9d9d9;
  }

  @media screen and (max-width: 768px) {
    height: 80pt;
    max-width: 300pt;

    .app-icon {
      width: 60pt;
      height: 60pt;
    }

    appname {
      font-size: 20px;
    }
  }
`;
