import mongoose from 'mongoose';

export function convertToObjectId(value: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(value);
}
