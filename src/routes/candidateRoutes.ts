import express from 'express'
import { candidateLogin, getCandidate } from '../controllers/candidate/authController'
import { trycatch } from '../middlewares/tryCatch'
import { createValidator } from 'express-joi-validation'
import { candidateLoginValidation } from '../middlewares/validation/admin/authValidation'
import uploadImage from '../middlewares/uploadImage'
import { uploadProfileImage, uploadResume } from '../controllers/candidate/profileController'

export const candidateRouter=express.Router()

const validator=createValidator({passError:true})

candidateRouter.post(`/login`,validator.body(candidateLoginValidation),trycatch(candidateLogin))
candidateRouter.get(`/:id`,trycatch(getCandidate))
candidateRouter.post('/upload/profile/:id',uploadImage.single('image'),trycatch(uploadProfileImage))
candidateRouter.post('/upload/resume/:id',uploadImage.single('file'),trycatch(uploadResume))
