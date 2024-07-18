import orderSchema from '../Model/orderSchema.js';

const addOrderItems = async(req, res) =>{
    const {
        orderList,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
        
    } = req.body;

    if(orderList && orderList.length === 0){
        res.status(400).json({message : "No orders found"});
    }else{
        const orders = new orderSchema({
            orderList : orderList.map((item) =>({
             ...item,
             product : item._id,
             _id : undefined
            })),
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        })

        const createOrder = await orders.save();
        res.status(201).json(createOrder);

    }

}

const getMyorder = async(req, res)=>{
    const order = await orderSchema.find({user : req.user._id});
    if(order){
        res.status(200).json(order);
    }else{
        res.status(400).json({message : "No orders found"});
    }
}
const getOrderById = async(req, res) =>{
    const order = await orderSchema.findById(req.params.id).populate('user', 'name email');
    console.log(order,'orders')
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404).json({message : "No orders found"});
    }
}
//Admin
const updateOrdersToPaid = async(req, res)=>{
    res.send('update orders to paid');
}
//Admin
const updateOrdersToDelivered = async(req, res)=>{
    res.send('update orders to be delivered');
}

//Admin
const getAllOrders = async(req, res)=>{
    res.send('All orders')
}

export {
    addOrderItems,
    getMyorder,
    getOrderById,
    updateOrdersToPaid,
    updateOrdersToDelivered,
    getAllOrders
}