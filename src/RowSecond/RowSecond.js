import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Modal 컴포넌트 import
import CreateModal from './createmodal'; // CreateModal 컴포넌트 import

function Board() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7); // 페이지당 포스트 수 설정
  const [pageRange, setPageRange] = useState({start: 1, end: 10}); // 페이지 범위 상태 관리
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectCreate, setSelectCreate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

const fetchPosts = async () => {
  try {
    const response = await fetch('http://localhost:3001/posts?_sort=id&_order=desc'); // 번호순으로 내림차순 정렬
    const data = await response.json();
    data.sort((a,b) => b.id - a.id);
    console.log(data); // 데이터 콘솔에 출력
    setPosts(data);
  } catch (error) {
    console.log(error); // 에러 콘솔에 출력
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

    // 페이지 범위를 이동하는 함수
    const shiftPageRange = (direction) => {
      if (direction === 'next') {
        setPageRange(prevRange => ({start: prevRange.end + 1, end: prevRange.end + 10}));
      } else if (direction === 'prev') {
        setPageRange(prevRange => ({start: prevRange.start - 10, end: prevRange.start - 1}));
      }
    }  

  // Get total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);
  

  const handleSubmit = async (title, author) => {
    // 포스트 작성 및 저장 로직 추가
    try {
      const response = await fetch('http://localhost:3001/posts?_sort=id&_order=desc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
      });
  
      if (response.ok) {
        console.log('글이 성공적으로 작성되었습니다.');
        fetchPosts(); // 글 작성 후 목록 다시 가져오기 (번호순으로 정렬되어 새 글이 맨 위로 올라옴)
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

  useEffect(() => {
    if (currentPage === 1) {
      fetchPosts(); // 첫 페이지일 때도 번호순으로 정렬하여 게시물 가져오기
    }
  }, [currentPage]); // currentPage 상태가 변경될 때 호출하여 첫 페이지인 경우 게시물 가져오기

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
            <li className="page-item">
              <a className="page-link" onClick={() => pageRange.start > 1 && shiftPageRange('prev')} style={{ cursor: 'pointer' }}>
                이전
              </a>
            </li>
            {Array.from({ length: 10 }, (_, i) => pageRange.start + i).map(page => page <= totalPages && (
              <li className="page-item" key={page}>
                <a className="page-link" onClick={() => paginate(page)} style={{ cursor: 'pointer' }}>
                  {page}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" onClick={() => pageRange.end < totalPages && shiftPageRange('next')} style={{ cursor: 'pointer' }}>
                다음
              </a>
            </li>
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
