import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const name = "posts";

export const fetchPosts = createAsyncThunk(
  `${name}/fetchPosts`,
  async (_, thunkAPI) => {
    try {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsRef);
      const postPromises = querySnapshot.docs.map(async (document) => {
        // Quiz) posts에 해당하는 likes를 가져옵니다. likesCount를 만들어보세요!

        return {
          id: document.id,
          // likes: likesCount,
          ...document.data(),
        };
      });

      const posts = await Promise.all(postPromises);

      return thunkAPI.fulfillWithValue(posts);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addPost = createAsyncThunk(
  `${name}/addPost`,
  async (data, thunkAPI) => {
    try {
      const newPostData = {
        title: data.title,
        content: data.content,
        authorId: thunkAPI.getState().userReducer.currentUser.uid,
      };

      const docRef = await addDoc(collection(db, "posts"), newPostData);
      const docSnapShot = await getDoc(docRef);
      const post = { id: docSnapShot.id, ...docSnapShot.data() };
      return thunkAPI.fulfillWithValue(post);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  `${name}/deletePost`,
  async (id, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Quiz) 좋아요 기능을 구현해보세요!
export const likePost = createAsyncThunk(
  `${name}/likePost`,
  async (postId, thunkAPI) => {}
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            if (action.payload.isLike) {
              post.likes += 1;
            } else {
              post.likes -= 1;
            }
          }
          return post;
        });
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
