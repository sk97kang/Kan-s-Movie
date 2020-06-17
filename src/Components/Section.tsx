import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useT } from "../Translation/context";

const hover_scale = keyframes`
    from {
    transform: none;
    }
    to {
      transform: scale(1.2);
    }
`;

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
  position: relative;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Grid = styled.div<{ isFlex: boolean }>`
  margin-top: 10px;

  display: ${(props) => (props.isFlex ? "flex" : "grid")};
  overflow-x: auto;
  overflow-y: hidden;

  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;

  /* SCROLL */

  /* 스크롤바의 width */
  ::-webkit-scrollbar {
    width: 20px;
    height: 12px;
  }

  /* 스크롤바의 전체 배경색 */
  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  /* 스크롤바 색 */
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  /* 위 아래 버튼 (버튼 없애기를 함) */
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const MoreBtn = styled(Link)`
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(235, 235, 235, 0.1);
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  color: inherit;
  cursor: pointer;
  outline: none;

  &:hover {
    animation: ${hover_scale} 0.5s linear infinite alternate;
  }
`;

interface IProps {
  title: string;
  path?: string;
}

const Section: React.SFC<IProps> = ({ title, path, children }) => {
  const t = useT();
  return (
    <Container>
      <Title>{t(title)}</Title>
      <Grid isFlex={path ? true : false}>{children}</Grid>
      {path && path.includes("movie") && (
        <MoreBtn to={`/more/${path}`}>{t("More")}</MoreBtn>
      )}
    </Container>
  );
};

export default Section;
