import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  // Using custom useHttp hook to get a sendRequest function and other info and states
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  // executing the sendRequest function with useEffect hook
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // Conditions and rendering depending on the Status
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <p className="centered focused">{error}</p>;
  }

  if ((status === "completed" && !loadedQuotes) || loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }

  // if we get past all the if checks then we load our quotes we got from firebase

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
