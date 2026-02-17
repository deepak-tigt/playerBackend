import db from "../models/index.js";

export default function contextMiddleware(transactionStatus = false) {
  return async (req, res, next) => {
    console.log("transaction middleware : ", req.method, req.path);

    if (!transactionStatus) {
      req.context = { transaction: null };
      return next();
    }

    // start a transaction 
    console.log("......starting transaction .......");
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
    } catch (error) {
      return next(error);
    }

    // pass transaciton in the req
    req.context = { transaction };

    let isTransacitonCompleted = false;
    
    const confirmTransation = async (statusCode) => {
      // executed when it is true
      if (isTransacitonCompleted) {
        return;
      }
      isTransacitonCompleted = true;

      try {
        if (statusCode >= 400) {
          console.log("========rollback ==========>");
          await transaction.rollback();
        } 
        else {
          console.log("======commit =============>");

          await transaction.commit();
        }
      } 
      catch (error) {
        console.log("Transaction falied : ", error);
      }
    };

    // here the express emits are used res.on(emiter,callback) ......
    res.on("finish", () => {
      console.log("=======finish is here==============>");

      void confirmTransation(res.statusCode);
    });
    res.on("close", () => {
      console.log("==========close is here =====>");
      if (!res.writableEnded) void confirmTransation(500);
    });

    return next();
  };
}
