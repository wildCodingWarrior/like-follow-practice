import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "../config/redux/modules/postSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddPost = async () => {
    if (title && content) {
      await dispatch(addPost({ title, content }));
      navigate("/");
    }
  };

  return (
    <CreatePostContainer>
      <h2>게시물 작성</h2>
      <InputContainer>
        <InputLabel>제목:</InputLabel>
        <InputField type="text" value={title} onChange={handleTitleChange} />
      </InputContainer>
      <InputContainer>
        <InputLabel>내용:</InputLabel>
        <InputArea type="text" value={content} onChange={handleContentChange} />
      </InputContainer>
      <ButtonContainer>
        <button onClick={handleAddPost}>추가</button>
      </ButtonContainer>
    </CreatePostContainer>
  );
};

export default CreatePost;

const CreatePostContainer = styled.div`
  margin: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  margin-right: 10px;
`;

const InputField = styled.input`
  padding: 5px;
`;

const InputArea = styled.textarea`
  padding: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
