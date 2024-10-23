import { Request, Response, NextFunction } from 'express';
import { CampaignModel } from '../models';
import { handleError } from '../utils/handleError';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const total = await CampaignModel.countDocuments();
    const all = await CampaignModel.find();

    res.json({
      data: all,
      total
    });
  } catch (err) {
    next(err);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const campaign = await CampaignModel.findOne({ _id: id });

    if (!campaign) {
      handleError(res, 400, 'Campaign does not exist');
    }

    res.json({
      data: campaign,
    });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const campaign = await new CampaignModel(req.body);
    await campaign.save();

    res.status(201).json({
      message: 'Successfully created',
    });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const campaign = await CampaignModel.findOne({ _id: id });

    if (!campaign) {
      handleError(res, 400, 'Campaign does not exist');
    }

    await CampaignModel.updateOne({ _id: id }, req.body);

    res.status(200).json({
      message: 'Successfully updated',
    });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const exist = await CampaignModel.exists({ _id: id });

    if (exist) {
      await CampaignModel.deleteOne({ _id: id });

      res.status(200).json({
        message: 'Successfully deleted',
      });
    } else {
      handleError(res, 400, 'Campaign does not exist');
    }
  } catch (err) {
    next(err);
  }
}
