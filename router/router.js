import express from "express"
import { createSoldierBenef,getSoldierBenefit,patchSoldierBenefit} from "../controller/controllerBenifSolder.js"
import { createBudget } from "../controller/controllerBudgetUnit.js"
const router = express.Router()

router.post("/soldiers/:soldierId/benefits",createSoldierBenef)

router.get("/soldiers/:soldierId/benefits",getSoldierBenefit)

router.patch("/soldiers/:soldierId/benefits",patchSoldierBenefit)

router.post("/budget",createBudget)


export default router

