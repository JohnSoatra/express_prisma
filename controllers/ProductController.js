const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await prisma.product.findMany({
                include: { category: true }
            });
            if (products) {
                res.json(products);
            } else {
                res.json({ message: 'no data' })
            }
        } catch(exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async getProduct(req, res) {    
        try {
            const product = await prisma.product.findFirst({
                where: { id: { equals: +req.params.id } }
            });
            if (product) {
                res.json(product);
            } else {
                res.json({ message: 'no data' });
            }
        } catch(exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async createProduct(req, res) {
        try {
            const product = await prisma.product.create({
                data: { name: req.query.name || "no name" }
            });
            if (product) {
                res.json(product);
            } else {
                res.send({ message: 'no data' });
            }
        } catch (exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const product = await prisma.product.delete({
                where: { id: +req.params.id }
            });
            if (product) {
                res.json(product);
            } else {
                res.send({ message: 'no data' });
            }
        } catch (exc) {
            res.json({ message: 'error', exc });
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await prisma.product.findFirst({
                where: { id: { equals: +req.params.id } }
            });
            const newProduct =  {
                name: req.query.name || product.name,
                created_at: req.query.created_at || product.created_at,
                category_id: +req.query.category_id || product.category_id,
                price: +req.query.price || product.price
            }
            const result = await prisma.product.update({
                where: { id: +req.params.id },
                data: { ...newProduct }
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

module.exports = ProductController;
