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
    const order = await orderSchema.findById(req.params.id);

    if(order){

        order.isPaid = true,
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            updated_At : req.body.updated_At,
            email_Address : req.body.email_Address
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder)

    }else{
        res.status(404).send({message : 'Not paid for the order'});
    }
}
//Admin
const updateOrdersToDelivered = async(req, res)=>{
    
     const order = await orderSchema.findById(req.params.id);

     if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = order.save();

        res.status(200).json(updatedOrder);
     }else{
        res.status(404).json({message : 'cannot update'})

     }

}

//Admin
const getAllOrders = async(req, res)=>{
    const orders = await orderSchema.find({}).populate('user', 'id name');
    res.status(200).json(orders);
}

export {
    addOrderItems,
    getMyorder,
    getOrderById,
    updateOrdersToPaid,
    updateOrdersToDelivered,
    getAllOrders
}