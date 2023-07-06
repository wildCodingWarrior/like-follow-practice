import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const name = "user";

const userList = [
  {
    uid: "user1",
    nickName: "유저1",
  },
  {
    uid: "user2",
    nickName: "유저2",
  },
  {
    uid: "user3",
    nickName: "유저3",
  },
];

export const setUsers = () => {
  userList.forEach(async (user) => {
    await setDoc(doc(db, "users", user.uid), user);
  });
};

const initialState = {
  currentUser: {
    uid: "user1",
    nickName: "유저1",
  },
};

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const uid = action.payload;
      state.currentUser = userList.find((user) => user.uid === uid);
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
