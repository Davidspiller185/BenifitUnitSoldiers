import { checkSoliderBenifRepo,createBenefSoldierRepo,getHistoryRepo,updateHistory } from "../repository/repoBenifSolder.js"
import { checkDate,checkPrime } from "../utils/utilsBenifSolder.js"
export async function createSoldierBenifService(body,params) {
    try{
        const {soldierId} = params
        const {unit,benefitType,startDate,decisionReason,budgetApproved,details} = body
        const date = checkDate(startDate)
        if(date){
            startDate = date
        }
        else{
            const err = new Error('require missing format Date')
            err.status = 400
            throw(err)
        }
        const endDate = null
        const existe = await checkSoliderBenifRepo(soldierId)
        if (existe.length > 0){
            const err = new Error("alredy exists benefit to this soldier")
            err.status = 409
            throw err
        }
        const BenefitPeriod= {startDate,endDate,decisionReason,budgetApproved,benefitType,details}
        return await createBenefSoldierRepo(soldierId,unit,benefitType,BenefitPeriod)
        
    }
    catch(err){
        throw(err)
    }
}

export async function getSoldierBenifservice(soldierId){
    try{
        const getBenif = await checkSoliderBenifRepo(soldierId)
        if(getBenif.length === 0){
            const err = new Error("not found soldierId")
            err.status = 404
            throw err
        }
        return getBenif
    }
    catch(err){
        throw(err)
    }
}

export async function updateBenefitService(body,params) {
    try{
        const {benefitType,details,decisionReason,budgetApproved,decisionDate} = body
        const {soldierId} = params
        const date = checkDate(decisionDate)
        if(date){
            decisionDate =date
        }
        else{
            const err = new Error('require missing format Date')
                err.status = 400
                throw(err)
        }
        const firstOfYear = new Date(new Date().getFullYear(), 1,1)
        let IsODate = firstOfYear.toISOString()
        firstOfYear = IsODate
        const arayDate =firstOfYear.split('-')
        arayDate[0] = decisionDate.split('-')[0]
        firstOfYear = arayDate.join("-")
        const days = Math.floor(decisionDate-firstOfYear/(24*60*60*1000)) +1
        const prime = checkPrime(days)
        if(prime){
            const getBenif = await checkSoliderBenifRepo(soldierId)
            if(getBenif.length === 0){
                const err = new Error("not found soldierId")
                err.status = 404
                throw err
            }
            return {change:false,data:getBenif}
            
        }
        await updateCurrentBenefit(benefitType,soldierId)
        const getHistory = await getHistoryRepo(soldierId)
        if(getHistory.length === 0){
            const err = new Error("can't update empty array without object")
            err.status = 400
            throw err
        }
        getHistory[-1].endDate = decisionDate
        getHistory.push(body)
        await updateHistory(getHistory,soldierId)
        const data = await checkSoliderBenifRepo(soldierId)
        return {change:true,data:data}
    }
    catch(err){
        throw(err)
    }
}