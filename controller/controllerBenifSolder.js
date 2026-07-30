import { utilsBenifSolder, ValidpatchSoldierBenefit } from "../utils/utilsBenifSolder.js";
import { createSoldierBenifService,getSoldierBenifservice,updateBenefitService,} from "../service/serviceBenifSolder.js";
export async function createSoldierBenef(req,res,next){
    try{
        const valid = utilsBenifSolder(req.body,req.params)
        if (!valid){
            return res.status(400).json({error:"require missing"});
            }
        const create =await createSoldierBenifService(req.body,req.params)
        res.status(201).json({data:create})
    }
    catch(err){
        next(err)
    }
}

export async function getSoldierBenefit(req,res,next) {
    try{
        const {soldierId} = req.body
        if(!soldierId){
            return res.status(400).json({error:"missing soldierId"})
        }
        const getBenif = await getSoldierBenifservice(soldierId)
        res.status(200).json({data:getBenif})
    }
    catch(err){
        next(err)
    }
}

export async function patchSoldierBenefit(req,res,next) {
    try{
        const valid = ValidpatchSoldierBenefit(req.body,req.params)
        if(!valid){
            return res.status(400).json({error:"require need to have all the file nessery and the match type"})
        }
        const updateBenefit = await updateBenefitService(req.body,req.params)
        if(!updateBenefit.change){
            return res.status(200).json({data:updateBenefit.data,reverted:true,reason:"the minister dont accept change"})
        }
        res.status(200).json({data:updateBenefit.data})
    }
    catch(err){
        next(err)
    }
}


