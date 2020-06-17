import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Videos from "../../Components/Videos";
import Section from "../../Components/Section";
import Poster from "../../Components/Poster";
import Propfile from "../../Components/Profile";

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
  padding: 5px;
  width: 70%;
  margin-left: 10px;
  overflow-y: auto;
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

const VerticalDivider = styled.div`
  margin: 30px 0px;
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

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
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

            {result.credits.crew && result.credits.crew.length > 0 && (
              <Section title="Crew" path="crew">
                {result.credits.crew.map((credit: any) => (
                  <Propfile
                    key={credit.crew_id}
                    id={credit.crew_id}
                    name={credit.name}
                    part={credit.department}
                    imageUrl={credit.profile_path}
                  />
                ))}
              </Section>
            )}

            {result.credits.cast && result.credits.cast.length > 0 && (
              <Section title="Cast" path="cast">
                {result.credits.cast.map((credit: any) => (
                  <Propfile
                    key={credit.cast_id}
                    id={credit.cast_id}
                    name={credit.name}
                    part={credit.character}
                    imageUrl={credit.profile_path}
                  />
                ))}
              </Section>
            )}

            <Videos videos={result.videos.results} />
            <VerticalDivider />

            {result.similar && result.similar.results.length > 0 && (
              <Section title="Similar Movie" path="similar">
                {result.similar.results.map((movie: IMovie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}

            {result.recommendations &&
              result.recommendations.results.length > 0 && (
                <Section title="Recommended Movie" path="recommendations">
                  {result.recommendations.results.map((movie: IMovie) => (
                    <Poster
                      key={movie.id}
                      id={movie.id}
                      imageUrl={movie.poster_path}
                      title={movie.title}
                      rating={movie.vote_average}
                      year={movie.release_date}
                      isMovie={true}
                    />
                  ))}
                </Section>
              )}
          </Data>
        </Content>
      </Container>
    </>
  );

export default DetailPresenter;
