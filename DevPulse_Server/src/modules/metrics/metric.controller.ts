import { Request, Response } from "express";
import { createMetricService, getEndpointBreakdownService, getMetricsSummaryService, getProjectMetricsService } from "./metric.service";
import { createMetricSchema } from "./metric.schema";


export const createMetricController = async (req:Request, res:Response)=>{
const validatedData = createMetricSchema.parse(req.body)
const metric = await createMetricService({...validatedData,projectId:req.project!.id})

res.status(201).json({
    success:true,
    metric
})
}

export const getProjectMetricsController = async (
  req: Request,
  res: Response,
) => {
  const metrics = await getProjectMetricsService(
    req.params.id as string,
  );

  res.status(200).json({
    success: true,
    metrics,
  });
};

export const getMetricsSummaryController = async (
  req: Request,
  res: Response,
) => {
  const summary = await getMetricsSummaryService(
    req.params.id as string,
  );

  res.status(200).json({
    success: true,
    summary,
  });
};

export const getEndpointBreakdownController = async (
  req: Request,
  res: Response,
) => {
  const endpoints =
    await getEndpointBreakdownService(
      req.params.id as string,
    );

  res.status(200).json({
    success: true,
    endpoints,
  });
};