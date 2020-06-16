import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

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

export default withRouter(({ location: { pathname }, history: { goBack } }) => (
  <Header>
    <List>
      <BackBtn
        onClick={() => {
          if (pathname !== "/") goBack();
        }}
        title="뒤로가기"
      >
        ◀
      </BackBtn>
      <Item current={pathname === "/"}>
        <SLink to="/">Movie</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
