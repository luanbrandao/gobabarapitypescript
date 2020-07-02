// mapeamento os provedeis
import { container } from 'tsyringe';
import mailConfig from '@config//mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementarions/EtherealMailProvider';
import SESMailProvider from './implementarions/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
