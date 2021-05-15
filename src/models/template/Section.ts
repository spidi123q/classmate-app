import IField from "./Field";

export default interface ISection {
  name: string;
  collapsed: boolean;
  sections: ISection[];
  fields: IField[];
}
