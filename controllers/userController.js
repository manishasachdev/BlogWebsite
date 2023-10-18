const User = require("../models/User");
const uploadPicture = require("../middlewares/UploadMiddlewarePicture");
const fileRemover=require('../utils/fileRemoves')


exports.registerUser = async (req, res) => {
  try {
    // Send the data as a response
    const { name, email, password } = req.body;
    
      // check if user already exist or not 
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({message:"User already exist"})
      }

      // create new user 
      user = await User.create({
          name, 
          email, 
          password
      })
      
      return res.status(200).json({
        _id: user._id,
        avtar: user.avtar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });

  }
  catch (error) {
      console.error("Error in registerUser:", error);

    res.status(500).json({
      status: "error",
      message: "Error in registerUser",
    });
  }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
             return res.status(400).json({ message: "Email not found" });
        }
        if (await user.comparePassword(password)) {
             return res.status(200).json({
               _id: user._id,
               avtar: user.avtar,
               name: user.name,
               email: user.email,
               verified: user.verified,
               admin: user.admin,
               token: await user.generateJWT(),
             });
        } else {
               return res.status(400).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
         console.error("Error in Login:", error);

         res.status(500).json({
           status: "error",
           message: "Error in login",
         });
        
    }
}

exports.userProfile = async (req, res) => {
    try {
  
        let user = await User.findById(req.user._id);
        if (user) {
            return res.status(200).json({
              _id: user._id,
              avtar: user.avtar,
              name: user.name,
              email: user.email,
              verified: user.verified,
              admin: user.admin,
            
            });
        }
        else {
            res.status(500).json({
              status: "error",
              message: "User not found",
            });
        }
    } catch (error) {
         console.error("Error in Login:", error);

         res.status(500).json({
           status: "error",
           message: "User not found",
         });
    }
}



exports.updateProfile = async (req, res) => {
  try{
    let user = await User.findById(req.user._id);
    if (!user) {
       return res.status(400).json({ message: "User not found!!" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
       if (req.body.password.length < 6) {
         return res
           .status(400)
           .json({ message: "Password must be greater than 6 char" });
       } else {
         user.password = req.body.password;
       }
    }
   

    const updatedUserProfile = await user.save();
    res.json({
      _id: updatedUserProfile._id,
      avtar: updatedUserProfile.avtar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  }
  catch (error) {
    console.log('ERr', error)
    return res.status(400).json({ message: "User not found***" });
  }
}

exports.updateProfilePicture =  async(req, res) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Unknown error updating profile pic", err});
      } else {
        if (req.file) {
          const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            avtar:req.file.filename
          }, { new: true })
          console.log('upda', updatedUser)
          res.json({
            _id: updatedUser._id,
            avtar: updatedUser.avtar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          })
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id)
          filename = updatedUser.avtar;
          updatedUser.avtar = "";
          await updatedUser.save();
          fileRemover(filename)
          res.json({
            _id: updatedUser._id,
            avtar: updatedUser.avtar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          })

        }
      }
    })
  }
  catch (error) {
    console.log('ERr', error)
    return res.status(400).json({ message: "Error in updating profile pic" });
  }
}
