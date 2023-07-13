import React, { useState } from 'react';
import './createmodal.css';

function CreateModal({ isOpen, handleCloseModal, fetchPosts }) {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [author, setAuthor] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContext(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date().toISOString();
    const views = 0;

    const newPost = {
      title,
      context,
      author,
      date,
      views
    };

    try {
      const response = await fetch('http://localhost:3001/posts?_sort=id&_order=desc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('새로운 포스트가 추가되었습니다:', data);
        fetchPosts();
        handleCloseModal();
      } else {
        console.log('새로운 포스트 추가에 실패했습니다.');
      }
    } catch (error) {
      console.log('에러:', error);
    }

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
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                value={context}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요"
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
            <button type="submit" className="float-end">작성하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
