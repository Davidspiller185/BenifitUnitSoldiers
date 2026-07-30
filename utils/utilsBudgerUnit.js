export function validBudget(body){
    const {unit,benefitType,month,allocatedAmount} = body
    if(!unit || !benefitType || !month || !allocatedAmount){
        return false
    }
    if(typeof unit !== "string" || typeof benefitType !== "string" || typeof month !== "string"){
        return false
    }
    if(typeof allocatedAmount !== "number"){
        return false
    }
}

export async function checkFormat(month){
     const arrayDate = month.split('-')
     if(arrayDate.length>=2){
        if(arrayDate[0].length === 4 && arrayDate.length[1] === 2){
            const number = Number(arrayDate[1])
            if(number>=1 && number<=12){
                let ISOdate = month.toISOString()
                month = ISOdate
                return month
                    }
                    return false
                }
                return false
            }
            
            return false
            
        }
