
import Products from '../Model/ProductSchema.js';

export const getProducts = async(req, res) =>{
    const products = await Products.find({});
    res.json(products);
}

export const getProductsById = async(req,res) =>{
    const product = await Products.findById(req.params.id);
    res.json(product);
}

export const createProduct = async(req, res) =>{
    const product = new Products({
        name: 'samsung',
    image: '/images/phone.jpg',
    user : req.user._id,
    description:
      'Introducing the samsung. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Samsung',
    category: 'Electronics',
    price: 599.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    })

    const newProduct = await product.save();

    res.json(newProduct);
}

export const updateProduct = async(req, res)=>{

    const {name,image,description,brand,category,price,countInStock} = req.body

    const product = await Products.findById(req.params.id);

    if(product){
        
        product.name = name,
        product.description = description,
        product.brand = brand,
        product.category = category,
        product.price = price,
        product.countInStock = countInStock

        if(image){
            product.image = image;
        }
       
        const updatedProduct = await product.save();
        res.json(updatedProduct);
        console.log(updatedProduct);
    }else{
        res.status(404);
        throw new Error('Item not Found');
    }

}

