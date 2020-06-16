import React from "react";
import MorePresenter from "./MorePreseter";
import { RouteComponentProps } from "react-router-dom";
import { moviesApi } from "../../api";

interface IState {
  title: string;
  result: any[];
  error: string | null;
  loading: boolean;
}

export default class extends React.Component<RouteComponentProps, IState> {
  state: IState = {
    title: "",
    result: [],
    error: "",
    loading: true,
  };

  componentDidMount = async () => {
    const path = this.props.location.pathname;

    let result = this.state.result;
    let title = "";
    try {
      if (path.includes("/movie/nowPlaying")) {
        title = "Now Playing";
        for (let i = 1; i <= 7; i++) {
          result = result.concat((await moviesApi.nowPlaying(i)).data.results);
        }
      } else if (path.includes("movie/upcoming")) {
        title = "Upcoming Playing";
        for (let i = 1; i <= 7; i++) {
          result = result.concat((await moviesApi.upcoming(i)).data.results);
        }
      } else if (path.includes("movie/popular")) {
        title = "Popular Playing";
        for (let i = 1; i <= 7; i++) {
          result = result.concat((await moviesApi.popular(i)).data.results);
        }
      } else {
        this.props.history.push("/");
      }
    } catch {
      this.setState({ error: "Can't not find..." });
    } finally {
      this.setState({ loading: false, result, title });
    }
  };

  render() {
    const { title, result, loading, error } = this.state;
    return (
      <MorePresenter
        title={title}
        result={result}
        loading={loading}
        error={error}
      />
    );
  }
}
