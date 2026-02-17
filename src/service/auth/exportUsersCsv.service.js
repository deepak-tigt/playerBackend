
import BaseHandler from "../../utils/baseHandler.js";
import db from "../../models/index.js"
import createCsvWriter from "csv-writer"
import path from "path"
import fs from "fs"

const { User } = db;

const BATCH_SIZE = 10000;

export default class ExportUsersCsvService extends BaseHandler {
    
    async run(){
        try{
            // total users in table
            const totalUsers = await User.count();
            console.log(`total user to expoet : ${totalUsers}`);

            if(totalUsers===0){
                throw new Error("no users found in teh database !")
            }

            // now creating folder and file path 
            const fileName = `users_${Date.now()}.csv`;
            const filePath = path.join(process.cwd(),"exports",fileName);

            // creating the exports folder if not exists 
            const exportsDir = path.join(process.cwd(),"exports");
            if(!fs.existsSync(exportsDir)){ // existsSync(path) : check if the folder exist in the given path 
                fs.mkdirSync(exportsDir,{recursive:true});  // mkdirSync(path,option) : 
                console.log(`created exports folder at: ${exportsDir}`);
            }

            // csv file structure 
            const csvWriter = createCsvWriter.createObjectCsvWriter({
                path:filePath, // where to save the CSV
                header:[
                    { id: "id", title: "ID" },
                    { id: "firstName", title: "First Name" },
                    { id: "lastName", title: "Last Name" },
                    { id: "email", title: "Email" },
                    { id: "isEmailVerified", title: "Email Verified" },
                    { id: "createdAt", title: "Created At" },
                ]
            })

            let processedCount = 0;
            
            //  loop for the batch 
            for(let i=0;i < totalUsers;i += BATCH_SIZE){
                console.log(`processing batch : records ${i} to ${i+BATCH_SIZE}`);

                const users = await User.findAll({
                    attributes:[
                        "id","firstName","lastName","email","isEmailVerified","createdAt"
                    ],
                    offset:i,
                    limit:BATCH_SIZE,
                    order:[["id","ASC"]],
                    raw: true, // using it to get the plain object from teh db without metadata 
                })

                // write this batch in the csv file 
                if(users.length > 0){
                    await csvWriter.writeRecords(users); //converts them into CSV rows
                    processedCount += users.length;

                    console.log(`written ${processedCount}/${totalUsers}`);
                }
            }
            console.log(`CSV file saved at : ${filePath}`);

            return {
                success:true,
                filePath,
                fileName,
                totalRecords: totalUsers,
                message: ` Exported ${totalUsers} users to CSV`
            }
        }
        catch(error){
            console.log("CSV Export Error : ",error);
            throw error
            
        }
    }
}