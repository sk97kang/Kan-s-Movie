import React from "react";

import DetailPresenter from "./DetailPresenter";
import { RouteComponentProps } from "react-router-dom";
import { moviesApi, tvApi } from "../../api";

interface IState {
  result: any;
  error: string | null;
  loading: boolean;
  pathname: string;
}

export default class extends React.Component<
  RouteComponentProps<{ id: string }>,
  IState
> {
  state: IState = {
    result: {},
    error: null,
    loading: true,
    pathname: "",
  };

  componentDidUpdate() {
    const {
      location: { pathname },
    } = this.props;

    if (this.state.pathname !== pathname) {
      this.setDetail();
    }
  }

  async componentDidMount() {
    this.setDetail();
  }

  setDetail = async () => {
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
      this.setState({ loading: false, result, pathname });
    }
  };

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
