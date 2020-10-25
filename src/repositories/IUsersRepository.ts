//* Criação da interface de métodos que podem ser implementados por quem for fazer alguma alteração no banco de dados

import { User } from '../entities/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(User: User): Promise<void>;
}