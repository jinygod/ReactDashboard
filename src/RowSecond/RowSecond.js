import React, { useState } from 'react';
import './RowSecond.css'; // RowSecond 컴포넌트의 스타일을 정의하는 CSS 파일을 import 합니다.

function RowSecond() {
  // 게시글 목록을 저장할 상태(State)
  const [posts, setPosts] = useState([]);

  // 새로운 게시글을 작성하는 함수
  const createPost = (title, content) => {
    const newPost = {
      id: Date.now(), // 고유한 ID 생성 (임시로 현재 시간을 사용)
      title,
      content,
    };
    setPosts([...posts, newPost]); // 새로운 게시글을 목록에 추가
  };

  // 게시글 삭제 함수
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId); // 선택한 게시글을 제외한 게시글 목록을 새로 생성
    setPosts(updatedPosts); // 업데이트된 게시글 목록으로 상태 업데이트
  };

  return (
    <div className="row-second">
      <h2>Mini Board</h2>
      
      {/* 게시글 목록 */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* 새로운 게시글 작성 폼 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const content = e.target.content.value;
          createPost(title, content);
          e.target.reset();
        }}
      >
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Content" required />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default RowSecond;
