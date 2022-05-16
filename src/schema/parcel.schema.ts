import { number, object, string } from "yup";

export const createParcelSchema = object({
  body: object({
    length: number().required("Parcel length is required"),
    width: number().required("Parcel width is required"),
    height: number().required("Parcel height is required"),
    weight: number().required("Parcel weight is required"),
  }),
});
