import { schemaHasRules } from "ajv/dist/compile/util.js";
import ajvInstance from "./ajvInstance.schema.js";

const schema = {
    type : "object",
    additionalProperties:false,
    // required:["firstName","lastName","email","password","permissions","roleId"],
    properties:{
        firstName:{
            type:"string",
            minLength:3,
            maxLength:25,
        },
        lastName:{
            type:"string",
            minLength:3,
            maxLength:25,        
        },
        email:{
            type:"string",
            format:"email",
        },
        password:{
            type:"string",
            minLength:6,
        },
        permissions:{
            type:"object",
            minProperties:1,
        },
        roleId:{
            type:"integer",
        }
        
    }
}

export default ajvInstance.compile(schema)