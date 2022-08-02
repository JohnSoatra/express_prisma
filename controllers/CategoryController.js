const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await prisma.category.findMany({});
            if (categories) {
                res.json(categories);
            } else {
                res.json({ message: 'no data' });
            }
        } catch(exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async getCategory(req, res) {    
        try {
            const category = await prisma.category.findFirst({
                where: { id: { equals: +req.params.id } }
            });
            if (category) {
                res.json(category);
            } else {
                res.json({ message: 'no data' });
            }
        } catch(exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async createCategory(req, res) {
        try {
            const category = await prisma.category.create({
                data: { name: req.query.name }
            });
            if (category) {
                res.json(category);
            } else {
                res.json({ message: 'no data' });
            }
        } catch(exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const category = await prisma.category.delete({
                where: { id: +req.params.id }
            });
            if (category) {
                res.json(category);
            } else {
                res.send({ message: 'no data' });
            }
        } catch(exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async updateCategory(req, res) {
        try {
            const category = await prisma.category.findFirst({
                where: { id: { equals: +req.params.id } }
            });
            const newCategory =  { name: req.query.name || category.name }
            const result = await prisma.category.update({
                where: { id: +req.params.id },
                data: { ...newCategory }
            });
            if (result) {
                res.json(result);
            } else {
                res.json({ message: 'no data' });
            }
        } catch (exc) {
            res.json({ message: 'error', exc });
        }
    }

}

module.exports = CategoryController;
