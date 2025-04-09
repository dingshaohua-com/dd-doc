
import axios from "axios";

export const get = (params) => {
    return axios.get("/shelf", {params});
};


export const add = (params) => {
    return axios.post("/shelf",params);
};


