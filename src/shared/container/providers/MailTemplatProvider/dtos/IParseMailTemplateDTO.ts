interface ITemplateCariables {
  [key: string]: string | number;
}
export default interface IParseMailTemplateDTO {
  // template: string;
  file: string;
  variables: ITemplateCariables;
}
