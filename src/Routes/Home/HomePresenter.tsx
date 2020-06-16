import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Poster from "../../Components/Poster";
import Message from "../../Components/Message";

const Container = styled.div`
  padding: 20px;
`;

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

interface IProps {
  nowPlaying: IMovie[];
  upcoming: IMovie[];
  popular: IMovie[];
  error: string | null;
  loading: boolean;
}

const HomePresenter: React.FC<IProps> = ({
  nowPlaying,
  upcoming,
  popular,
  error,
  loading,
}) => (
  <>
    <Helmet>
      <title>Movie | Kan's Movie</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {nowPlaying.length > 0 && (
          <Section title="Now Playing" path="movie/nowPlaying">
            {nowPlaying.map((movie) => (
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
        {upcoming.length > 0 && (
          <Section title="Upcomig Playing" path="movie/upcoming">
            {upcoming.map((movie) => (
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
        {popular.length > 0 && (
          <Section title="Popular Playing" path="movie/popular">
            {popular.map((movie) => (
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
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

export default HomePresenter;
