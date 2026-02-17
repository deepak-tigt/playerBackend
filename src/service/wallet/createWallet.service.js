import db from "../../models/index.js";
import BaseHandler from "../../utils/baseHandler.js";
import { STATUS_TYPE } from "../../utils/constants.js";

const {Wallet} = db;

export default class CreateWalletService extends BaseHandler {
    
    async run(){
        const {userId,currencyCode} = this.args;
        const {transaction} = this.context

       try{
         // check if wallet aready exits 
        let wallet = await Wallet.findOne(
            { where: { userId, currencyCode } ,transaction},
        );

        // if wallet exits then return it 
        if(wallet){
            return wallet
        }

        // not exist then create waallet with balance 0
        wallet = await Wallet.create(
            {
                userId,
                currencyCode,
                balance:0,
                status:STATUS_TYPE.ACTIVE
            },
            {transaction}
        )

        return wallet;
       }

       catch(error){
        throw error;
       }
    }
}