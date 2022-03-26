import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class SearchUserService {
  async search(search: string) {
    if (!search) {
      throw new Error("Por favor preencha o campo de busca");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefone like :search", { search: `%${search}%` })
      .orWhere("cidade like :search", { search: `%${search}%` })
      .orWhere("estado like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }
}

export { SearchUserService };