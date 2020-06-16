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

interface ITV {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

interface IProps {
  topRated: ITV[];
  popular: ITV[];
  airingToday: ITV[];
  loading: boolean;
  error: string | null;
}

const TVPresenter: React.FC<IProps> = ({
  topRated,
  popular,
  airingToday,
  loading,
  error,
}) => (
  <>
    <Helmet>
      <title>TV | Kan's Movie</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated.length > 0 && (
          <Section title="Top Rated Shows" path="tv/topRated">
            {topRated.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={show.first_air_date}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular Shows" path="tv/popular">
            {popular.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={show.first_air_date}
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today" path="tv/airingToday">
            {airingToday.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={show.first_air_date}
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

export default TVPresenter;
