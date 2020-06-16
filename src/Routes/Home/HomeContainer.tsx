import React from "react";

import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

interface IState {
  nowPlaying: IMovie[];
  upcoming: IMovie[];
  popular: IMovie[];
  error: string | null;
  loading: boolean;
}

export default class extends React.Component<{}, IState> {
  state: IState = {
    nowPlaying: [],
    upcoming: [],
    popular: [],
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      let nowPlaying: IMovie[] = [];
      for (let i = 1; i <= 2; i++) {
        nowPlaying = nowPlaying.concat(
          (await moviesApi.nowPlaying(i)).data.results
        );
      }

      let upcoming: IMovie[] = [];
      for (let i = 1; i <= 2; i++) {
        upcoming = upcoming.concat((await moviesApi.upcoming(i)).data.results);
      }

      let popular: IMovie[] = [];
      for (let i = 1; i <= 2; i++) {
        popular = popular.concat((await moviesApi.popular(i)).data.results);
      }

      this.setState({ nowPlaying, upcoming, popular });
    } catch {
      this.setState({ error: "Can't find movies informations." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
