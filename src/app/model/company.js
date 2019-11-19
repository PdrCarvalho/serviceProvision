import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type:String,
      required: true,
    },
    service: {
        type:String,
        required: true,
      },
    description: {
        type:String,
      },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Company', CompanySchema);