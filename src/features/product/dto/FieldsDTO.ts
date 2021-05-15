import { filter, find, findIndex, includes, isEmpty } from "lodash";
import IField from "../../../models/template/Field";

export default class FieldsDTO {
  private readonly fields: IField[] = [];

  constructor(fields: IField[]) {
    this.fields = [...fields];
  }

  getFields(...keys: string[]): IField[] {
    if (!isEmpty(keys)) {
      const fields = filter(this.fields, (field) => includes(keys, field.key));
      return fields;
    }
    return this.fields;
  }

  remove(key: string): FieldsDTO {
    const fields = this.fields.filter((field) => field.key !== key);
    return new FieldsDTO(fields);
  }

  find(key: string): IField | undefined {
    return find(this.fields, { key });
  }

  replace(field: IField): FieldsDTO {
    const index = findIndex(this.fields, { key: field.key });
    this.fields[index] = field;
    return new FieldsDTO(this.fields);
  }
}
