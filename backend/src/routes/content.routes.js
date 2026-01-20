const express = require("express");
const {createHeroSection, getHeroSection, deleteHeroSectionImage, createAboutUs, createAboutUsImage, createMissionImage, createMission, getAboutUs, getAboutUsImage, getMission, getMissionImage, createTeam, getAllTeam, deleteTeam, createGallery, deleteGalleryImage, getGallery, createBlog, getallBlog, deleteBlog, editBlog, getAllClientMessage, deleteClientMessage, createClientMessage, createFaq, getAllFaqs, updateFaq, deleteFaq} = require("../controllers/contents.controller");
const upload = require("../middlewares/imageUpload");
const {isAuthenticated} = require("../middlewares/isAuthenticated");

// const upload = require("../middleware/upload");
// const { protect } = require("../middleware/auth");

const router = express.Router();

    // HERO SECTION 
    router.put("/herosection",
        upload.array("images"),
        createHeroSection);
router.get("/herosection", getHeroSection);
router.delete("/herosection/:imageName", deleteHeroSectionImage);
 // HERO SECTION END


//  ABOUT US SECTION 
router.put("/aboutus", createAboutUs);
router.get("/aboutus", getAboutUs);
router.put("/aboutusimg",
     upload.fields([
    { name: "firstCardImage", maxCount: 1 },
    { name: "fullImage", maxCount: 1 }
  ]), createAboutUsImage);
  router.get("/aboutusimg", getAboutUsImage);
//  ABOUT US SECTION END

// MISSION SECTION
router.put("/mission", createMission);
router.get("/mission", getMission); 
router.put("/missionimg", 
       upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 }
  ]), createMissionImage);
  router.get("/missionimg", getMissionImage);
// MISSION SECTION END

// TEAM SECTION 
router.post("/team", upload.single("dp"), createTeam);
router.get("/team", getAllTeam);
router.delete("/team/:id", deleteTeam);
// TEAM SECTION ENDED 

// GALLERY SECTION 
router.post("/gallery", upload.array("image"),isAuthenticated, createGallery);
router.get("/gallery", getGallery);
router.delete("/gallery/:imageName", isAuthenticated, deleteGalleryImage);
// GALLERY SECTION END

// BLOG SECTION 
router.get("/blogs", getallBlog);
router.post("/blogs", upload.single("coverImage"),isAuthenticated, createBlog);
router.delete("/blogs/:id", isAuthenticated, deleteBlog)
router.put(
  "/blogs/:id",
  isAuthenticated,
  upload.single("coverImage"),
  editBlog
);
// BLOG SECTION END

// CLIENT MESSAGE SECTION 
router.get("/clientmessage", getAllClientMessage);
router.delete("/clientmessage/:id", isAuthenticated, deleteClientMessage);
router.post("/clientmessage", createClientMessage);
// CLIENT MESSAGE SECTION END

// FAQS SECTION 
router.post("/faqs",isAuthenticated, createFaq);
router.get("/faqs", getAllFaqs);
router.put("/faqs/:id", isAuthenticated, updateFaq);
router.delete("/faqs/:id", isAuthenticated, deleteFaq);
// FAQS SECTION END


module.exports = router;
