import mongoose from "mongoose";

const CoordinateSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
});

const FarmSchema = new mongoose.Schema({
  owner_id: Number,
  name: String,
  cityId: Number,
  cityName: String,
  barangayName: String,
  coordinates: CoordinateSchema,
  totalTrees: Number,
  dnaVerifiedCount: Number,
  hasDnaVerified: Boolean,
  boundary: [[Number]], // [ [lat, lng], ... ]
}, { timestamps: true });

export default mongoose.model("Farm", FarmSchema);
