import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signUp: false,
  signIn: false,
  error: null,
  token: localStorage.getItem("token")
}

export const createUser = createAsyncThunk("user/add", async ({login, password}, thunkAPI) => {
    try {
        const res =  await fetch("http://localhost:4000/user", {
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({login, password})
         })
         const data = await res.json()

         if (data.error) {
          return thunkAPI.rejectWithValue(data.error)
         } else {
          return thunkAPI.fulfillWithValue(data);
         }
       } catch (e) {
         thunkAPI.rejectWithValue(e.message)
       }
})

export const auth = createAsyncThunk('login/auth', async ({login,password}, thunkAPI) => {
  try {
    const res =  await fetch("http://localhost:4000/login", {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({login, password})
     })
     const data = await res.json()

     if (data.error) {
      return thunkAPI.rejectWithValue(data.error)
     } else {
      localStorage.setItem("token", data.token)
      return thunkAPI.fulfillWithValue(data)
     }
   } catch (e) {
     thunkAPI.rejectWithValue(e.message)
   }
})

export const registerSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      logout(state, action) {
        state.token = null;
        localStorage.clear();
      },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
          state.user = action.payload
          state.signUp = false
          state.error = null
        })
        builder.addCase(createUser.rejected, (state, action) => {
          state.error = "Такой пользователь уже существует"
        })

        builder.addCase(auth.fulfilled, (state, action) => {
          state.user = action.payload
          state.signIn = false
          state.error = null
          state.token = action.payload.token
        })
        builder.addCase(auth.rejected, (state, action) => {
          state.error = action.payload
        })
    }
})

export const { logout } = registerSlice.actions;
export default registerSlice.reducer
