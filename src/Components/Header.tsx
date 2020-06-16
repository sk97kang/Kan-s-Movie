import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useSetLang, useT, useLang } from "../Translation/context";
import { changeLanguage } from "../api";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgb(20, 20, 20, 20);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
  width: 100%;
`;

const Item = styled.li<{ current: boolean }>`
  width: 80px;
  height: 50px;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.button`
  width: 30px;
  font-size: 18px;
  background-color: inherit;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
`;

const TransBtn = styled.button`
  width: 80px;
  font-size: 18px;
  background-color: inherit;
  color: white;
  border: none;
  outline: none;
  font-size: 12px;
  cursor: pointer;
  margin-left: auto;
`;

export default withRouter(
  ({ location: { pathname }, history: { goBack, push } }) => {
    const t = useT();
    const setLang = useSetLang();
    const lang = useLang();
    return (
      <Header>
        <List>
          <BackBtn
            onClick={() => {
              if (pathname !== "/") goBack();
            }}
            title={t("Back")}
          >
            ◀
          </BackBtn>
          <Item current={pathname === "/"}>
            <SLink to="/">{t("Movie")}</SLink>
          </Item>
          <Item current={pathname === "/tv"}>
            <SLink to="/tv">{t("TV")}</SLink>
          </Item>
          <Item current={pathname === "/search"}>
            <SLink to="/search">{t("Search")}</SLink>
          </Item>
          <TransBtn
            onClick={() => {
              if (lang === "en-US") {
                setLang("ko-KR");
                changeLanguage("ko-KR");
              } else {
                setLang("en-US");
                changeLanguage("en-US");
              }
              push("/*");
            }}
          >
            {t("한국어")}
          </TransBtn>
        </List>
      </Header>
    );
  }
);
