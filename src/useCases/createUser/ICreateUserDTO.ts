//** DTO -> DATA TRANSFER OBJECT: interface de 'modelo' de dados que ira ser transferido na criação de um usuário

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}