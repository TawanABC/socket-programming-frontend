import axios from "axios";

const serverAddr = process.env.SERVER_ADDRESS;

export type registryData = {
    username: string;
    email: string;
    password: string

}

export const register = async (registerData: registryData) => {
    console.log("service", registerData);
    console.log("server", serverAddr);
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


export const loginService = async ({ email, password }: LoginSchema) => {

    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/login`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: {
                email,
                password,
            },
        };

        const { data: { user, token } } = await axios.request(options);

        return {
            user,
            token,
        };

    } catch (err) {
        throw err;
    }

}