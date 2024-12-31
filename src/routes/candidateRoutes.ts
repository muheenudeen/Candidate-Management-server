import express from 'express'
import { candidateLogin, getCandidate } from '../controllers/candidate/authController'
import { trycatch } from '../middlewares/tryCatch'
import { createValidator } from 'express-joi-validation'
import { candidateLoginValidation } from '../middlewares/validation/admin/authValidation'

export const candidateRouter=express.Router()

const validator=createValidator({passError:true})


candidateRouter.post(`/login`,validator.body(candidateLoginValidation),trycatch(candidateLogin))
candidateRouter.get(`/:id`,trycatch(getCandidate))