import React, { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

//Allows to change browse history
import { useHistory } from "react-router-dom";

const NewQuote = () => {
  // using Custom useHttp hook to get  sendRequest and status
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  // using useEffect to redirect
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    // sending Http request to firebase with our quote data
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
