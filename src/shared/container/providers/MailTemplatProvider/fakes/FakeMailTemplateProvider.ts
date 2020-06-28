import IMailTemplateProvider from '../models/IMailTemplateProvider';
// import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  // public async parse({
  //   template,
  //  // variables,
  // }: IParseMailTemplateDTO): Promise<string> {
  public async parse(): Promise<string> {
    return 'Mail template';
  }
}

export default FakeMailTemplateProvider;
