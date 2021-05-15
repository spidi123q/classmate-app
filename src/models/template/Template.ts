import { TemplateType } from "./enum";
import IField from "./Field";
import ISection from "./Section";

export default interface ITemplate {
  templateId: number;
  type: TemplateType;
  name: string;
  sections: ISection[];
  fields: IField[];
}
