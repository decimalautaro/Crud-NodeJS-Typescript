import { Request, Response } from "express";
import { SearchUserService } from "../services/SearchUserService";

class SearchUserController {
  async handle(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchUserService = new SearchUserService();

    try {
      const users = await searchUserService.search(search);
      response.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Erro ao buscar usuário: ${err.message}`
      });
    }
  }
}

export { SearchUserController };