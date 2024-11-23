import React from "react";

const FileItem = ({ file, onDelete }) => {
  const handleDelete = () => {
    onDelete(file.id);
  };

  return (
    <div>
      <span>{file.name}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FileItem;
