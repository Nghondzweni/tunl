import mongoose from "mongoose";

const ParcelSchema = new mongoose.Schema(
  {
    userId: { type: String },
    id: { type: String },
  },
  { timestamps: true }
);

const Parcel = mongoose.model("Parcel", ParcelSchema);

export default Parcel;
