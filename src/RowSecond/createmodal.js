import React, { useState } from 'react';
import './createmodal.css'; // createmodal css import

function CreateModal({ isOpen, handleCloseModal, fetchPosts }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 현재 날짜 생성
    const date = new Date().toISOString();

    // 조회수 초기값 설정
    const views = 0;

    // 새로운 포스트 데이터 생성
    const newPost = {
      title,
      author,
      date,
      views
    };

    try {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('새로운 포스트가 추가되었습니다:', data);
        fetchPosts(); // 글 작성 후 목록 다시 가져오기
        handleCloseModal(); // 모달 닫기
      } else {
        console.log('새로운 포스트 추가에 실패했습니다.');
      }
    } catch (error) {
      console.log('에러:', error);
    }

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
            <div>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label htmlFor="author">글쓴이</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={handleAuthorChange}
                placeholder="글쓴이를 입력하세요"
                required
              />
            </div>
            <button type="submit" className = "float-end">작성하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
