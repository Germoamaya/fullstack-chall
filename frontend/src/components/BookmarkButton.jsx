import React, { useState } from "react";
import BookmarkIcon from "./BookmarkIcon";
import "./BookmarkButton.css";

export default function BookmarkButton({ project, onToggleBookmark }) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setError(null);
    setUpdating(true);

    try {
      await onToggleBookmark(project.id);
    } catch (err) {
      setError(err.message || "Failed to update bookmark");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bookmark-button-wrapper">
      <button
        type="button"
        className={`bookmark-button ${
          project.bookmarked ? "bookmark-button--active" : ""
        }`}
        disabled={updating}
        onClick={handleClick}
      >
        <BookmarkIcon
          filled={project.bookmarked}
          size={18}
          className="bookmark-button__icon"
        />
        <span>
          {updating
            ? "Updating..."
            : project.bookmarked
              ? "Remove bookmark"
              : "Add bookmark"}
        </span>
      </button>
      {error && (
        <p className="bookmark-button__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
