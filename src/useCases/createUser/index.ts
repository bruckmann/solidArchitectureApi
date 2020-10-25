import { MailTrapMailProvider } from "../../providers/implementations/IMailTrapMailProvider"
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository"
import { CreateUserController } from "./createUserController";
import { createUserUseCase } from "./CreateUserUseCase";

const postgresUsersRepository = new PostgresUserRepository();
const mailTrapMailProvider = new MailTrapMailProvider();

const createUserCase = new createUserUseCase(
  postgresUsersRepository,
  mailTrapMailProvider
)

const createUserController = new CreateUserController(createUserCase)

export {createUserCase, createUserController}