import React, { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
  // match.path gives us the path to inject into nested routes
  const match = useRouteMatch();

  const params = useParams();

  const { quoteId } = params; // getting quote id from the params for the getSingleQuote => sendRequest

  // using custom useHttp hook to get sendRequest function and other data
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  // using the sendRequest to get quote
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // conditions for rendering
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">No Quote Found!</p>;
  }

  return (
    <Fragment>
      <h1>Quote Detail</h1>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
