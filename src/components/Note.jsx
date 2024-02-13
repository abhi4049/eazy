import React, { useState } from 'react';

const Note = ({ title, content: initialContent, date, time, onUpdate, onDelete }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleTitleChange = event => {
    setEditedTitle(event.target.value);
  };

  const handleContentChange = event => {
    setEditedContent(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate(date, time, { title: editedTitle, content: editedContent });
    closeModal();
  };

  const handleDelete = () => {
    onDelete(date, time);
  };

  const closeModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      {isUpdateModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 id="modaltitle">Update your note</h3>
            <textarea
              className="updatetitle"
              id="titleborder"
              type="text"
              required
              autoFocus
              placeholder="Enter title"
              maxLength="20"
              value={editedTitle}
              onChange={handleTitleChange}
            />
            <textarea
              className="updatenote"
              id="contentborder"
              type="text"
              required
              placeholder="Enter note"
              maxLength="100"
              value={editedContent}
              onChange={handleContentChange}
            />
            <div id="modaloption">
              <button className="save" onClick={handleUpdate}>
                Save
              </button>
              <button className="close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="notesdoc">
        <h3 className="inputtitle">{title}</h3>
        <textarea
          className="inputnote"
          value={initialContent}
          readOnly
        ></textarea>
        <div className="optbar">
          <p>{date}</p>
          <button className="save" onClick={() => setIsUpdateModalOpen(true)}>
            📝
          </button>
          <button className="close" onClick={handleDelete}>
            ❌
          </button>
        </div>
      </div>
    </>
  );
};

export default Note;
