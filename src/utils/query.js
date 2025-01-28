import {ApiError} from "./ApiError.js";

export const query = async (collection, method, payload) => {
    if(!collection[method]) {
        throw new ApiError("Method not found", 404);
    }
    if(method === 'findOne') {
        return await collection[method](payload);
    }    
    return collection[method](payload).toArray();
}