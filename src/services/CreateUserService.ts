import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  username: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
}

class CreateUserService {
  async create({ username, email, telefone, cidade, estado }: IUser) {
    if (!username || !email || !telefone || !cidade || !estado) {
      throw new Error("Por favor preencha todos os campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("Username já está cadastrado");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email já está cadastrado");
    }

    const user = usersRepository.create({ username, email, telefone, cidade, estado });

    await usersRepository.save(user);

    return user;

  }
}

export { CreateUserService };