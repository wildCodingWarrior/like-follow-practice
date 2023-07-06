import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deletePost, likePost } from "../config/redux/modules/postSlice";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const handleLike = (id) => {
    dispatch(likePost(id));
  };

  return (
    <PostContainer>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <Content>{post.authorId}</Content>
      <Content>{post.likes}</Content>
      <DeleteButton
        onClick={async () => {
          await dispatch(deletePost(post.id));
        }}
      >
        삭제
      </DeleteButton>
      <LikeButton
        onClick={() => {
          handleLike(post.id);
        }}
      >
        좋아요
      </LikeButton>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
`;

const Title = styled.h3`
  margin-bottom: 5px;
`;

const Content = styled.p`
  color: #333;
`;

const DeleteButton = styled.button``;

const LikeButton = styled.button``;
