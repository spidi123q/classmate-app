import { object, string, number, date, array } from "yup";
import IClaim, { IClaimEdit } from "../../../../models/Claim";

//@ts-ignore
export const claimValidationScehma = object().shape<IClaimEdit>({
  title: string().required(),
  description: string().required(),
  location: object().required(),
  address: string().required("Location is needed"),
});
