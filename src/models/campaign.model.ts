import mongoose, { PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface ICampaign {
  name: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  start_date: Date;
  end_date: Date;
}

interface CampaignDoc extends mongoose.Document {
  name: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  start_date: Date;
  end_date: Date;
}

interface NewsPaperModelInterface extends mongoose.Model<ICampaign> {}

const campaignSchema = new mongoose.Schema(
  {
    name: String,
    budget: Number,
    status: {
      type: String,
      enum: ['active', 'paused', 'completed'],
      default: 'active',
    },
    start_date: Date,
    end_date: Date,
  },
  { timestamps: true }
);

campaignSchema.plugin(paginate);

export const CampaignModel = mongoose.model<
  CampaignDoc,
  PaginateModel<NewsPaperModelInterface>
>('Campaign', campaignSchema);
