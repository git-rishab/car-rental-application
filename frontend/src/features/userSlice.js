import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:5000';

const initialState = {
    token: '', // from login page
    name: '', // from dashboard
    email: '', // from dashboard
    wishlist: [], // from dashboard
    address: '', // from dashboard
    rentedCars: [], // from dashboard
    listedCars: [], // from dashboard
    isLoading: true, 
    profilePic:'', // from login page
    isOpenn:false, // from Navbar
    id:'', // from login page
    request: false,
    unauthorized: true
};

export const getUser = createAsyncThunk(
    'user/getUser',
    async (endpoint, thunkAPI) => {
        try {
            const { token } = thunkAPI.getState().user;
            // console.log('name',name);
            // console.log(thunkAPI.getState());
            // thunkAPI.dispatch(openModal());
            const req = await fetch(`${url}${endpoint}`,{
                method:"GET",
                headers:{
                    "authorization":token
                }
            });
            const res = await req.json();
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state)=>{
            state.name = ''; // from dashboard
            state.email = ''; // from dashboard
            state.wishlist = []; // from dashboard
            state.address = ''; // from dashboard
            state.rentedCars = []; // from dashboard
            state.listedCars = []; // from dashboard
            state.isLoading = true; 
            state.profilePic =''; // from login page
            state.isOpenn = false; // from Navbar
            state.id =''; // from login page
            state.request = false;
            state.unauthorized = true
            state.token = '';
        },
        login: (state, {payload})=>{
            state.token = payload.token;
            state.profilePic = payload.profilePic;
            state.id = payload.id;
            state.unauthorized = false;
        },
        openDrawer: (state)=>{
            state.isOpenn = true;
        },
        closeDrawer: (state)=>{
            state.isOpenn = false;
        },
        request: (state)=>{
            state.request = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if(!action.payload.ok){
                    return; 
                }
                state.unauthorized = false;
                state.name = action.payload.data.name;
                state.email = action.payload.data.email;
                state.wishlist = action.payload.data.wishlist;
                state.listedCars = action.payload.data.listedCars;
                state.rentedCars = action.payload.data.rentedCars;
                state.address = action.payload.data.address;
                state.request = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                // console.log(action);
                state.isLoading = false;
            });
    },
});

// console.log(userSlice);
export const { logOut, login, openDrawer, closeDrawer,request } = userSlice.actions;

export default userSlice.reducer;