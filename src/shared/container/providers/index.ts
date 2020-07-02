import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementarions/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementarions/SESMailProvider';

import IMailTemplateProvider from './MailTemplatProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplatProvider/implementatios/HandlebarsMailTemplateProvider';

// registerSingleton, não chama o construct
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

// registerSingleton, chama o construct
container.registerInstance<IMailProvider>(
  'MailProvider',
  // new EtherealMailProvider(),
  // EtherealMailProvider tbm depende de injeção de dependência

  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
