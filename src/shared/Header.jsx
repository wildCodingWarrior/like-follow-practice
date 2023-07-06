import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, setUsers } from "../config/redux/modules/userSlice";
import { styled } from "styled-components";
const Header = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUserChange = (uid) => {
    dispatch(setCurrentUser(uid));
  };

  return (
    <HeaderContainer>
      <Heading>좋아요/팔로우 기능 연습</Heading>
      <UserInfo>
        <UserName>현재 유저: {currentUser.nickName}</UserName>
        <UserButton onClick={() => setUsers()} style={{ marginRight: "10px" }}>
          초기 유저 세팅
        </UserButton>
        <UserButton onClick={() => handleUserChange("user1")}>유저1</UserButton>
        <UserButton onClick={() => handleUserChange("user2")}>유저2</UserButton>
        <UserButton onClick={() => handleUserChange("user3")}>유저3</UserButton>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  background-color: #f2f2f2;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  margin-right: 10px;
`;

const UserButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;
