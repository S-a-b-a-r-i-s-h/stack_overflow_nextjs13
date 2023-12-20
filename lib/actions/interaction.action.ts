"use server"

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

// export async function viewQuestion(params: ViewQuestionParams) {
//     try {
//         connectToDatabase();

//         const { questionId, userId } = params;

//         await Question.findByIdAndUpdate(questionId, {$inc: {views: 1}});

//         if(userId) {
//             const exsistingInteraction = await Interaction.findOne({
//                 user: userId,
//                 action: "view",
//                 question: questionId,
//             })
//             if(exsistingInteraction) return console.log("User has already viewed this question");
            
//             await Interaction.create({
//                 user: userId,
//                 action: "view",
//                 question: questionId,
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

export async function viewQuestion(params: ViewQuestionParams) {
    try {
        connectToDatabase();

        const { questionId, userId } = params;

        // Check if there is a userId
        if (userId) {
            // Check if the user has already viewed the question
            const existingInteraction = await Interaction.findOne({
                user: userId,
                action: "view",
                question: questionId,
            });

            // If the user has not already viewed, update view count and create an interaction
            if (!existingInteraction) {
                await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
                await Interaction.create({
                    user: userId,
                    action: "view",
                    question: questionId,
                });
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}