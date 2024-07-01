import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderList: [{
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        qty: {
            type: Number,  // Change to Number if quantity should be a number
            required: true
        },
        price: {
            type: Number,  // Change to Number if price should be a number
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,  // Fix the typo here
            required: true,
            ref: "Product"
        }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updatedAt: { type: String },
        emailAddress: { type: String }
    },
    itemNumbers: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {  // Changed to camelCase to follow JS conventions
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
