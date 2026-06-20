import React, { useState } from "react";

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
        className="bookmark-button"
        disabled={updating}
        onClick={handleClick}
      >
        {updating
          ? "Updating..."
          : project.bookmarked
            ? "Remove bookmark"
            : "Add bookmark"}
      </button>
      {error && (
        <p className="bookmark-button__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
