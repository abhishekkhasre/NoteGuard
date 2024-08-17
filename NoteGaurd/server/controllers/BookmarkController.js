const Bookmark = require("../models/Bookmark");
const mongoose = require("mongoose");

/**
 * GET /
 * bookmark
*/

exports.bookmark = async (req, res) => {  
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "WebArchive",
    description: "NoteGuard.",
  };

  try {
    Bookmark.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: 1,
          url: 1,
          body: { $substr: ["$body", 0, 150] },
          tags:1
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, bookmarks) {
        Bookmark.count().exec(function (err, count){
          if (err) return next(err);
          res.render("bookmark/index", {
            userName: req.user.firstName,
            locals,
            bookmarks,
            layout: "../views/layouts/bookmark",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  }catch (error) {
    console.log(error);
  }
};




/**
 * GET /
 * View Specific Note
 */
exports.bookmarkViewNote = async (req, res) => {
  const bookmark = await Bookmark.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (bookmark) {
    res.render("bookmark/view-bookmark", {
      bookmarkID: req.params.id,
      bookmark,
      layout: "../views/layouts/bookmark",
    });
  } else {
    res.send("Something went wrong.");
  }
};





/**
 * PUT /
 * Update Specific Note
 */
exports.bookmarkUpdateNote = async (req, res) => {
  try {
    await Bookmark.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, url:req.body.url, tags:req.body.tags, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/bookmark");
  } catch (error) {
    console.log(error);
  }
};






/**
 * DELETE /
 * Delete Note
 */
exports.bookmarkDeleteNote = async (req, res) => {
  try {
    await Bookmark.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/bookmark");
  } catch (error) {
    console.log(error);
  }
};






/**
 * GET /
 * Add Notes
 */
exports.bookmarkAddNote = async (req, res) => {
  res.render("bookmark/add", {
    layout: "../views/layouts/bookmark",
  });
};






/**
 * POST /
 * Add Notes
 */
exports.bookmarkAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Bookmark.create(req.body);
    res.redirect("/bookmark");
  } catch (error) {
    console.log(error);
  }
};

 

/**
 * POST /
 * Search For Notes
 */
exports.bookmarkSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Bookmark.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { tags: {$regex: new RegExp(searchNoSpecialChars,"i")}}
      ],
    }).where({ user: req.user._id });

    res.render("bookmark/search", {
      searchResults,
      layout: "../views/layouts/bookmark",
    });
  } catch (error) {
    console.log(error);
  }
};