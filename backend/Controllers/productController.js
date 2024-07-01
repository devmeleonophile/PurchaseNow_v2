
import Products from '../Model/ProductSchema.js';

export const getProducts = async(req, res) =>{
    const products = await Products.find({});
    res.json(products);
}

export const getProductsById = async(req,res) =>{
    const product = await Products.findById(req.params.id);
    res.json(product);
}

