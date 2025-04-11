import axios from "axios";
const serverAddr = process.env.SERVER_ADDRESS;
export const updateProfile = async ({ userId,username, profileUrl}: {
    userId: string, username: string | null,profileUrl:string | null
}) => {
    
    try {
        let data;
        if(username===null){
            data = { profileUrl };
        }
        else {
            data = { username };
        }
        const options={
            method: "PATCH",
            url: `${serverAddr}/users/profile/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        }
        const user = await axios.request(options);

        return user.data;
       
    } catch (error) {
        throw error;
    }
}

