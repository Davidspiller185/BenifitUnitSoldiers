import { validBudget } from "../utils/utilsBudgerUnit.js"
import { budgetService } from "../service/serviceBudgetUnit.js";
export async function createBudget(req,res,next){
    try{
        const valid = validBudget(req.body)
        if(!valid){
            return res.status(400).json({error:"need to send all the file with match type"});
        }
        const postBudget = await budgetService(req.body)
    
    }
    catch(err){
        next(err)
    }
}
