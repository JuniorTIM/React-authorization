import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  error: null,
};

export const getTodos = createAsyncThunk("todos/get", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    const res = await fetch("http://localhost:4000/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    const data = await res.json();
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    } else {
      return thunkAPI.fulfillWithValue(data);
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const clearStorage = (token) => {
  localStorage.clear()
}

export const delTodos = createAsyncThunk("todos/del", async (i, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    await fetch(`http://localhost:4000/todos/${i}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
        "Content-Type": "application/json",
      },
    });
    return i;
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const addTodos = createAsyncThunk(
  "todos/add",
  async (text, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const changeTodos = createAsyncThunk(
  "todos/change",
  async (element, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4000/todos/${element._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !element.completed }),
      });
      return res.json();
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.error = null;
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(delTodos.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    });

    builder.addCase(addTodos.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.error = null;
    });
    builder.addCase(addTodos.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(changeTodos.fulfilled, (state, action) => {
      state.todos = state.todos.map((element) => {
        if (element._id === action.payload._id) {
          return action.payload;
        }
        return element;
      });
    });
  },
});

export default todosSlice.reducer;
