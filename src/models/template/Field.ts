import { FieldType } from "./enum";

export default interface IField {
  name: string;
  key: string;
  readonly: boolean;
  fields: IField[];
  type: FieldType;
  unit?: string;
  Component?: JSX.Element;
}
