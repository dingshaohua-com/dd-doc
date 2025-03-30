
import axios from "axios";

export const get = (params) => {
    return axios.get("/type", {params});
};


export const add = (params) => {
    return axios.post("/type",params);
};


