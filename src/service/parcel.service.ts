import Parcel from "../model/parcel.model";

const EasyPost = require("@easypost/api");

require("dotenv").config();

// Eazypost Api Key
const easypostApiKey = process.env.EAZYPOST_API_KEY as string;


// Failing to load environment variable before initializing api
const api = new EasyPost(
  "EZTK4a1ecf72efac418fb73fb1ad745902a6vajdzFfaiD28TsdBqnqSqQ"
);

type createParcelInput = {
  length: number;
  width: number;
  height: number;
  weight: number;
};

export async function createParcel(input: createParcelInput, userId: string) {
  let parcel = {
    length: input.length * 0.3937,
    width: input.width * 0.3937,
    height: input.height * 0.3937,
    weight: input.weight * 0.035274,
  };

  const createdParcel = new api.Parcel(parcel);

  await createdParcel.save();

  try {
    return await Parcel.create({ userId: userId, id: createdParcel.id });
  } catch (error) {
    return error;
  }
}

export async function getParcel(parcelId: string) {
  let retrievedParcel =  await api.Parcel.retrieve(parcelId);
  retrievedParcel.length= retrievedParcel.length/0.3937
  retrievedParcel.width= retrievedParcel.width/0.3937
  retrievedParcel.height= retrievedParcel.height/0.3937
  retrievedParcel.weight= retrievedParcel.weight/0.035274

  return retrievedParcel;


}

export async function getParcels(userId: string) {
  return await Parcel.find({ userId: userId });
}
