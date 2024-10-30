import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; 
import { ChatEngine } from 'react-chat-engine';
import Swal from 'sweetalert2';

// Register
export const userRegister = createAsyncThunk("user/register", async (register) => {
    try {
        const response = await axios.post("http://localhost:5000/user/register", register);
        return response.data; // Retourne les données de l'API
    } catch (error) {
        console.error(error);
        throw error; // Lance l'erreur pour que Redux puisse la gérer
    }
});

// Login
export const userLogin = createAsyncThunk("user/login", async (login, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/user/login", login);
        return response.data; // Retourne les données de l'API
    } catch (error) {
        if (error.response && error.response.status === 403) {
            // Si l'état est "en cours", affiche un message d'alerte
            Swal.fire({
                icon: 'warning',
                title: 'Accès refusé',
                text: "Votre profil n'a pas encore été accepté par l'admin.",
            });
            return rejectWithValue("Votre profil n'a pas encore été accepté par l'admin.");
        }
        console.error(error);
        throw error; // Lance l'erreur pour que Redux puisse la gérer
    }
});

// Current User
export const userCurrent = createAsyncThunk("user/current", async () => {
    try {
        const response = await axios.get("http://localhost:5000/user/current", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response.data; // Retourne les données de l'API
    } catch (error) {
        console.error(error);
        throw error; // Lance l'erreur pour que Redux puisse la gérer
    }
});

// Edit User
export const userEdit = createAsyncThunk("user/update", async ({ id, edituser }) => {
    try {
        const result = await axios.put(`http://localhost:5000/user/${id}`, edituser);
        return result.data; // Retourne les données de l'API
    } catch (error) {
        console.error(error);
        throw error; // Lance l'erreur pour que Redux puisse la gérer
    }
});

// Delete User
export const removeuser = createAsyncThunk("user/delete", async (id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/user/${id}`);
        return result.data; // Retourne les données de l'API
    } catch (error) {
        console.error(error);
        throw error; // Lance l'erreur pour que Redux puisse la gérer
    }
});


// Connect to Chat
export const connectToChat = (user) => {
    return (dispatch) => {
        ChatEngine.connect({
            projectID: '5143bf92-46fd-442e-89c1-c16df79098d2',
            userName: user.pseudo,
            userSecret: user.secret_chat,
        });
    };
};

const initialState = {
    user: null, 
    status: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = null;
            localStorage.removeItem('isAdmin'); // Optionnel, si vous stockez aussi l'admin
            localStorage.removeItem("token");
            localStorage.removeItem("user_connected");
            localStorage.removeItem("film_direct")


        },
    },
    extraReducers: {
        // Register
        [userRegister.pending]: (state) => {
            state.status = "pending";
        },
        [userRegister.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            Swal.fire("Merci pour votre inscription ! Votre profil est en attente de validation par l'administrateur.");
            state.user = action.payload.user; // Stocke les informations de l'utilisateur sans token
            // Pas de stockage de token dans le localStorage
        },
        [userRegister.rejected]: (state) => {
            state.status = "rejected";
            Swal.fire("Erreur lors de l'inscription."); // Message d'erreur
        },
        // Login
        [userLogin.pending]: (state) => {
            state.status = "pending";
        },
        [userLogin.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.user = action.payload.user; // Assurez-vous que ça correspond
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("isAdmin", action.payload.user.email === 'admin@gmail.com');
            localStorage.setItem("user_connected", JSON.stringify(state.user));

        },
        [userLogin.rejected]: (state, action) => {
            state.status = "rejected";
            if (action.payload) {
                // Si le login échoue à cause de l'état "en cours", on affiche un message spécifique
                Swal.fire(action.payload);
            } else {
                Swal.fire("Vérifier vos données."); // Erreur générique si d'autres erreurs surviennent      
            }
        },
        // Current
        [userCurrent.pending]: (state) => {
            state.status = "pending";
        },
        [userCurrent.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.user = action.payload.user;
        },
        [userCurrent.rejected]: (state) => {
            state.status = "rejected"; 
        },
        // Delete
        [removeuser.pending]: (state) => {
            state.status = "pending"; 
        },
        [removeuser.fulfilled]: (state) => {
            state.status = "fulfilled";
        },
        [removeuser.rejected]: (state) => {
            state.status = "rejected"; 
        },
    },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
