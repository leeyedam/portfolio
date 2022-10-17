import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import styled from "styled-components";
import Header from "../components/common/Header";
import Main from "../components/Main/Main";
import Chat from "../components/common/Chat";
import MobileMenu from "../components/common/MobileMenu";
import LiveScorePage from "../pages/LiveScorePage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HighlightPage from "../pages/HighlightPage";
import LivePage from "../pages/LivePage";
import HighlightVideo from "../components/highlight/HighlightVideo";
import AssurancePage from "./AssurancePage";
import AssuranceWrite from "../components/assurance/AssuranceWrite";
import SportsBroadcast from "./SportsBroadcast";
import NoticePage from "./NoticePage";
import NoticeDetail from "../components/notice/NoticeDetail";
import NoticeWrite from "../components/notice/NoticeWrite";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import PageNotFond from "../components/test/PageNotFond";
import ServiceInspection from "../components/test/ServiceInspection";
import SystemDelay from "../components/test/SystemDelay.jsx";
// import LiveScoreSoccer from "../components/score/LiveScoreSoccer";

const Wrapper = styled.div`
  display: flex;
  height: fit-content;
  overflow-y: auto;
`;

const MainWrapper = styled.div`
  flex: 1 0;
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;
  @media (max-width: 1100px) {
    overflow-x: hidden;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const ModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100000,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

const ModalContainer = styled.div`
  width: 400px;
  height: 486px;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    width: calc((585.6 / 720) * 100vw);
    height: calc((711.5 / 1280) * 100vh);
  }
`;

const ModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 452px;
  background-image: url("/images/common/event-modal.png");
  background-size: cover;
  position: relative;

  @media (max-width: 720px) {
    width: calc((585.6 / 720) * 100vw);
    height: calc((652.6 / 1280) * 100vh);
  }

  &::before {
    content: "";
    background-color: #000;
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.7;
  }
  .title {
    position: relative;
    font-family: "S-CoreDream-5Medium";
    font-size: 35px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.88px;
    text-align: center;
    color: #fff;
    width: 275px;
    height: 78px;
    margin-bottom: 26px;

    @media (max-width: 720px) {
      width: calc((420 / 720) * 100vw);
      height: calc((114 / 1280) * 100vh);
      font-size: calc((52.5 / 720) * 100vw);
    }
  }
  .subtitle {
    position: relative;

    width: 210px;
    height: 43px;
    /* font-family: "S-CoreDream-5Medium"; */
    font-size: 16px;
    font-weight: lighter;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #fff;
    @media (max-width: 720px) {
      width: calc((301 / 720) * 100vw);
      height: calc((64 / 1280) * 100vh);
      font-size: calc((23.5 / 720) * 100vw);
    }
  }
  button {
    position: relative;
    width: 321px;
    height: 50px;
    margin: 38px 7px 33px 0;
    border-radius: 6px;
    background-color: #19793a;

    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #fff;

    @media (max-width: 720px) {
      width: calc((491 / 720) * 100vw);
      height: calc((81 / 1280) * 100vh);
      font-size: calc((28 / 720) * 100vw);
      margin: calc((56 / 1280) * 100vh) 0 calc((41 / 1280) * 100vh) 0;
    }
  }

  ul {
    position: relative;
    font-size: 13px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.39px;
    text-align: left;
    color: #fff;
    li {
      list-style: disc;
    }

    @media (max-width: 720px) {
      font-size: calc((20.5 / 720) * 100vw);
    }
  }
`;

const ModalLogoContainer = styled.div`
  * {
    position: relative;
  }
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 27px;
  margin-top: 22px;
  margin-bottom: 60px;
  padding: 0 23px;

  img {
    width: 131px;
  }
  .close {
    color: #fff;
    cursor: pointer;
  }

  @media (max-width: 720px) {
    width: 100%;
    height: calc((41 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    margin-bottom: calc((90 / 1280) * 100vh);
    img {
      width: calc((192 / 720) * 100vw);
    }
  }
`;

const ModalBottomContainer = styled.div`
  display: flex;
  padding-left: 10px;
  align-items: center;
  height: 34px;
  opacity: 0.9;
  background-color: #000000;

  p {
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.38px;
    text-align: left;
    color: #fff;
    margin-left: 6px;
  }
`;

const CheckBoxOn = styled.div`
  background-image: url("/images/popup/Check.png");
  background-size: contain;
  width: 16px;
  height: 16px;
  @media (max-width: 720px) {
    width: calc((34 / 720) * 100vw);
    height: calc((34 / 720) * 100vw);
  }
`;

const CheckBoxOff = styled.div`
  width: 16px;
  height: 16px;
  border: 1.5px solid #fff;
  border-radius: 3px;

  @media (max-width: 720px) {
    width: calc((34 / 720) * 100vw);
    height: calc((34 / 720) * 100vw);
  }
`;

const MainPage = ({ setRankingModal, setLogin, setSignup }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openChat, setOpenChat] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [pathname, setPathname] = useState();
  const [headerPosition, setHeaderPosition] = useState(false);
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  // 라이브 이동
  const [sportsType, setSportsType] = useState("soccer");

  useEffect(() => {
    setModal(true);
  }, []);

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    setPathname(window?.location?.pathname);
    setFullScreen(false);
    if (
      window?.location?.pathname === "/highlight/video" ||
      window?.location?.pathname === "/live/soccer" ||
      window?.location?.pathname === "/live/basketball" ||
      window?.location?.pathname === "/live/baseball" ||
      window?.location?.pathname === "/live/volleyball" ||
      window?.location?.pathname === "/live/tennis"
    ) {
      setHeaderPosition(true);
    } else {
      setHeaderPosition(false);
    }
  }, [location]);

  

  return (
    <Wrapper>
      <Sidebar
        fullScreen={fullScreen}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        sportsType={sportsType}
        setSportsType={setSportsType}
      />
      {mobileMenu ? (
        <MobileMenu
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        ></MobileMenu>
      ) : (
        <MainWrapper openSidebar={openSidebar}>
          <Header
            openSidebar={openSidebar}
            setRankingModal={setRankingModal}
            setLogin={setLogin}
            setSignup={setSignup}
            setOpenChat={setOpenChat}
            openChat={openChat}
            headerPosition={headerPosition}
            fullScreen={fullScreen}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
              }
            />
            <Route
              path="/score"
              element={
                <LiveScorePage
                  sportsType={sportsType} 
                  setSportsType={setSportsType}
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></LiveScorePage>
              }
            />

            <Route
              path="/highlight"
              element={
                <HighlightPage
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></HighlightPage>
              }
            />
            <Route
              path="/highlight/video"
              element={
                <HighlightVideo
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></HighlightVideo>
              }
            />
            <Route
              path="/assurance"
              element={
                <AssurancePage
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></AssurancePage>
              }
            />
            <Route
              path="/AssurancePage/write"
              element={<AssuranceWrite></AssuranceWrite>}
            />
            <Route
              path="/live/*"
              element={
                <LivePage
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                  pathname={pathname}
                  fullScreen={fullScreen}
                  setFullScreen={setFullScreen}
                ></LivePage>
              }
            />
            <Route
              path="/broadcast"
              element={
                <SportsBroadcast
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></SportsBroadcast>
              }
            />
            <Route
              exact
              path="/notice"
              element={
                <NoticePage
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></NoticePage>
              }
            />
            <Route
              exact
              path="/notice/:id"
              element={
                <NoticeDetail
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></NoticeDetail>
              }
            />
            <Route
              exact
              path="/notice/write"
              element={
                <NoticeWrite
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></NoticeWrite>
              }
            />
            <Route
              path="/pageNotFound"
              element={
                <PageNotFond
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></PageNotFond>
              }
            />
            <Route
              path="/serviceInspection"
              element={
                <ServiceInspection
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></ServiceInspection>
              }
            />
            <Route
              path="/systemDelay"
              element={
                <SystemDelay
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></SystemDelay>
              }
            />
            <Route
              path="/systemDelay"
              element={
                <SystemDelay
                  setMobileMenu={setMobileMenu}
                  mobileMenu={mobileMenu}
                ></SystemDelay>
              }
            />
          </Routes>
        </MainWrapper>
      )}
      {openChat && <Chat />}
      <Modal
        isOpen={modal}
        style={ModalStyle}
        onRequestClose={() => setModal(false)}
      >
        <ModalContainer>
          <ModalImageContainer>
            <ModalLogoContainer>
              <img src="/images/main/MainLogo.png" alt=""></img>
              <AiOutlineClose
                className="close"
                size={24}
                onClick={() => setModal(false)}
              ></AiOutlineClose>
            </ModalLogoContainer>
            <span className="title">스포시티 모바일앱 출시기념이벤트</span>
            <span className="subtitle">
              스포시트 모바일앱을 다운받고 푸짐한 선물을 받아가세요!
            </span>
            <button>자세히 보기</button>
            <ul>
              <li>트위터, 페이스북, 텔레그램 등을 통해서도 확인가능합니다</li>
              <li>유사 사기사이트에 주의 하시길 바랍니다</li>
            </ul>
          </ModalImageContainer>
          <ModalBottomContainer>
            {modalCheck ? (
              <CheckBoxOn onClick={() => setModalCheck(false)} />
            ) : (
              <CheckBoxOff onClick={() => setModalCheck(true)} />
            )}
            <p>7일간 보지 않기</p>
          </ModalBottomContainer>
        </ModalContainer>
      </Modal>
    </Wrapper>
  );
};

export default MainPage;
