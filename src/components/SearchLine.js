import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoMdSearch } from "react-icons/io";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import eximg from "../pages/img-app-ex.png";
import api from "../api";
import { useNavigate } from "react-router";

function SearchLine() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [searchResult, setSearchResult] = useState(null);

  const searchQueryChanged = (query) => {
    console.log("query", query);
    if (query) {
      api.store
        .searchService(query)
        .then((response) => {
          setSearchResult(response.data);
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResult(null);
    }
  };

  function handleClickedApp(id) {
    navigate("/project/" + id);
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button> */}
      <SearchFieldButton onClick={handleShow}>
        <IoMdSearch />
        <searchTitle> Поиск </searchTitle>
      </SearchFieldButton>
      <Offcanvas
        bsPrefix="offcanvas offcanvas-top h-auto"
        data-bs-scroll="false"
        show={show}
        onHide={handleClose}
        // placement="top"
        scroll="false"
      >
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Body>
            <SearchField>
              <Form.Control
                className="searchField"
                type="text"
                placeholder="Поиск"
                onChange={(e) => searchQueryChanged(e.target.value)}
              />
              <Button>
                <IoMdSearch />
              </Button>
            </SearchField>
            {searchResult ? (
              searchResult.length > 0 ? (
                searchResult.map((value, _) => (
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
                <div>Ничего не найдено</div>
              )
            ) : (
              <div>Начните искать</div>
            )}
          </Body>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchLine;

const Main = styled.div``;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  margin: auto;
  padding: 0;
  /* background-color: red; */
  max-width: 50%;
  /* height:100%; */

  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`;

const SearchFieldButton = styled.button`
  max-width: 70%;
  align-self: center;
  width: 100%;
  margin-top: 40pt;
  margin-bottom: 20pt;
  border: 1px solid #f2f2f2;
  border-radius: 6pt;
  background-color: #f2f2f2;
  padding-top: 4pt;
  padding-bottom: 4pt;

  display: flex;
  flex-direction: row;
  align-items: center;

  searchTitle {
    margin-left: 4pt;
  }

  &:hover {
    background-color: #ebebeb;
  }

  @media screen and (max-width: 768px) {
    max-width: 90%;
    margin-top: 10pt;
  }
`;

const SearchField = styled.div`
  align-self: center;
  width: 100%;
  margin-top: 60pt;
  margin-bottom: 20pt;
  display: flex;
  flex-direction: row;

  .searchField {
    margin-right: 7pt;
  }
`;

const AppCell = styled.div`
  display: flex;
  height: 100pt;
  max-width: 100%;
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
