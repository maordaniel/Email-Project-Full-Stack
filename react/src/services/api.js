import axios from 'axios';

const ax = axios.create({
    baseURL:'http://127.0.0.1:5000/api',
    withCredentials: true,
    headers:{
        "Content-type": 'application/json',
    }
});

export async function GetData(url) {
    try{
        const response = await ax.get(url);
        return response;
    }catch (error) {
        const { response } = error;
        throw response
    }
}

export async function PostData(url, body){
    try {
        const response = await ax.post(url,body);
        return response
    }catch (error) {
        const { response } = error;
        throw response
    }
}

export async function DeleteData(url, body){
    try {
        const response = await ax.delete(url,{data:body});
        return response
    }catch (error) {
        const { response } = error;
        throw response
    }
}
