import * as yup from 'yup';

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

declare module 'yup' {
  // eslint-disable-next-line no-unused-vars
  interface StringSchema {
    objectId(): this;
  }
}

yup.addMethod(yup.string, 'objectId', function (message) {
  return this.test('objectId', message || 'Invalid ObjectId', function (value) {
    const { path, createError } = this;
    return (
      value == null ||
      objectIdRegex.test(value) ||
      createError({ path, message: message || 'Invalid ObjectId' })
    );
  });
});

export const getOneCampaignSchema = yup.object({
  params: yup.object({
    id: yup.string().objectId().required(),
  }),
});

export const createCampaignSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    budget: yup.number().required(),
    status: yup.string().oneOf(['active', 'paused', 'completed']).required(),
    start_date: yup.date().required(),
    end_date: yup.date().required(),
  }),
});

export const updateCampaignSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    budget: yup.number().required(),
    status: yup.string().oneOf(['active', 'paused', 'completed']).required(),
    start_date: yup.date().required(),
    end_date: yup.date().required(),
  }),
  params: yup.object({
    id: yup.string().objectId().required(),
  }),
});
