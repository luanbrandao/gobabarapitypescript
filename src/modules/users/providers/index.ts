import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// register, cria uma nova instância
// registerSingleton, instância apenas uma vez
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
