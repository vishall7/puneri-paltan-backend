import {asyncHandler} from "../utils/asyncHandler.js";
import {getCollection} from "../db/connect.js";
import {collections} from "../constant.js";
import {query} from '../utils/query.js'; 
import {ApiResponse} from '../utils/ApiResponse.js';
import { ApiError } from "../utils/ApiError.js";

export const getAllCategories = asyncHandler(async (req, res) => {
    const Categories = getCollection(collections.Categories);
    if(!Categories) {
        throw new Error("Collection not found");
    }

    const categories = await query(Categories, 'find', {});
    return res
    .status(200)
    .json(
        new ApiResponse(200, "Categories fetched successfully", categories)
    );
});

export const insertCategories = async (data) => {
    const Category = getCollection(collections.Categories);
    if(!Category) {
        throw new ApiError("Collection not found", 404);
    }

    const categories = await Category.insertMany(data); 

    if(categories.length === 0) {
        throw new ApiError("Something went wrong", 500);    
    }

    return categories;
}