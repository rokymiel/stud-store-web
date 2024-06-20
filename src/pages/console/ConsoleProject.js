import React, { Component, createRef, useEffect, useState } from "react";
import { styled } from "styled-components";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack } from "react-bootstrap";
import eximg from "./img-app-ex.png";
import { CiSaveUp1 } from "react-icons/ci";
import { getProjectService } from "../../api/console";
import { useParams } from "react-router";
import api from "../../api";

// export default class ConsoleProject extends Component {
const ConsoleProject = () => {
  const { id } = useParams();
  const [shortName, setShortName] = useState("");
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [defenceYear, setDefenceYear] = useState("");
  const [groupName, setGroupName] = useState("");
  const [mentor, setMentor] = useState("");

  const [workBinary, setWorkBinary] = useState("");
  const [binaryUploadFile, setBinaryUploadFile] = useState({});

  const [icon, setIcon] = useState("");
  const [iconUploadFile, setIconUploadFile] = useState({});
  const [images, setImages] = useState([]);
  const [imageUploadFile, setImageUploadFile] = useState({});

  const link = createRef();

  useEffect(() => {
    getProjectService(id)
      .then(function (response) {
        const project = response.data;
        console.log(JSON.stringify(project));
        setShortName(project.shortName);
        setFullName(project.fullName);
        setDescription(project.description);
        setDefenceYear(project.defenceYear);
        setGroupName(project.shortName);
        setWorkBinary(project.workBinary);
        setIcon(project.icon);
        setImages(project.photos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleUploadIcon = () => {
    if (iconUploadFile.length == 0) {
      return;
    }

    api.console
      .uploadIconService(id, iconUploadFile[0])
      .then(function (response) {
        setIcon(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUploadPreviewImage = () => {
    if (setImageUploadFile.length == 0) {
      return;
    }

    api.console
      .uploadPreviewService(id, imageUploadFile[0])
      .then(function (response) {
        var im = images ? images : [];
        im.push(response.data);
        setImages(im);
        setImageUploadFile("");
        console.log("type", im);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUploadFile = () => {
    if (binaryUploadFile.length == 0) {
      return;
    }

    api.console
      .uploadBinaryService(id, binaryUploadFile[0])
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setWorkBinary(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDownload = () => {
    if (workBinary) {
      // api.console.downloadBinary(workBinary)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      window
        .open(
          "http://localhost:8000/api/v1/project/binary/" + workBinary,
          "_blank"
        )
        .focus();

      // var myHeaders = new Headers();
      // myHeaders.append(
      //   "Authorization",
      //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTc5Mzk0NTAsImVtYWlsIjoibWlzaGEtc3R1ZGVudEBtYWlsLnJ1IiwiYXV0aG9yaXRpZXMiOiJST0xFX1NUVURFTlQiLCJpZCI6NTJ9.bzP24z6FANXGUWAnt3gtzrGTg7DnhRdfqLJ28CYPPuM"
      // );

      // var requestOptions = {
      //   method: "GET",
      //   headers: myHeaders,
      //   redirect: "follow",
      // };

      // fetch("http://localhost:8000/api/v1/project/binary/"+workBinary, requestOptions)
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     console.log(blob)
      //     const href = window.URL.createObjectURL(blob)
      //     console.log(href)
      //     // link.current.href = href

      //     // link.current.click()
      //   })
      //   .catch((error) => console.log("error", error));
    }
  };

  const updateInfo = () => {
    api.console.updateProject(id, shortName, description)
    console.log(description);
  };

  return (
    <Main>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Название"
        value={shortName}
        onChange={(e) => setShortName(e.target.value)}
      />
      <Form.Control
        size="sm"
        type="text"
        placeholder="Полное название темы"
        value={fullName}
        readOnly
        disabled
      />
      <br />
      <Form.Select
        aria-label="Default select example"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        readOnly
        disabled
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
        value={defenceYear}
        onChange={(e) => setDefenceYear(e.target.value)}
        readOnly
        disabled
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

      <h2>Иконка</h2>
      <Stack direction="horizontal">
        {icon ? (
          <img
            src={`http://localhost:8000/api/v1/project/image?imageId=${icon}&projectId=${id}`}
            width="100"
            height="100"
            className="app-icon"
          />
        ) : (
          <></>
        )}

        <ImagePickerWrapper>
          <Stack direction="horizontal">
            {/* <Form.Group controlId="formFileSm" className="mb-3"> */}
            {/* <Form.Label>Small file input example</Form.Label> */}
            <Form.Control
              type="file"
              size="sm"
              accept=".jpg"
              onChange={(e) => setIconUploadFile(e.target.files)}
            />
            {/* </Form.Group> */}
            <ImageRefreshButton onClick={handleUploadIcon}>
              <CiSaveUp1 className="image" />
            </ImageRefreshButton>
          </Stack>
        </ImagePickerWrapper>
      </Stack>

      <h2>Фотографии</h2>
      <Photos>
        {images ? (
          images.map((image, _) => (
            <img
              src={`http://localhost:8000/api/v1/project/image?imageId=${image}&projectId=${id}`}
              className="photo-element"
            />
          ))
        ) : (
          <></>
        )}

        <ImagePickerWrapper className="picker-wrapper">
          <stack direction="horizontal">
            <Form.Control
              type="file"
              size="sm"
              accept=".jpg"
              onChange={(e) => setImageUploadFile(e.target.files)}
            />
            <ImageRefreshButton onClick={handleUploadPreviewImage}>
              <CiSaveUp1 className="image" />
            </ImageRefreshButton>
          </stack>
        </ImagePickerWrapper>
      </Photos>

      <Form.Control
        type="text"
        placeholder="Описание"
        as="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br></br>
      <ImagePickerWrapper className="picker-wrapper">
        <div>
          {workBinary ? (
            <stack direction="horizontal">
              <div>Сборка</div>
              <DownloadButton className="p-2 ms-auto" onClick={handleDownload}>
                Скачать
              </DownloadButton>
            </stack>
          ) : (
            <div>Нет сборки</div>
          )}

          <br />
          <stack direction="horizontal">
            <Form.Control
              type="file"
              size="sm"
              accept="*"
              onChange={(e) => setBinaryUploadFile(e.target.files)}
            />
            <ImageRefreshButton onClick={handleUploadFile}>
              <CiSaveUp1 className="image" />
            </ImageRefreshButton>
          </stack>
        </div>
      </ImagePickerWrapper>
      <br />
      <SaveButton onClick={(e) => updateInfo()}>Сохранить изменения</SaveButton>
    </Main>
  );
};

export { ConsoleProject };

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

const ImagePickerWrapper = styled.div`
  box-shadow: 0px 5px 10px 2px #d6d6d6;
  border-radius: 6pt;
  padding: 20pt;
  align-content: center;

  stack {
    display: flex;
    align-content: center;
    height: 100%;
    align-items: center;
  }
`;

const ImageRefreshButton = styled.button`
  align-self: center;
  width: fit-content;
  height: fit-content;
  border: 1px solid #f2f2f2;
  border-radius: 6pt;
  background-color: lightblue;

  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; */

  .image {
    color: white;
    width: 20pt;
    height: 20pt;
  }

  &:hover {
    background-color: #ebebeb;
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
  & .picker-wrapper {
    width: fit-content;
    flex-shrink: 0;
    margin: 10pt;
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
