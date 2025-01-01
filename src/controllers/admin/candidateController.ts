import { Request, Response } from "express";
import Candidate from "../../models/candidate/candidateSchema";
import AppError from "../../middlewares/AppError";

export const createCandidate=async(req:Request,res:Response)=>{
  const {name,email,address, password,phone}=req.body;
  const existCandidate=await Candidate.findOne({email});
  if(existCandidate) throw new AppError(`Candidate already exist`)
  const candidate=new Candidate({ name, email, address, password, phone})
  await candidate.save()
  res.status(201).json({ success: true, message: "Candidate created Successfully", data: candidate});
}


export const getAllCandidates = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query; 
    const pageNumber = parseInt(page as string, 5);
    const limitNumber = parseInt(limit as string, 5);
    const skip = (pageNumber - 1) * limitNumber;
    const candidates = await Candidate.find()
      .skip(skip)
      .limit(limitNumber);
    if (candidates.length === 0) {throw new AppError("No candidates found", 404)}
    const totalCandidates = await Candidate.countDocuments();
    res.status(200).json({ success: true, message: "Candidates retrieved successfully", data: candidates,
      pagination: { currentPage: pageNumber, totalCandidates, pageSize: candidates.length},})
    }


export const deleteCandidate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCandidate = await Candidate.findByIdAndDelete(id);
    if (!deletedCandidate) {throw new AppError(`Candidate with ID ${id} not found`, 404)}
    res.status(200).json({ success: true, message: "Candidate deleted successfully"});
 }

