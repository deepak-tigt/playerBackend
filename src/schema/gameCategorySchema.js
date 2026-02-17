import ajvInstance from "./ajvInstance.schema";

const schema = {
  type: "object",
  additionalProperties:false,
  required:["name","description"],
  properties:{
    name:{
        type:"string",
        minLength:3,
        maxLength:25,
    },
    description:{
        type:"string",
        minLength:3,
        maxLength:255,
    }
  }
};

export default ajvInstance.compile(schema)