import {asyncHandler} from "../utils/asyncHandler.js";
import {getCollection} from "../db/connect.js";
import {collections, Players} from "../constant.js";
import {query} from '../utils/query.js'; 
import {ApiResponse} from '../utils/ApiResponse.js';
import { ApiError } from "../utils/ApiError.js";

export const getAllPlayers = asyncHandler(async (req, res) => {
    const Players = getCollection(collections.Players);
    if(!Players) {
        throw new Error("Collection not found");
    }

    const players = await query(Players, 'find', {});
    return res.status(200).json(players);
});

export const getPlayersByCategory = asyncHandler(async (req, res) => {
    const Players = getCollection(collections.Players);
    if(!Players) {
        throw new Error("Collection not found");
    }

    const category_id = req.params.id;

    if(!category_id){
        throw new ApiError("plese enter category id", 400)
    }

    const players = await query(Players, 'aggregate', [
        {
            $match: {
                category_id: parseInt(category_id)
            }
        },
        {
            $lookup: {
                from: collections.Categories,
                localField: "category_id",
                foreignField: "_id",
                as: "category",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1
                        }
                    }
                ]
            },            
        },
        {
            $unwind: "$category"
        },
        {
            $addFields: {
                category: "$category.name"
            }
        },
        {
            $project: {
                category_id: 0, 
                Matches_played: 0,
                total_ponints_earned: 0,
                most_points_in_a_match: 0,
                not_out_percentage: 0,
                no_of_super_raids: 0,
                super_10s: 0,
                avg_raid_points: 0,
                no_of_super_tackles: 0,
                total_tacle_points: 0               
            }
        },
    ]);

    if(players.length === 0) {
        throw new ApiError("players data not found from this category", 500);
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Players fetched successfully", players)
    );
});

export const getPlayer = asyncHandler(async (req, res) => {
    const {slug} = req.params;

    const Players = getCollection(collections.Players);

    if(!slug) {
        throw new ApiError("name not found", 404)
    }

    const replaced = slug.replace(/-/gi, ' ');;
    console.log(replaced)

    const player = await query(Players, 'findOne', {name: { $regex: new RegExp('^' + replaced + '$', 'i') }});

    if(!player){
        throw new ApiError("player not found", 404)
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "player fetched successfully", player)
    )         
}) 

export const insertPlayer = async (data) => {
    const Player = getCollection(collections.Players);
    if(!Player) {
        throw new ApiError("Collection not found", 404);
    }

    const playerExisted = await Player.findOne({name: data.name});
    if(playerExisted) {
        throw new ApiError("Player already existed", 400);
    }

    const player = await Player.insertOne(data);

    if(!player) {
        throw new ApiError("player data not inserted", 500);
    } 

    return player;
}  

export const insertPlayers = async (data) => {
    const Player = getCollection(collections.Players);
    if(!Player) {
        throw new ApiError("Collection not found", 404);
    }

    const players = await Player.insertMany(data);

    if(players.length === 0) {
        throw new ApiError("players data not inserted", 500);
    }

    return players;
}

