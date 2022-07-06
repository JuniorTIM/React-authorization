import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/register-reducer";
import todosReducer from "./features/todos-reducer";


export const store = configureStore({
    reducer: {
        todos: todosReducer, 
        auth: registerReducer
    }
})