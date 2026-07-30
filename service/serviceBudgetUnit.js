import { checkBudget,createRepoBudget, } from "../repository/repoBudgetUnit.js"
import { checkFormat } from "../utils/utilsBudgerUnit.js"

export async function budgetService(body){
    try{
        const {unit,benefitType,month,allocatedAmount} = body
        const validFormat = checkFormat(month)
        if(!validFormat){
            const err = new Error("month must be format of Date")
            err.status(400)
            throw(err)
        }
        const toArray = validFormat.split('-')
        const array = []
        array.push(toArray[0])
        array.push(toArray[1])
        month = array.join('-')
        const getBudget = await checkBudget(unit,benefitType,month)
        if(getBudget.length > 0){
            const err = new Error("alredy existe this bugetAllocation")
            err.status = 409
            throw(err)
        }
        const createBudgetRepo = await createRepoBudget(unit,benefitType,month,allocatedAmount)
        return createBudgetRepo
    }
    catch(err){
        throw(err)
    }
}