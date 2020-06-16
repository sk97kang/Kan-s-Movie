import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Videos from "../../Components/Videos";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  @media screen and (max-width: 880px) {
    padding: 20px;
  }
`;

const Backdrop = styled.div<{ bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div<{ bgImage?: string }>`
  width: 300px;
  height: 450px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  @media screen and (max-width: 880px) {
    display: none;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
  @media screen and (max-width: 880px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Item = styled.span`
  font-size: 14px;
`;

const Divider = styled.span`
  margin: 0 10px;
  font-size: 6px;
`;

const Overview = styled.div`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
  margin-bottom: 20px;
`;

interface IProps {
  result: any;
  error: string | null;
  loading: boolean;
}

const DetailPresenter: React.FC<IProps> = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading... | Kan's Movie</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Kan's Movie</title>
      </Helmet>
      <Container>
        <Backdrop
          bgImage={
            result.backdrop_path
              ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
              : result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <Title>{result.title ? result.title : result.name}</Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date
                  : result.first_air_date
                  ? result.first_air_date
                  : "?"}
              </Item>
              <Divider>●</Divider>
              <Item>
                {result.runtime
                  ? result.runtime
                  : result.episode_run_time
                  ? result.episode_run_time[0]
                  : "?"}{" "}
                min
              </Item>
              <Divider>●</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre: any, index: number) =>
                    index === result.genres?.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <Videos videos={result.videos.results} />
          </Data>
        </Content>
      </Container>
    </>
  );

export default DetailPresenter;
