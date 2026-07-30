import supabase from "../db/database.js"
export async function checkSoliderBenifRepo(soldierId){
    try{
    const find = await supabase
        .from('benefitsoldier')
        .select('*')
        .eq('soldierId',soldierId)
    
    }
    catch(err){
        throw(err)
    }
}
export async function createBenefSoldierRepo(soldierId,unit,currentBenefitType,BenefitPeriod){
    try{
    const insert = await supabase
        .from('benefitsoldier')
        .insert({soldierId:soldierId,unit:unit,currentBenefitType:currentBenefitType,history:BenefitPeriod})
        .select()
    
    }
    catch(err){
        throw(err)
    }
}

export async function updateCurrentBenefit(benefitType,soldierId){
    try{
        await supabase
        .from('benefitsoldier')
        .update({currentBenefitType:benefitType})
        .eq('soldierId',soldierId)
    }
    catch(err){
        throw(err)
    }
}

export async function getHistoryRepo(soldierId){
    try{
        const history = await supabase
        .from('benefitsoldier')
        .select('history')
        .eq('soldierId',soldierId);
        
     
    }
    catch(err){
        throw(err)
    }
}

export async function updateHistory(getHistory,soldierId){
    try{
        await supabase
        .from('benefitsoldier')
        .update({history:getHistory})
        .eq('soldierId',soldierId)
    }
    catch(err){
        throw(err)
    }
}


    
