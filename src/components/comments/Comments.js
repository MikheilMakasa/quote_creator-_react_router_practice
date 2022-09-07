import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  // for getting quoteId for newComment
  const params = useParams();

  // to avoid using whole params as a dependency in useEffect we use object destructuring
  const { quoteId } = params;

  // using custom hook with getAllComments
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  // sending request to get all the comments
  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // wrapping this with useCallback to avoid infinite loop
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // using a variable for rendering, instead of useState and something

  let comments;

  // rendering logic
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddedComment={addedCommentHandler}
          quoteId={quoteId}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
