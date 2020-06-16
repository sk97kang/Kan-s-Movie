import React from "react";

import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

interface ITV {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

interface IState {
  topRated: ITV[];
  popular: ITV[];
  airingToday: ITV[];
  loading: boolean;
  error: string | null;
}

export default class extends React.Component<{}, IState> {
  state: IState = {
    topRated: [],
    popular: [],
    airingToday: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();

      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      this.setState({ topRated, popular, airingToday });
    } catch {
      this.setState({ error: "Can't find TV infomation" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { topRated, popular, airingToday, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        loading={loading}
        error={error}
      />
    );
  }
}
