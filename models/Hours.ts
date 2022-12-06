import { Schema, models, model, Types } from "mongoose";




interface DailyHoursInterface {
    opening: number,
    closing: number
}

const DailySchema = new Schema({
  opening: {
    type: int,
    required: true,
  },
  closing: {
    type: int,
    required: true,
  },
});


interface HoursInterface {
    monday: DailyHoursInterface
    tuesday: DailyHoursInterface
    wednesday: DailyHoursInterface
    thursday: DailyHoursInterface
    friday: DailyHoursInterface
    saturday: DailyHoursInterface
    sunday: DailyHoursInterface
}


const HoursSchema = new Schema<HoursInterface>({
  monday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  tuesday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  wednesday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  thursday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  friday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  saturday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  sunday: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});



export default models?.HoursSchema ||
	model<HoursSchema>("Hours", HoursSchema);
