import { reportTypeError } from "ajv/dist/compile/validate/dataType.js";
import db from "../../models/index.js";
import BaseHandler from "../../utils/baseHandler.js";
import { getIO } from "../../config/socket.js";

const { Transaction } = db;

export default class CreateTransactionService extends BaseHandler {
  async run() {
    const {
      userId,
      transactionType,
      purpose,
      gcAmount,
      scAmount,
      referenceId,
      status = "completed",
    } = this.args;

    const { transaction } = this.context;

    try{
        // creating the transaction record
        const transactionRecord = await Transaction.create(
            {
                userId,
                transactionType,
                purpose,
                gcAmount,
                scAmount,  // psc
                referenceId,
                status
            },
            {transaction}
        )

        // emiting the transaction
        // get the global io instance
        const io = getIO();

        console.log("===========>");
        
        io.to(`user_${userId}`).emit("wallet_updated",{
          userId,
          purpose,
          gcAmount,
          scAmount
        })

        // return the created transaction
        return transactionRecord
    }
    catch(error){
        throw error;
    }
  }
}
