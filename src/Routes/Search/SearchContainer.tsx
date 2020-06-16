import React from "react";

import SearchPresenter from "./SearchPresenter";
import { tvApi, moviesApi } from "../../api";

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

interface IState {
  movieResults: IMovie[];
  tvResults: ITV[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

export default class extends React.Component<{}, IState> {
  state: IState = {
    movieResults: [],
    tvResults: [],
    searchTerm: "",
    loading: false,
    error: null,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);

      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({ error: "Can't find results" });
    } finally {
      this.setState({ loading: false });
    }
  };

  updateTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    this.setState({ searchTerm: value });
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
