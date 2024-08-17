const password = require("../models/Password");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
require('dotenv').config();


const secretKey = process.env.YourSecretKey;
 // Replace with your secret key

function encryptData(data) {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
}

function decryptData(encryptedData) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedData;
}


/**
 * GET /
 * password
*/

exports.password = async (req, res) => {
 
  let perPage = 10;
  let page = req.query.page || 1;
  const locals = {
    
    title: "VaultLock",
    description: "NoteGuard.",
  };

  try {
    password.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } }
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function(err, passwords) {
        password.count().exec(function (err, count) {
          if (err) return next(err);
          res.render("password/index", {
            userName: req.user.firstName,
            locals,
            passwords,
            layout: "../views/layouts/password",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * View Specific Note
 */
exports.passwordViewNote = async (req, res) => {
 
  const passwordItem = await password.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (passwordItem) {
    passwordItem.password = decryptData(passwordItem.password);
    res.render("password/view-password", {
      passwordID: req.params.id,
      password:passwordItem,
      layout: "../views/layouts/password",
    });
  } else {
    res.send("Something went wrong.");
  }
};

/**
 * PUT /
 * Update Specific Note
 */
exports.passwordUpdateNote = async (req, res) => {
  try {
    await password.findOneAndUpdate(
      { _id: req.params.id },
      { website: req.body.website, username:req.body.username, password:encryptData(req.body.password), category: req.body.category, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/password");
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE /
 * Delete Note
 */
exports.passwordDeleteNote = async (req, res) => {
  try {
    await password.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/password");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Add Notes
 */

exports.passwordAddNote = async (req, res) => {
  res.render("password/add", {
    layout: "../views/layouts/password",
  });
};




/**
 * POST /
 * Add Notes
 */
exports.passwordAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    req.body.password = encryptData(req.body.password);
    await password.create(req.body);
    res.redirect("/password");
  } catch (error) {
    console.log(error);
  }
};



exports.passwordAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;

    // Encrypt the password
    const plainPassword = req.body.password;
    const encryptedCriticalData = encryptData(plainPassword);
    req.body.password = encryptedCriticalData;

    await password.create(req.body);
    res.redirect("/password");
  } catch (error) {
    console.log(error);
  }
};



/**
 * POST /
 * Search For Notes
 */
exports.passwordSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await password.find({
      $or: [
        { website: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { category: { $regex: new RegExp(searchNoSpecialChars, "i") } }
      ],
    }).where({ user: req.user._id });

    res.render("password/search", {
      searchResults,
      layout: "../views/layouts/password",
    });
  } catch (error) {
    console.log(error);
  }
};