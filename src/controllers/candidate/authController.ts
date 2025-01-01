import { Request, Response } from "express";
import AppError from "../../middlewares/AppError";
import { generateToken } from "../../utils/jwt";
import Candidate from "../../models/candidate/candidateSchema";

export const candidateLogin =async(req:Request, res:Response)=>{
    const {email, password} = req.body
    const candidate =await Candidate.findOne({email,password})
    if(!candidate){throw new AppError(`Email/ Password incorrect`,404)}
    const token=generateToken(candidate.id)
    res.status(200).json({success:true,message:`welcome Candidate`,data:candidate,token })
}


export const getCandidate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);
    if (!candidate) {throw new AppError(`Candidate with ID ${id} not found`, 404)}
    res.status(200).json({ success: true, message: "Candidate retrieved successfully", data: candidate});
    }