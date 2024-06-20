import React, { Component, useEffect, useState } from "react";
import { styled } from "styled-components";
import eximg from "../img-app-ex.png";
import { Carousel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoMdSearch } from "react-icons/io";
import Offcanvas from "react-bootstrap/Offcanvas";

import SearchLine from "../../components/SearchLine";
import api from "../../api";
import { useNavigate } from "react-router";
import {StoreHeader} from "../../components/StoreHeader";
// import "bootstrap/dist/css/bootstrap.min.css";

const Store = () => {
  const filters = [
    "Все приложения",
    "Web-проекты",
    "Android-приложения",
    "Игры",
  ];

  const filtersMaper = {
    "Все приложения": null,
    "Web-проекты": "Web-приложение",
    "Android-приложения": "Android-приложение",
    "Desktop-приложение": "Desktop-приложение",
    Игры: "Игра",
  };
  const navigate = useNavigate();

  // const [searchOverlay, setSearchOverlay] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);

  const [screenData, setScreenData] = useState(null);

  useEffect(() => {
    api.store
      .mainStoreService()
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setScreenData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleFilterSelect(index) {
    setActiveFilter(index);
  }

  function handleClickedApp(id) {
    navigate("/project/" + id);
  }

  function filteredApps() {
    if (!screenData) {
      return [];
    }
    const filter = filtersMaper[filters[activeFilter]];
    if (filter) {
      return screenData.allApps.filter((value) => {
        return value.groupName === filter;
      });
    } else {
      return screenData.allApps;
    }
  }

  const apps = filteredApps();
  const collectionGroupSize = 4,
    groupedArray = () =>
      Array.from(
        {
          length: Math.ceil(screenData.collection.length / collectionGroupSize),
        },
        (_, i) =>
          screenData.collection.slice(
            i * collectionGroupSize,
            i * collectionGroupSize + collectionGroupSize
          )
      );

  return (
    <>
    <StoreHeader/>
    <Main>
      <SearchLine />
      <h1>Рекомендации</h1>
      <Carousel
        className="recomendationCarousel"
        variant="dark"
        interval="5000"
      >
        {screenData ? (
          groupedArray().map((value, _) => (
            <Carousel.Item className="recomendationCarouselItem">
              <AppsList className="appRecomendation">
                {value.map((cell, _) => (
                  <AppCell onClick={(e) => handleClickedApp(cell.id)}>
                    <img
                      src={
                        cell.icon
                          ? `http://localhost:8000/api/v1/project/image?imageId=${cell.icon}&projectId=${cell.id}`
                          : eximg
                      }
                      className="app-icon"
                    />
                    <appname>{cell.shortName}</appname>
                  </AppCell>
                ))}
                {value.length <= collectionGroupSize / 2 ? (
                  Array.from({
                    length: collectionGroupSize - value.length,
                  }).map((_, index) => <EmptyAppCell />)
                ) : (
                  <></>
                )}
              </AppsList>
            </Carousel.Item>
          ))
        ) : (
          <></>
        )}
        {/* <Carousel.Item className="recomendationCarouselItem">
          <AppsList className="appRecomendation">
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
          </AppsList>
        </Carousel.Item>
        <Carousel.Item className="recomendationCarouselItem">
          <AppsList className="appRecomendation">
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
            <AppCell>
              <img src={eximg} className="app-icon" />
              <appname>Smart App asd as da as da sda asd </appname>
            </AppCell>
          </AppsList>
        </Carousel.Item> */}
      </Carousel>
      <h1>Все приложения</h1>
      <AppsFilters>
        <ul>
          {filters.map(
            (filter, index) => (
              <li
                class={index === activeFilter ? "active" : null}
                onClick={() => handleFilterSelect(index)}
              >
                {filter}{" "}
              </li>
            )
          )}
        </ul>
      </AppsFilters>
      <AppsList className="allApps">
        {screenData ? (
          apps.length > 0 ? (
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
            <>Приложений пока нет</>
          )
        ) : (
          <>Приложений пока нет</>
        )}
      </AppsList>
    </Main>
    </>
  );
};

export { Store };

const Main = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  margin: auto;
  padding: 0;

  h1 {
    max-width: 70%;
    align-self: center;
    width: 100%;
  }

  .recomendationCarousel {
  }
  .recomendationCarouselItem {
    padding-inline: 10vw;
    padding-bottom: 40pt;
  }

  .appRecomendation {
    grid-template-columns: 1fr 1fr;
  }
  .allApps {
    max-width: 70%;
    align-self: center;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    h1 {
      max-width: 100%;
    }
    .allApps {
      max-width: 100%;
    }

    .appRecomendation {
      grid-template-columns: 1fr;
    }
  }
`;

const AppsFilters = styled.div`
  max-width: 70%;
  align-self: center;
  width: 100%;
  ul {
    /* width: max-content; */
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-inline-start: 0px;
  }
  li {
    list-style: none;
    padding-inline: 10pt;
    background-color: #e0e0e0;
    border-radius: 6pt;
    transition: 0.2s ease;
    margin-right: 10pt;
    margin-bottom: 10pt;
  }

  li.active {
    background-color: #adc6ff;
  }
  li:hover {
    opacity: 0.6;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const AppsList = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr; */

  grid-template-columns: repeat(auto-fit, minmax(250pt, 1fr));

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150pt, 1fr));
  }
`;

const EmptyAppCell = styled.div`
  height: 100pt;

  @media screen and (max-width: 768px) {
    height: 80pt;
  }
`;

const AppCell = styled.div`
  display: flex;
  height: 100pt;
  max-width: 300pt;
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
