import ajvInstance from "./ajvInstance.schema.js";

const schema = {
    type:"object",
    additionalProperties:false,
    required:["name","categoryId"],
    properties:{
        name:{
            type:"string",
            minLength:3,
            maxLength:50,
        },
        categoryId:{
            type:"integer",
        }
    }
} 

export default ajvInstance.compile(schema);