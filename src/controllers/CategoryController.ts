import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";


class CategoryController {

    async create(request: Request, response: Response) {
        const { name } = request.body;
    
        const createCategoryService = new CategoryService();
    
        try {
            await createCategoryService.create({
                name

            }).then(() => {
                response.render("./category/category-message", {
                message: "Categoria registrado con exito"
            });
            });
        } catch (err) {
            response.render("./category/category-message", {
            message: `Error al registrar la categoria: ${err.message}`
            });
        }
    
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteCategoryService = new CategoryService();
    
        try {
            await deleteCategoryService.delete(id).then(() => {
                response.render("./category/category-message", {
                message: "Categoria eliminada con exito"
            });
        });
        } catch (err) {
            response.render("./category/category-message", {
            message: `Error al eliminar la categoria: ${err.message}`
            });
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const editCategorytDataService = new CategoryService();
    
        const category = await editCategorytDataService.edit(id);
    
        return response.render("./category/category-edit", {
            category: category
        });
    }


    async list(request: Request, response: Response) {
        const listCategoryService = new CategoryService();
    
        const category = await listCategoryService.list();
    
            return response.render("./category/category", {
                category: category
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchCategoryService = new CategoryService();
    
        try {
            const category = await searchCategoryService.search(search);
            response.render("./category/category-search", {
                category: category,
                search: search
        });
        } catch (err) {
            response.render("./category/category-message", {
            message: `Error al buscar la categoria: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, name} = request.body;
    
        const updateCategoryService = new CategoryService();
    
        try {
            await updateCategoryService.update({ id, name }).then(() => {
                response.render("./category/category-message", {
                message: "Categoria actualizada con exito"
            });
        });
        } catch (err) {
            response.render("./category/category-message", {
            message: `Error al actualizar la categoria: ${err.message}`
        });
        }
    
    }


}


export default CategoryController;