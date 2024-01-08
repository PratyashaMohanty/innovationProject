const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Token = require("../Model/tokenModel");
const Account = require("../Model/accountModel");



//function for sign in:
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//function for creating and sending token:
const createSendToken = (user, statusCode, req, res) => {
    // const token = signToken(user._id);
    //build the cookie
    res.cookie("jwt", Token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });



    //remove password from output: since we don't want ot display the password upon account creation
    user.password = undefined
    res.status(statusCode).json({
        status: "success",
        Token,
        data: {
            user,
        },
    });
}

//  function for sign up:
exports.signUp = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        address: req.body.address,
        privateKey: req.body.privateKey,
        mnemonic: req.body.mnemonic,
    });
    createSendToken(newUser, 201, req, res);
};

//function for login:
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    //1. check if email and password exist:
    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            message: "Please provide email and password!",
        });
    }
    // 2. check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
        });

    }

    //3. if all is ok, send the token to client and user can login
    createSendToken(user, 200, req, res);

};

//function to get all the tokens:
exports.allToken = async (req, res, next) => {
    const token = await Token.find();
    //send response
    res.status(200).json({
        status: "success",
        data: {
            token,
        },
    });
};

//function to add a new token:
exports.addToken = async (req, res, next) => {
    const createToken = await Token.create({
        name: req.body.name,
        address: req.body.address,
        symbol: req.body.symbol,
    });

    //send response:

    res.status(201).json({
        status: "success",
        data: {
            createToken,
        },
    });
};

//function to get all accounts:
exports.allAccount = async (req, res, next) => {
    const accounts = await Account.find();

    //send response:
    res.status(200).json({
        status: "success",
        data: {
            accounts,
        },
    });
};

//function to create an account:
exports.createAccount = async (req, res, next) => {
    const account = await Account.create({
        privateKey: req.body.privateKey,
        address: req.body.address,
    });
    //send response to user
    res.status(201).json({
        status: "success",
        data: {
            account,
        },
    });
};

