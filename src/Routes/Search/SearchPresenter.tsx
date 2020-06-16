import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Section from "../../Components/Section";
import Poster from "../../Components/Poster";
import { useT } from "../../Translation/context";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 35px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  border-radius: 5px;
`;

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

interface ITV {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

interface IProps {
  movieResults: IMovie[];
  tvResults: ITV[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchPresenter: React.FC<IProps> = ({
  movieResults,
  tvResults,
  searchTerm,
  loading,
  error,
  handleSubmit,
  updateTerm,
}) => (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Input
        value={searchTerm}
        onChange={updateTerm}
        placeholder={useT()("Search Movies or TV Shows...")}
      />
    </Form>
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
          <title>Search | Kan's Movie</title>
        </Helmet>
        {movieResults.length > 0 && (
          <Section title="Movie Results" path="search">
            {movieResults.map((movie) => (
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
        {tvResults.length > 0 && (
          <Section title="TV Show Results" path="search">
            {tvResults.map((show) => (
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
      </>
    )}
    {error && <Message color="#e74c3c" text={error} />}
  </Container>
);

export default SearchPresenter;
