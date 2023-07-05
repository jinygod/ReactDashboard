import React, { useState } from 'react';
import './createmodal.css'; // createmodal css import

function CreateModal({ isOpen, selectedPost, handleCloseModal }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력값 처리 또는 데이터 전송 로직을 추가하세요
    console.log('입력값:', inputValue);
    // 모달 닫기
    handleCloseModal();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2>글쓰기</h2>
        <div className="modal-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="제목을 입력하세요"
            />
            <button type="submit">작성하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
