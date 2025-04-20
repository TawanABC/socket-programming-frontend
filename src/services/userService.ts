import { loginSchema } from "@/common/model";
import axios from "axios";


const serverAddr = process.env.SERVER_ADDRESS;

export type registryData = {
    username: string;
    email: string;
    password: string

}


export const register = async (registerData: registryData) => {
    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/register`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: registerData,
        };

        console.log(`Registering new user...`);
        const { data } = await axios.request(options);

        return {
            data
        };

    } catch (err) {
        throw err;
    }

}


export const loginService = async (loginData: loginSchema) => {
    console.log("login service", loginData);
    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/login`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: loginData
        };

        // const { data: { user, token } } = await axios.request(options);
        const { data } = await axios.request(options);
        console.log(data);
        const user = {
            userId: data.userId,
            username: data.username,
            email: data.email,
            profileUrl: data.profileUrl
        }
        const token = data.token;
        console.log("user = ", user);
        return {
            user, token
        }
    } catch (err) {
        throw err;
    }

}

export const logOutService = async () => {

    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/logout`,
            withCredentials: true,
        }

        await axios.request(options);

        return;

    } catch (err) {
        throw err;
    }

}


export const getUserById = async (userId: string) => {
    // console.log('get by id', userId);
    try {
        const options = {
            method: "GET",
            url: `${serverAddr}/users/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.request(options);
        const user = data.data
        // console.log("get user by id", user);
        return user;
    } catch (error) {
        throw error;
    }


}

export const getAllUsers = async () => {
    const options = {
        method: "GET",
        url: `${serverAddr}/users`,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    const { data } = await axios.request(options);
    const users = data.data
    console.log("get all users", users);
    return users;
}