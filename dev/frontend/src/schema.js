let schema = {
  properties: {
    email: {
      type: "string",
      maxLength: 255,
      format: "email",
      required: true,
      allowEmpty: false
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 60,
      required: true,
      allowEmpty: false
    },
    username: {
      type: "string",
      minLength: 8,
      maxLength: 60,
      required: true,
      allowEmpty: false
    }
  }
};

export default schema;
