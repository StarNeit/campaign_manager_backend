import { Router } from 'express';
import { list, create, get, update, remove } from '../controllers';
import {
  createCampaignSchema,
  getOneCampaignSchema,
  updateCampaignSchema,
  validate,
} from '../validation';

const campaignRouter = Router();

campaignRouter.get('/', list);
campaignRouter.get('/:id', validate(getOneCampaignSchema), get);
campaignRouter.post('/', validate(createCampaignSchema), create);
campaignRouter.put('/:id', validate(updateCampaignSchema), update);
campaignRouter.delete('/:id', validate(getOneCampaignSchema), remove);

export default campaignRouter;
