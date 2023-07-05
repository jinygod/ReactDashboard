import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Modal 컴포넌트 import
import CreateModal from './createmodal'; // CreateModal 컴포넌트 import

function Board() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7); // 페이지당 포스트 수 설정
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
    setSelectCreate(false);
    setIsOpen(false);
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // 페이지 번호를 변경하는 함수
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Get total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);
  

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
        {currentPosts.map((post, index) => (
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li className="page-item" key={page}>
              <a className="page-link" onClick={() => paginate(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {selectedPost && (
        <Modal isOpen={isOpen} selectedPost={selectedPost} handleCloseModal={handleCloseModal} />
      )}
      {isOpen && selectCreate && <CreateModal isOpen={isOpen} handleCloseModal={handleCloseModal} fetchPosts={fetchPosts} />}
    </div>
  );
}

export default Board;
