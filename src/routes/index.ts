import { Router } from 'express';
import campaignRouter from './campaign.router';

const RootRouter = Router();

RootRouter.use('/campaign', campaignRouter);

export default RootRouter;
