const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');

let UserSchema = new mongoose.schema({
  email: {
    type: String,
    trim: true,
    minLength: 1,
    required: true,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens = user.tokens.concat([{ access, token }]);
};

let User = mongoose.model('User', UserSchema);

module.exports = { User };
