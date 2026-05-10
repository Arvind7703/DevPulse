import { Request, Response } from "express";
import { createMetricService } from "./metric.service";
import { createMetricSchema } from "./metric.schema";


export const createMetricController = async (req:Request, res:Response)=>{
const validatedData = createMetricSchema.parse(req.body)
const metric = await createMetricService({...validatedData,projectId:req.project!.id})

res.status(201).json({
    success:true,
    metric
})
}