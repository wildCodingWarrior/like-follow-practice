import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../config/redux/modules/postSlice";

const Home = () => {
  const { posts, loading } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchPosts());
    };
    fetchData();
  }, []);

  return (
    <HomeContainer>
      {loading && <div>로딩중...</div>}
      {!loading && (
        <>
          <button
            onClick={() => {
              navigate("create");
            }}
          >
            게시물 작성하기
          </button>
          <h2>게시물 목록</h2>
          <PostList>
            {posts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </PostList>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  margin: 20px;
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
