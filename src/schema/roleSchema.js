import ajvInstance from "./ajvInstance.schema.js";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "level", "permissions"],
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength:50,
    },
    level: {
      type: "integer",
      minimum:1,
      maximum:4,
    },
    permissions: {
      type: "object",
      minProperties:1,
    },
  },
};

export default ajvInstance.compile(schema);
