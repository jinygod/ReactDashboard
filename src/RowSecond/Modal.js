import React from 'react';

function Modal({ isOpen, selectedPost, handleCloseModal }) {
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedPost.title}</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p>작성자: {selectedPost.author}</p>
            <p>날짜: {selectedPost.date}</p>
            <p>조회수: {selectedPost.views}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
