import bcrypt from "bcrypt";
import User from "../Schema/User.js";
import { formatDataToSend, generateUsername } from "../utils/utils.js";
import { getAuth } from "firebase-admin/auth";

//sign up controller
export const signUp = (req, res) => {
  const { fullname, email, password } = req.body;
  //
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  //validating full name length
  if (!fullname.length) {
    return res.status(403).json({ error: "fullname is required" });
  }
  if (fullname.length && fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "fullname must be atleast 3 characters long" });
  }
  //validating email
  if (!email.length) {
    return res.status(403).json({ error: "Email is required" });
  }
  //check if the email form is valid
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Invalid email" });
  }

  //check if the password form is valid
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long and should contain atleast one number and one uppercase and one lowercase character",
    });
  }
  //hashing the password
  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email);
    let user = new User({
      personal_info: {
        fullname: fullname,
        email,
        password: hashed_password,
        username,
      },
    });
    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res
            .status(500)
            .json({ error: "Email already exists", code: "11000" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
};

//sign in controller
export const signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res
          .status(403)
          .json({ error: "Email or password is incorrect" });
      }
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        user.personal_info.password
      );
      if (!isPasswordCorrect) {
        return res
          .status(403)
          .json({ error: "Email or password is incorrect" });
      } else {
        return res.status(200).json(formatDataToSend(user));
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
};

//google auth

export const googleAuth = async (req, res) => {
  const { access_token } = req.body;
  //
  getAuth()
    .verifyIdToken(access_token)
    .then(async (user) => {
      let { email, name, picture } = user;
      picture = picture.replace("s96-c", "s384-c");

      //checking if the user is already signed up
      let dbUser = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });

      //if we get the user from the db
      if (dbUser) {
        if (!dbUser.google_auth) {
          return res.status(403).json({
            error:
              "This email is  registered without google auth , please sign in with another email",
          });
        }
      } else {
        //if the user is not in the db
        let username = await generateUsername(email);
        dbUser = new User({
          personal_info: {
            email,
            fullname: name,

            username,
          },
          google_auth: true,
        });
        await dbUser
          .save()
          .then((u) => {
            dbUser = u;
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
      return res.status(200).json(formatDataToSend(dbUser));
    })
    .catch((err) => {
      return res.status(500).json({
        error:
          "Failed to authenticate with google . Please try again with another account",
      });
    });
};
