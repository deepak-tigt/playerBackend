import stripe from "../../libs/connection/stripe.js";

// creating the checkout
async function createCheckoutSession(productData) {
    const {userId,usd} = productData;

    if(!userId){
        throw new Error("userId required !")
    }
    if(!usd || usd<0){
        throw new Error("invalid amount")
    }
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    currency: "usd",
                    product_data:{
                        name:`${usd}_package`
                    },
                    unit_amount:usd*100 // converting in to cents                    
                },
                quantity:1
            },
        ],
            payment_method_types:["card"],
            mode:"payment",

            success_url:`${process.env.BACKEND_URL}/api/v1/success`,
            cancel_url:`${process.env.BACKEND_URL}/api/v1/cancel`
    })

    return session; 
}

export default createCheckoutSession;