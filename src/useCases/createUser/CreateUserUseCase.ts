//* A classe apenas verifica se o usuário já existe ou não, e caso não exista ele cria um novo usuário

import { User } from '../../entities/User';
import { IMailProvider } from '../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './ICreateUserDTO';

export class createUserUseCase {
  
  //* Utilizando a interface UsersRepository para fazer a regra de négocio de criação de um novo usuário:
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}
  
  async execute(data: ICreateUserRequestDTO){
    
    //? Fazendo a verificação se o usuário existe ou não:
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    //! Caso ele exista, um erro é jogado:  
    if(userAlreadyExists){
      throw new Error('User already exists')
    }

    //! Caso ele não exista, um novo usuário é criado
    const user = new User(data);

    await this.usersRepository.save(user);

    //! Após executar a criação do usuário, envia um email para comprovar a criação
    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe do meu app',
        email: 'Equipe@meuapp.com'
      },
      subject: 'Seja bem vindo a plataforma',
      body:  '<p>Você já pode fazer login em nossa plataforma</p>'
    })

  }
}