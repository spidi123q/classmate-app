import { find, isEmpty, remove } from "lodash";
import IField from "../../../models/template/Field";
import ISection from "../../../models/template/Section";
import ITemplate from "../../../models/template/Template";

export default class TemplateDTO {
  private readonly template: ITemplate;
  private allFields: IField[] = [];

  constructor(template: ITemplate) {
    this.template = { ...template };
    this.allFields = [...this.template.fields];
  }

  getTemplate() {
    return this.template;
  }

  getSection(name: string): ISection | undefined {
    const section = find(this.template.sections, { name });
    return section;
  }

  getFields(sectionName: string): IField[] {
    const section = this.getSection(sectionName);
    if (section) {
      return section.fields;
    }
    return [];
  }

  private genAllFields(sections: ISection[]) {
    for (const section of sections) {
      this.allFields = [...this.allFields, ...section.fields];
      if (!isEmpty(section.sections)) {
        this.genAllFields(section.sections);
      }
    }
  }

  getAllFields(): IField[] {
    this.genAllFields(this.template.sections);
    return this.allFields;
  }
}
