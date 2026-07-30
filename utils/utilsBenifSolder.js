export function utilsBenifSolder(body,params){
    const {unit,benefitType,details,decisionReason,budgetApproved,startDate} = body
    const {soldierId} = params
    const typeBenefit = ["giftcard","dininghall"]
    if (!unit || !benefitType  || !details || !decisionReason || !budgetApproved){
        return false
    }
    else if(typeof unit !== "string" || typeof decisionReason !== "string" ){
        return false
    }
    else if(startDate && typeof startDate !==  "string"){
        return false
    }
    else if(!typeBenefit.includes(benefitType.toLowerCase()) || typeof details !== "object" || typeof budgetApproved !== "boolean"){
        return false
    }
    else if(typeof soldierId !== "number" || Number.isNaN(soldierId)){
        return false
    }
    else if(benefitType === "giftCard"){
        const{cardProvider,monthlyValue,validMerchants} = details
        if(!cardProvider || !monthlyValue || !validMerchants){
            return false
        }
        else if(typeof cardProvider !== "string" || typeof monthlyValue !== "number" || !Array.isArray(validMerchants)){
            return false
        }
        else if(validMerchants.find(item => typeof item !== "string")){
            return false
        }
    }
    else if(benefitType === "diningHall"){
        const {baseId,kosherLevel,mealTimes} = details
        if(!baseId || !kosherLevel || !mealTimes){
            return false
        }
        else if(typeof baseId !== "number" || typeof kosherLevel !== "string" || !Array.isArray(mealTimes)){
            return false
        }
        else if(mealTimes.find(item => typeof item !== "string")){
            return false
        }
    }
    return true
}

export async function ValidpatchSoldierBenefit(body,params) {
    const {benefitType,details,decisionReason,budgetApproved,decisionDate} = body
    const {soldierId} = params
    const typeBenefit = ["giftcard","dininghall"]
    if(!benefitType,details,decisionReason,budgetApproved){
        return false
    }
    else if(!typeBenefit.includes(benefitType.toLowerCase())){
        return false
    }
    else if(decisionDate && typeof decisionDate !== "string"){
        return false
    }
    else if(benefitType === "giftCard"){
        const{cardProvider,monthlyValue,validMerchants} = details
        if(!cardProvider || !monthlyValue || !validMerchants){
            return false
        }
        else if(typeof cardProvider !== "string" || typeof monthlyValue !== "number" || !Array.isArray(validMerchants)){
            return false
        }
        else if(validMerchants.find(item => typeof item !== "string")){
            return false
        }
    }
     else if(benefitType === "diningHall"){
        const {baseId,kosherLevel,mealTimes} = details
        if(!baseId || !kosherLevel || !mealTimes){
            return false
        }
        else if(typeof baseId !== "number" || typeof kosherLevel !== "string" || !Array.isArray(mealTimes)){
            return false
        }
        else if(mealTimes.find(item => typeof item !== "string")){
            return false
        }
    }
    else if(typeof decisionReason !== "string" || typeof budgetApproved !== "boolean"){
        return false
    }
    return true
}

export async function checkDate(date){
       if(date){
            const arrayDate = date.split('-')
            if(arrayDate.length>=2){
                if(arrayDate[0].length === 4 && arrayDate.length[1] === 2){
                    const number = Number(arrayDate[1])
                    if(number>=1 && number<=12){
                        let ISOdate = date.toISOString()
                        date = ISOdate
                        return date
                    }
                    return false
                }
                return false
            }
            
            return false
            
        }
        else{
            date = new Date()
            let ISOdate = date.toISOString()
            date = ISOdate
            return date
        }
}

export async function checkPrime(days){
    if (days<=1){
        return false
    }
    if (days>1){
        for(let i = 2; i<Math.sqrt(days);i++){
            if(days % i === 0){
                return false
            }
        return true
        }
    }
}