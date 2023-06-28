import React, { useState, useEffect } from 'react';


function Board() {
  const [posts, setPosts] = useState([]); // 게시글 목록을 저장할 상태

  useEffect(() => {
    // 게시글 목록을 가져오는 비동기 함수
    const fetchPosts = async () => {
      try {
        // API 호출 및 게시글 목록을 가져오는 로직
        const response = await fetch('API_URL/posts'); // API_URL은 백엔드 API 엔드포인트의 주소로 대체되어야 합니다.
        const data = await response.json();
        setPosts(data); // 가져온 게시글 목록을 상태에 저장
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts(); // 게시글 목록을 가져오는 함수 호출
  }, []);

  return (
    <div className="board">
      <h2>Mini Board</h2>
      <table className = 'table table-hover'>
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
            <tr>
                <td>100</td>
                <td>게시판을 만들자</td>
                <td>전성진</td>
                <td>2023.06.28</td>
                <td>2</td>
            </tr>
            <tr>
                <td>100</td>
                <td>게시판을 만들자</td>
                <td>전성진</td>
                <td>2023.06.28</td>
                <td>2</td>
            </tr>
            <tr>
                <td>100</td>
                <td>게시판을 만들자</td>
                <td>전성진</td>
                <td>2023.06.28</td>
                <td>2</td>
            </tr>
            <tr>
                <td>100</td>
                <td>게시판을 만들자</td>
                <td>전성진</td>
                <td>2023.06.28</td>
                <td>2</td>
            </tr>
        </tbody>
        </table>
        <hr/>
        <a class="btn btn-primary float-end">글쓰기</a>
        <div className ='d-flex justify-content-center'>
             <ul className = 'pagination'>
                <li className='page-item'><a className='page-link' href="#">1</a></li>
                <li className='page-item'><a className='page-link' href="#">2</a></li>
                <li className='page-item'><a className='page-link' href="#">3</a></li>
                <li className='page-item'><a className='page-link' href="#">4</a></li>
                <li className='page-item'><a className='page-link' href="#">5</a></li>
            </ul>
        </div>
    </div>
  );
}

export default Board;
