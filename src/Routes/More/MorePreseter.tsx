import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

interface IProps {
  title: string;
  result: any[];
  loading: boolean;
  error: string | null;
}

const MorePresenter: React.FC<IProps> = ({ title, result, loading, error }) => (
  <>
    {loading ? (
      <>
        <Helmet>
          <title>Loading... | Kan's Movie</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <>
        <Helmet>
          <title>{title} | Kan's Movie</title>
        </Helmet>
        <Container>
          {result && result.length > 0 && (
            <Section title={title}>
              {result.map((movie) => (
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
        </Container>
      </>
    )}
  </>
);

export default MorePresenter;
