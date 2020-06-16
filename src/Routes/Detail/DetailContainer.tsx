import React from "react";

import DetailPresenter from "./DetailPresenter";
import { RouteComponentProps } from "react-router-dom";
import { moviesApi, tvApi } from "../../api";

interface IState {
  result: any;
  error: string | null;
  loading: boolean;
}

export default class extends React.Component<
  RouteComponentProps<{ id: string }>,
  IState
> {
  state: IState = {
    result: {},
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
      location: { pathname },
    } = this.props;
    const isMovie = pathname.includes("/movie/");
    const parseId = Number(id);
    if (isNaN(parseId)) {
      push("/");
      return;
    }
    let result = [];
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parseId));
      } else {
        ({ data: result } = await tvApi.showDetail(parseId));
      }
    } catch {
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
