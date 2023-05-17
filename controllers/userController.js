const DataModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const createToken = require('../utils/createToken');


// User Create 
exports.createUser = async (req, res) => {
  const reqBody = req.body;
  const email = reqBody.email;
  const ExistingUser = await DataModel.findOne({ email: email });

  if (!ExistingUser) {
    const NewUser = await DataModel.create(reqBody);
    res.status(200).json({ status: "success", data: NewUser });
  } else {
    res.status(400).json({ status: "fail", message: "Email already exists" });
  }
};

// User Login
exports.login = async(req, res) => {
  const {email, password} = req.body;
  const findUser = await DataModel.findOne({email});
  const passwordMatched = await findUser.isPasswordMatched(password)
  
  if (findUser && passwordMatched) {
    const  data = {
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: createToken(findUser?._id)
    }
    res.status(200).json({ status: "success", data: data });  
  } 
  else {
    res.status(400).json({ status: "fail", message: "Invalid Credential" });
  }
}

// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Sorry! Error Ocurred" });
  }
}

// Get single User
exports.getUser = async (req, res) => {
  const {id} = req.params;
  try {
    const data = await DataModel.findById(id)
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error  });
  }
}

//Delete User
exports.deleteUser = async (req, res) => {
  let {id} = req.params;
  try {
    const deleteData = await DataModel.findByIdAndDelete(id)
    res.status(200).json({ status: "success", data: deleteData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error  });
  }
}

//Update User
exports.updateUser = async (req, res) => {
  let {id} = req.params;
  let reqBody = req.body;
  let Data = {
    id,
    firstName: reqBody?.firstName,
    lastName: reqBody?.lastName,
    email: reqBody?.email,
    mobile: reqBody?.mobile,}
  try {
    const updatedData = await DataModel.findByIdAndUpdate(id, Data)
    res.status(200).json({ status: "success", data: Data });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error  });
  }
}