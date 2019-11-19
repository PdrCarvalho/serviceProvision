import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    canceled_at: {
      type: Date,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company:{type:mongoose.Schema.Types.ObjectId, ref: 'Company'},
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Appointment', AppointmentSchema);