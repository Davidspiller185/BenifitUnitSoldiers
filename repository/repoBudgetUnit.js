import supabase from "../db/database.js"
export async function checkBudget(unit,benefitType,month){
    try{
        const getBudget = await supabase
        .from('budget')
        .select('*')
        .eq('unit',unit)
        .eq('benefitType',benefitType)
        .eq('month',month)
    }
    catch(err){
        throw(err)
    }
}

export async function createRepoBudget(unit,benefitType,month,allocatedAmount){
    try{
        const insertBudget = await supabase
            .from('budget')
            .insert({unit:unit,benefitType:benefitType,month:month,allocatedAmount:allocatedAmount})
            .select()
    }
    catch(err){
        throw(err)
    }
}
