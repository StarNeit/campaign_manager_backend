// @ts-ignore
import data from './data.json';
import { CampaignModel } from '../models';
import '../config/mongoose';

const { campaigns } = data;

(async () => {
  await CampaignModel.deleteMany({});

  for (const campaign of campaigns) {
    const paper = await new CampaignModel(campaign);
    await paper.save();
  }

  console.log('Seeding initial database is finished successfully');
})();
