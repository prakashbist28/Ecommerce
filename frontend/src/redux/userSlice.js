import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    _id:"",
    firstname : "",
    lastname: "",
    email : "",
    image: "",
    token:"",
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            state._id = action.payload.data._id;
            state.firstname = action.payload.data.firstname;
            state.lastname = action.payload.data.lastname;
            state.email = action.payload.data.email;
            state.image = action.payload.data.image;
            state.token = action.payload.data.token; 
        },
        
        logoutRedux:(state,action)=>{
            state._id ="";
            state.firstname = "";
            state.lastname = "";
            state.email = "";
            state.image = "";
            state.token = ""; 
            state.cartItem = []; 
        }, 
    }
})
export const {loginRedux, logoutRedux} = userSlice.actions

export default userSlice.reducer

