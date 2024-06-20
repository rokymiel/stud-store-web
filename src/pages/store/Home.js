import React, { Component, useEffect, useState } from "react";
import { styled } from "styled-components";
import eximg from "../img-app-ex.png";
import hse_logo from "../hse_logo.png";
import landing_card from "./landing-flat-background.png";
import web_ex from "./web-ex.png";
import mobile_ex from "./mobile-ex.png";
import pc_ex from "./pc-ex.png";
import game_ex from "./game-ex.png";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api";
import { StoreHeader } from "../../components/StoreHeader";

const Home = () => {
  const [screenData, setScreenData] = useState(null);

  useEffect(() => {
    api.store
      .landingService()
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setScreenData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <StoreHeader />
      <Main>
        <LandingCard>
          <img src={landing_card} className="landingCardImg" />
          <LandingCardLogo>
            <img src={hse_logo} className="hseLogo" />
            <div className="title">HSE⸺STORE</div>
          </LandingCardLogo>
        </LandingCard>

        <AdaptiveContainer>
          <div className="projectRoles">
            <h2>Роль проектных работ студентов</h2>
            <p>
              Проектные работы являются важной частью образовательного процесса
              студентов. Они позволяют студентам применить свои знания на
              практике и разработать полноценные приложения. Проектные работы
              помогают студентам:
            </p>
            <ul>
              <li>Получить опыт работы в реальных условиях</li>
              <li>
                Разработать навыки командной работы и управления проектами
              </li>
              <li>
                Продемонстрировать свои таланты и потенциал потенциальным
                работодателям
              </li>
            </ul>
          </div>
        </AdaptiveContainer>

        <ProjectTypes>
          <AdaptiveContainer>
            <h2>Виды проектов</h2>
          </AdaptiveContainer>

          <Carousel className="typesCarousel" variant="dark" interval="5000">
            <Carousel.Item className="typesCarouselItem">
              <Ex>
                <h3>Web-приложения</h3>
                <img src={web_ex} className="projectImgTemplate" />
              </Ex>
            </Carousel.Item>
            <Carousel.Item className="typesCarouselItem">
              <Ex>
                <h3>Мобильные приложения</h3>
                <img src={mobile_ex} className="projectImgTemplate" />
              </Ex>
            </Carousel.Item>
            <Carousel.Item className="typesCarouselItem">
              <Ex>
                <h3>Десктопные приложения</h3>
                <img src={pc_ex} className="projectImgTemplate" />
              </Ex>
            </Carousel.Item>
            <Carousel.Item className="typesCarouselItem">
              <Ex>
                <h3>Игры</h3>
                <img src={game_ex} className="projectImgTemplate" />
              </Ex>
            </Carousel.Item>
          </Carousel>
        </ProjectTypes>

        {screenData ? (
          <section>
            <h2>Лучшие проекты студентов</h2>
            {screenData.bestProjects.map((app, _) => (
              <div class="project">
                <img
                  src={
                    app.project.icon
                      ? `http://localhost:8000/api/v1/project/image?imageId=${app.project.icon}&projectId=${app.project.id}`
                      : eximg
                  }
                />
                <h3>{app.project.fullName}</h3>
                <p>
                  Автор: {app.creator.firstName} {app.creator.lastName}
                </p>
                <p>Курс: {app.project.defenceYear}</p>
              </div>
            ))}

            {/* <div class="project">
              <img src={eximg} />
              <h3>Название проекта 1</h3>
              <p>Автор: Имя студента 1</p>
              <p>Курс: Название курса студента 1</p>
              <p>Отзыв от сотрудников факультета: Текст отзыва проекта 1</p>
            </div>

            <div class="project">
              <img src={eximg} />
              <h3>Название проекта 2</h3>
              <p>Автор: Имя студента 2</p>
              <p>Курс: Название курса студента 2</p>
              <p>Отзыв от сотрудников факультета: Текст отзыва проекта 2</p>
            </div>

            <div class="project">
              <img src={eximg} />
              <h3>Название проекта 3</h3>
              <p>Автор: Имя студента 3</p>
              <p>Курс: Название курса студента 3</p>
              <p>Отзыв от сотрудников факультета: Текст отзыва проекта 3</p>
            </div> */}
          </section>
        ) : (
          <></>
        )}
      </Main>
    </>
  );
};

export { Home };

const Ex = styled.div`
  /* background-color: #131; */
  display: flex;
  flex-direction: column;
`;

const LandingCard = styled.div`
  .landingCardImg {
    position: absolute;
    z-index: -1;

    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;

const LandingCardLogo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;

  justify-content: center;

  position: relative;
  z-index: 1;

  .hseLogo {
    height: 100pt;
    width: 100pt;
  }
  .title {
    padding: 20px;
    font-weight: 600;
    font-size: xx-large;
    background-color: white;
    border-radius: 20pt;
  }
  scroll-snap-align: start;
`;

const ProjectTypes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ededed;

  /* max-width: 70%; */
  align-self: center;
  width: 100%;
  height: 50vh;
  scroll-snap-align: start;

  .typesCarousel {
    width: 100%;
    height: 100%;
    flex-grow: 1;
  }
  .typesCarouselItem {
    padding-inline: 15vw;
    padding-top: 15pt;
    padding-bottom: 40pt;

    /* height: 35vh; */
    .projectImgTemplate {
      height: 22vh;
      width: auto;
      object-fit: contain; //contain;

      /* aspect-ratio: 16/9;  */

      /* object-fit: cover; */
      border-radius: 20px;
    }
  }
  /* @media screen and (max-width: 768px) {
    .typesCarouselItem {
      padding-inline: 15vw;
    }
  } */
  @media screen and (max-width: 768px) {
    height: 100vh;
    .typesCarouselItem {
      .projectImgTemplate {
        height: 60vh;
      }
    }
  }
`;

const AdaptiveContainer = styled.div`
  max-width: 70%;
  align-self: center;
  width: 100%;
  scroll-snap-align: start;
  margin-top: 10pt;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding-left: 20pt;
    padding-right: 20pt;
  }
`;

const Main = styled.div`
  /* Общие стили для мобильной и десктопной версий */

  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* align-self: stretch;
  align-items: stretch;
  align-content: center; */
  /* justify-content: stretch; */

  font-family: "Open Sans", sans-serif;
  margin: auto;
  padding: 0;
  /* align-self: center; */

  h3 {
    font-size: 24px;
    color: #333;
  }

  h2 {
    font-size: 32px;
    color: #333;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    color: #666;
  }

  /* Секция секции о важности проектных работ студентов */
  section:nth-child(odd) {
    background-color: #f9f9f9;
  }

  section {
    max-width: 70%;
    align-self: center;
    width: 100%;
    scroll-snap-align: start;
    margin-top: 10pt;
  }

  .projectRoles {
    min-height: 50vh;
    padding: 20pt;
    background-color: #1b3b72;

    display: flex;
    flex-direction: column;

    /* align-items: center; */
    justify-content: center;

    h2 {
      color: white;
    }

    p {
      color: white;
    }
    li {
      color: white;
    }
  }

  /* Секция секции о важности проектных работ студентов в мобильной версии */
  @media screen and (max-width: 768px) {
    /* max-width: 100%; */
    section {
      max-width: 100%;
      padding-left: 20pt;
      padding-right: 20pt;
    }
    section:nth-child(odd) {
      padding: 20px;
    }
    .projectRoles {
      height: 100vh;
    }
  }

  /* Секция с лучшими проектами студентов */
  .project {
    margin-top: 20pt;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 20pt;
  }

  .project img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  .project h3 {
    font-size: 18px;
    color: #333;
  }

  .project p {
    font-size: 14px;
    color: #666;
  }

  /* Адаптивная верстка для мобильной версии */
  @media screen and (max-width: 768px) {
    /* padding: 10px; */

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }

    .project {
      flex-direction: column;
      align-items: flex-start;
    }

    .project img {
      width: 80px;
      height: 80px;
      margin-right: 0;
      margin-bottom: 10px;
    }

    .project h3 {
      font-size: 16px;
    }

    .project p {
      font-size: 12px;
    }
  }
`;
