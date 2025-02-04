import authServices from "@/services/authServices";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: true
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setUser, clearUser, setIsLoading } = userSlice.actions;

export const authLoader = () => async (dispatch) => { 
    try {
        // const response = await authServices.me();

        setTimeout(()=>{
            dispatch(setUser({
                "preferences": {
                    "notification": true
                },
                "_id": "67a0dcd132bf328beefcba6d",
                "name": "Padmesh",
                "email": "padmesh191101@gmail.com",
                "currency": "INR",
                "category_ids": [],
                "mfaEnabled": false,
                "isVerified": true,
                "createdAt": "2025-02-03T15:12:17.062Z",
                "updatedAt": "2025-02-03T15:13:23.030Z"
            }))
            dispatch(setIsLoading(false));
        }, 5000)
   
        return true;
    } catch (error) {
        console.log(error);
        dispatch(setIsLoading(false));
        return false;
    }
}

export const userState = state => state.user;

export default userSlice.reducer;