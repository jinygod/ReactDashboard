const express = require('express');
const app = express();
const port = 3001;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // 데이터베이스 사용자 이름
  host: 'localhost', // 데이터베이스 호스트
  database: 'react', // 데이터베이스 이름
  password: '1234', // 데이터베이스 비밀번호
  port: 5432, // 데이터베이스 포트 (일반적으로는 5432입니다)
});

app.use(express.json()); // JSON 데이터 파싱을 위한 미들웨어 설정

let posts = [];

// PostgreSQL에서 게시글 목록을 가져오는 함수
const fetchPostsFromDB = async () => {
  try {
    const query = 'SELECT * FROM posts'; // posts 테이블에서 모든 데이터를 조회하는 SQL 쿼리
    const result = await pool.query(query);
    posts = result.rows; // 조회된 결과를 posts 배열에 저장
  } catch (error) {
    console.log(error);
  }
};

app.post('/posts', async (req, res) => {
  const { title, author, date, views } = req.body;
  const newPost = { title, author, date, views };

  try {
    const query = 'INSERT INTO posts (title, author, date, views) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, author, date, views];
    const result = await pool.query(query, values);
    posts.push(result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating a new post' });
  }
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

// 서버 실행 시 PostgreSQL에서 게시글 목록을 가져옵니다.
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await fetchPostsFromDB();
});
