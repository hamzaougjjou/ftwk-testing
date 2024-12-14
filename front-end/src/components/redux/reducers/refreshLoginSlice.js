import { createSlice } from "@reduxjs/toolkit";


// let intStat = {
//     loading: false,
//     error: false,
//     user: null,
//     token: ""
// };


const refreshLoginSlice = createSlice({
    name: 'refreshLoginSlice',
    initialState: {
        loading: false,
        error: false,
        user: null,
        token: null
    },
    reducers: {
        startLogin: (state) => {
            state.loading = true;
            state.error = false;
        },
        getLogin: (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.error = false;

            // state.token = action.payload.token;
            // state.user = action.payload.user,
            localStorage.setItem('authInfo', JSON.stringify(action.payload) );
        },
        LoginError: (state) => {
            state.error = true;
            state.loading = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem('authInfo');
        },
    }
})

export const { startLogin, getLogin, LoginError } = refreshLoginSlice.actions;
export default refreshLoginSlice.reducer;
