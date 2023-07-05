import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Modal 컴포넌트 import
import CreateModal from './createmodal'; // CreateModal 컴포넌트 import

function Board() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectCreate, setSelectCreate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setSelectCreate(true);
    setIsOpen(true);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (title, author) => {
    // 포스트 작성 및 저장 로직 추가
    try {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
      });

      if (response.ok) {
        console.log('글이 성공적으로 작성되었습니다.');
        fetchPosts(); // 글 작성 후 목록 다시 가져오기
        handleCloseModal(); // 모달 닫기
      } else {
        console.log('글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.log('에러:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="board">
      <h2>Mini Board</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
        {posts.map((post, index) => (
          <tr key={index} onClick={() => handlePostClick(post)}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{formatDate(post.date)}</td>
            <td>{post.views}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <hr />
      <button className="btn btn-primary float-end" onClick={handleOpenModal}>글쓰기</button>
      <div className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              5
            </a>
          </li>
        </ul>
      </div>
      {selectedPost && (
        <Modal isOpen={isOpen} selectedPost={selectedPost} handleCloseModal={handleCloseModal} />
      )}
      {isOpen && selectCreate && <CreateModal isOpen={isOpen} handleSubmit={handleSubmit} handleCloseModal={handleCloseModal} fetchPosts={fetchPosts} />}
    </div>
  );
}

export default Board;
