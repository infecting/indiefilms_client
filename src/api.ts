import axios from 'axios';

async function sendApiRequest<T>(method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH", path: string, withCredentials:boolean, data?: any): Promise<T> {
        path = `${process.env.REACT_APP_URI}/api/v1/${path}`;
        const response = await axios.request({method, baseURL: path, data, withCredentials:withCredentials});
        const success: boolean = response.data.success;
    if (success) {
        return response.data.data as T;
    } else {
        if (response.data.error) {
            throw new Error(response.data.error);
        } else {
            throw new Error(`Received error code from server: ${response.status}`);
        }
    }
}

export async function getUsers(): Promise<IUser> {
    return await sendApiRequest("GET", "users", false);
}

export async function register(email: Partial<IUser>, username: Partial<IUser>, password: Partial<IUser>): Promise<IUser> {
    return await sendApiRequest("POST", "users/register", false, {username: username, email: email, password: password, profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"})
}

export async function login(email: string, password: string): Promise<IAuth> {
    return await sendApiRequest("POST", "users/login", true, {email: email, password: password})
}

export async function refreshToken(): Promise<IAuth> {
    return await sendApiRequest("POST", "users/refresh_token", true);
}

export async function getMovies(): Promise<{movies: IMovie[]}> {
    return await sendApiRequest("GET", "movies", false);
}

export async function getMovie(id:string): Promise<{movie: IMovie}> {
    return await sendApiRequest("GET", `movies/get/${id}`, false);
}

export async function createMovie(userId: string, title: string, description: string, url: string, coverPicture: string): Promise<IMovie> {
    return await sendApiRequest("POST", "movies/create", false, {userId:userId, title: title, description: description, url: url, coverPicture: coverPicture})
}

export async function updateMovie(id: string, userId: Partial<IMovie>, title: Partial<IMovie>, description: Partial<IMovie>, url: Partial<IMovie>, coverPicture: Partial<IMovie>): Promise<IMovie> {
    return await sendApiRequest("PATCH", `movies/update/${id}`, false, {userId:userId, title: title, description: description, url: url, coverPicture: coverPicture})
}

export async function deleteMovie(id: string): Promise<IMovie> {
    return await sendApiRequest("DELETE", `movies/delete/${id}`, false);
}



export interface IUser extends Document {
    _id: string;
    email: string;
    username: string;
    role: "admin" | "user";
    profilePicture: URL;
    password: string;
}

export interface IMovie {
    _id: string;
    userId: string;
    title: string;
    description: string;
    url: string;
    coverPicture: string;
    score: number;
}

export interface IAuth {
    accessToken: string;
    user: IUser;
}

export interface Movies {
    movies: string[]
}