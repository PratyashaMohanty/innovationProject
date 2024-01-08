const mongoose = require("mongoose");

const bcrypt = require("bcryptjs")


//create a new schema by taking three infos: name and the address, symbol
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords don't match!",
        },
    },
    address: String,
    privateKey: String,
    mnemonic: String,
})



// Define the correctPassword method
// userSchema.methods.correctPassword = async function (candidatePassword) {
//     try {
//         return bcrypt.compare(candidatePassword, this.password);
//     } catch (error) {
//         throw new Error(error);
//     }
// };

userSchema.pre("save", async function (next) {
    //run this fxn if pasword was modified
    if (!this.isModified("password")) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //delete the password confirm field:
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    //this points to the current query 
    this.find({ active: { $ne: false } });
    next();
})

//export the module:
// module.exports = Token;
const User = mongoose.model('User', userSchema);

module.exports = User;