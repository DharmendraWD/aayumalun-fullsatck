const { pool } = require("../db/dbConn");
const path = require("path");
const fs = require("fs");


// create hero section 
// const createHeroSection = async (req, res) => {
//   const { slogan, description, btn1Text, btn1Link, btn2Text, btn2Link } = req.body;
//   const images = req.files?.map(file => file.filename);

//   try {
//     if (!slogan || !description || !btn1Text || !btn1Link || !btn2Text || !btn2Link || !images?.length) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const [existingHeroSection] = await pool.query(
//       "SELECT * FROM herosection WHERE id = 1"
//     );

//     let rows;

//     if (existingHeroSection.length > 0) {
//       [rows] = await pool.query(
//         "UPDATE herosection SET slogan = ?, description = ?, btn1Text = ?, btn1Link = ?, btn2Text = ?, btn2Link = ?, images = ? WHERE id = 1",
//         [slogan, description, btn1Text, btn1Link, btn2Text, btn2Link, JSON.stringify(images)]
//       );
//     } else {
//       [rows] = await pool.query(
//         "INSERT INTO herosection (slogan, description, btn1Text, btn1Link, btn2Text, btn2Link, images) VALUES (?,?,?,?,?,?,?)",
//         [slogan, description, btn1Text, btn1Link, btn2Text, btn2Link, JSON.stringify(images)]
//       );
//     }

//     const [heroSection] = await pool.query(
//   "SELECT * FROM herosection WHERE id = 1"
// );

//     return res.status(200).json({
//       success: true,
//       message: "Hero section saved successfully",
//       data: heroSection[0],
//     });

//   } catch (error) {
//     console.error("Server Error:", error);

//     if (images) {
//       images.forEach(image => {
//         const imagePath = path.join("uploads", "herosection", image);
//         if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// };

const createHeroSection = async (req, res) => {
  const { slogan, description, btn1Text, btn1Link, btn2Text, btn2Link } = req.body;
  const newImages = req.files?.map(file => file.filename) || [];

  try {
    const [existingHeroSection] = await pool.query(
      "SELECT * FROM herosection WHERE id = 1"
    );

    const isUpdate = existingHeroSection.length > 0;

    //  Validation (images required only on CREATE)
    if (
      !slogan ||
      !description ||
      !btn1Text ||
      !btn1Link ||
      !btn2Text ||
      !btn2Link ||
      (!isUpdate && newImages.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  Existing images
    const existingImages =
      isUpdate && existingHeroSection[0].images
        ? JSON.parse(existingHeroSection[0].images)
        : [];

    //  Final images
    const finalImages =
      newImages.length > 0 ? newImages : existingImages;

    const finalImagesJson = JSON.stringify(finalImages);

    //  UPDATE
    if (isUpdate) {
      let updateQuery = `
        UPDATE herosection SET
          slogan = ?,
          description = ?,
          btn1Text = ?,
          btn1Link = ?,
          btn2Text = ?,
          btn2Link = ?
      `;

      let values = [
        slogan,
        description,
        btn1Text,
        btn1Link,
        btn2Text,
        btn2Link,
      ];

      //  Update images ONLY if new images uploaded
      if (newImages.length > 0) {
        updateQuery += `, images = ?`;
        values.push(finalImagesJson);
      }

      updateQuery += ` WHERE id = 1`;

      await pool.query(updateQuery, values);

      //  Delete old images ONLY if replaced
      if (newImages.length > 0) {
        existingImages.forEach(image => {
          const imagePath = path.join("uploads", "herosection", image);
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        });
      }
    }

    //  CREATE
    else {
      await pool.query(
        "INSERT INTO herosection (slogan, description, btn1Text, btn1Link, btn2Text, btn2Link, images) VALUES (?,?,?,?,?,?,?)",
        [
          slogan,
          description,
          btn1Text,
          btn1Link,
          btn2Text,
          btn2Link,
          finalImagesJson,
        ]
      );
    }

    const [heroSection] = await pool.query(
      "SELECT * FROM herosection WHERE id = 1"
    );

    return res.status(200).json({
      success: true,
      message: "Hero section saved successfully",
      data: heroSection[0],
    });

  } catch (error) {
    console.error("Server Error:", error);

    //  Cleanup newly uploaded images on error
    if (newImages.length > 0) {
      newImages.forEach(image => {
        const imagePath = path.join("uploads", "herosection", image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// FRONTEND  MUST HAVE THIS 
// if (selectedImages.length > 0) {
//   selectedImages.forEach(img =>
//     formData.append("images", img)
//   );
// }


// get all hero section data 
const getHeroSection = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM herosection WHERE id = 1");
        return res.status(200).json({
            success: true,
            message: "Hero section fetched successfully",
            data: rows,
        });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
}

// delete hero section image 
const deleteHeroSectionImage = async (req, res) => {
  try {
    const { imageName } = req.params;

    // 1 Get current images from DB
    const [rows] = await pool.query(
      "SELECT images FROM herosection WHERE id = 1"
    );

    if (!rows.length || !rows[0].images) {
      return res.status(404).json({
        success: false,
        message: "Aww, Your Requested Data Not Found.",
      });
    }

    let images = rows[0].images;

    // If stored as JSON string
    if (typeof images === "string") {
      images = JSON.parse(images);
    }

    // 2 Check if image exists in DB
    if (!images.includes(imageName)) {
      return res.status(404).json({
        success: false,
        message: "Aww, Your Requested Data Not Found.",
      });
    }

    // 3 Remove image from array
    const updatedImages = images.filter(img => img !== imageName);

    // 4 Update DB
    await pool.query(
      "UPDATE herosection SET images = ? WHERE id = 1",
      [JSON.stringify(updatedImages)]
    );

    // 5 Delete file from filesystem
    const imagePath = path.join("uploads", "herosection", imageName);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: updatedImages,
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ABOUT US SECTION
// create about us section 
const createAboutUs = async (req, res) => {
  const {
    heading,
    longPara,
    firstCardHeading,
    firstCardPara,
    secCardHeading,
    secCardPara,
    thirdCardHeading,
    thirdCardHeading2,
    thirdCardPara,
  } = req.body;

//   const newImages = req.files?.map(file => file.filename) || [];

  try {
    //  Check existing row
    const [existingaboutus] = await pool.query(
      "SELECT * FROM aboutus WHERE id = 1"
    );

    const isUpdate = existingaboutus.length > 0;

    //  Validation
    if (
      !heading ||
      !longPara ||
      !firstCardHeading ||
      !firstCardPara ||
      !secCardHeading ||
      !secCardPara ||
      !thirdCardHeading ||
      !thirdCardHeading2 ||
      !thirdCardPara 
    //   (!isUpdate && newImages.length < 2)
    ){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  Existing images (if any)
    // const existingImages = isUpdate && existingaboutus[0].images
    //   ? JSON.parse(existingaboutus[0].images)
    //   : [];

    //  Decide final images
    // const finalImages =
    //   newImages.length > 0 ? newImages : existingImages;

    // const finalImagesJson = JSON.stringify(finalImages);

    //  CREATE
    if (!isUpdate) {
      await pool.query(
        `INSERT INTO aboutus
        (heading, longPara, firstCardHeading, firstCardPara, secCardHeading, secCardPara,
         thirdCardHeading, thirdCardHeading2, thirdCardPara)
        VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          heading,
          longPara,
          firstCardHeading,
          firstCardPara,
          secCardHeading,
          secCardPara,
          thirdCardHeading,
          thirdCardHeading2,
          thirdCardPara,
          
        ]
      );
    }

    //  UPDATE
    else {
      let updateQuery = `
        UPDATE aboutus SET
          heading = ?,
          longPara = ?,
          firstCardHeading = ?,
          firstCardPara = ?,
          secCardHeading = ?,
          secCardPara = ?,
          thirdCardHeading = ?,
          thirdCardHeading2 = ?,
          thirdCardPara = ?
      `;

      let values = [
        heading,
        longPara,
        firstCardHeading,
        firstCardPara,
        secCardHeading,
        secCardPara,
        thirdCardHeading,
        thirdCardHeading2,
        thirdCardPara,
      ];

      //  Update images ONLY if new images uploaded
    //   if (newImages.length > 0) {
    //     updateQuery += `, images = ?`;
    //     values.push(finalImagesJson);
    //   }

      updateQuery += ` WHERE id = 1`;

      await pool.query(updateQuery, values);

      //  Delete old images ONLY if replaced
    //   if (newImages.length > 0) {
    //     existingImages.forEach(img => {
    //       const imgPath = path.join("uploads", "aboutus", img);
    //       if (fs.existsSync(imgPath)) {
    //         fs.unlinkSync(imgPath);
    //       }
    //     });
    //   }
    }

    //  Fetch updated data
    const [aboutus] = await pool.query(
      "SELECT * FROM aboutus WHERE id = 1"
    );

    return res.status(200).json({
      success: true,
      message: "About Us section saved successfully",
      data: aboutus[0],
    });

  } catch (error) {
    console.error("Server Error:", error);

    //  Cleanup newly uploaded images on error
    // if (newImages.length > 0) {
    //   newImages.forEach(img => {
    //     const imgPath = path.join("uploads", "aboutus", img);
    //     if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    //   });
    // }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// get about us 
const getAboutUs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM aboutus WHERE id = 1");
    return res.status(200).json({
      success: true,
      message: "About Us section fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// create image section for about us section
const createAboutUsImage = async (req, res) => {
  try {
    //  Check both images exist
    // console.log(req.files, "firstCardImage")
    // console.log(req.files.fullImage, "fullImage")
    if (
      !req.files ||
      !req.files.firstCardImage ||
      !req.files.fullImage
    ) {
      return res.status(400).json({
        success: false,
        message: "Both images (firstCardImage and fullImage) are required",
      });
    }

    const firstCardImageFile = req.files.firstCardImage[0];
    const fullImageFile = req.files.fullImage[0];

    const firstCardImage = firstCardImageFile.filename;
    const fullImage = fullImageFile.filename;

    //  Check if record exists
    const [existing] = await pool.query(
      "SELECT * FROM aboutusimage WHERE id = 1"
    );

    let query;
    let params;

    if (existing.length > 0) {
      //  If exists, delete old files before updating
      const oldFirst = existing[0].firstCardImage;
      const oldFull = existing[0].fullImage;

      const firstPath = path.join("uploads/aboutusimg", oldFirst);
      const fullPath = path.join("uploads/aboutusimg", oldFull);

      if (fs.existsSync(firstPath)) fs.unlinkSync(firstPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

      //  Update record
      query = `UPDATE aboutusimage 
               SET firstCardImage = ?, fullImage = ? 
               WHERE id = 1`;
      params = [firstCardImage, fullImage];

    } else {
      //  Insert new record
      query = `INSERT INTO aboutusimage 
               (id, firstCardImage, fullImage) 
               VALUES (1, ?, ?)`;
      params = [firstCardImage, fullImage];
    }

    await pool.query(query, params);

    //  Fetch updated record
    const [data] = await pool.query(
      "SELECT * FROM aboutusimage WHERE id = 1"
    );

    return res.status(200).json({
      success: true,
      message: "About Us images saved successfully",
      data: data[0],
    });

  } catch (error) {
    console.error("Server Error:", error);

    //  Cleanup uploaded files if DB fails
    if (req.files?.firstCardImage) {
      fs.unlinkSync(
        path.join("uploads/aboutusimg", req.files.firstCardImage[0].filename)
      );
    }
    if (req.files?.fullImage) {
      fs.unlinkSync(
        path.join("uploads/aboutusimg", req.files.fullImage[0].filename)
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// get aboutsu image
const getAboutUsImage = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM aboutusimage WHERE id = 1");
    return res.status(200).json({
      success: true,
      message: "About Us images fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// ABOUT US SECTION END 

// MISSION SECTION 
// create misssion section
const createMission = async (req, res) => {
  const {
    heading,
    shortpara,
    firstCardHeading,
    firstCardPara,
    secCardHeading,
    secCardPara,
    thirdCardHeading,
    thirdCardPara,
  } = req.body;

  try {
    // Check existing mission row
    const [existingMission] = await pool.query(
      "SELECT * FROM mission WHERE id = 1"
    );

    const isUpdate = existingMission.length > 0;

    // Validation
    if (
      !heading ||
      !shortpara ||
      !firstCardHeading ||
      !firstCardPara ||
      !secCardHeading ||
      !secCardPara ||
      !thirdCardHeading ||
      !thirdCardPara
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CREATE
    if (!isUpdate) {
      await pool.query(
        `INSERT INTO mission
        (heading, shortpara, firstCardHeading, firstCardPara,
         secCardHeading, secCardPara, thirdCardHeading, thirdCardPara)
        VALUES (?,?,?,?,?,?,?,?)`,
        [
          heading,
          shortpara,
          firstCardHeading,
          firstCardPara,
          secCardHeading,
          secCardPara,
          thirdCardHeading,
          thirdCardPara,
        ]
      );
    }
    // UPDATE
    else {
      await pool.query(
        `UPDATE mission SET
          heading = ?,
          shortpara = ?,
          firstCardHeading = ?,
          firstCardPara = ?,
          secCardHeading = ?,
          secCardPara = ?,
          thirdCardHeading = ?,
          thirdCardPara = ?
        WHERE id = 1`,
        [
          heading,
          shortpara,
          firstCardHeading,
          firstCardPara,
          secCardHeading,
          secCardPara,
          thirdCardHeading,
          thirdCardPara,
        ]
      );
    }

    // Fetch updated data
    const [mission] = await pool.query(
      "SELECT * FROM mission WHERE id = 1"
    );

    return res.status(200).json({
      success: true,
      message: "Mission section saved successfully",
      data: mission[0],
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// get mission 
const getMission = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM mission WHERE id = 1");
    return res.status(200).json({
      success: true,
      message: "Mission section fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// create image for mission section
const createMissionImage = async (req, res) => {
  try {
    //  Check both images exist
    // console.log(req.files.img1[0], "img1")
    // console.log(req.files.img2, "img2")
    if (
      !req.files ||
      !req.files.img1 ||
      !req.files.img2
    ) {
      return res.status(400).json({
        success: false,
        message: "Both images (img1 and img2) are required",
      });
    }

    const img1File = req.files.img1[0];
    const img2File = req.files.img2[0];

    const img1 = img1File.filename;
    const img2 = img2File.filename;

    //  Check if record exists
    const [existing] = await pool.query(
      "SELECT * FROM missionimage WHERE id = 1"
    );

    let query;
    let params;

    if (existing.length > 0) {
      //  If exists, delete old files before updating
      const oldFirst = existing[0].img1;
      const oldFull = existing[0].img2;

      const firstPath = path.join("uploads/missionimg", oldFirst);
      const fullPath = path.join("uploads/missionimg", oldFull);

      if (fs.existsSync(firstPath)) fs.unlinkSync(firstPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

      //  Update record
      query = `UPDATE missionimage 
               SET img1 = ?, img2 = ? 
               WHERE id = 1`;
      params = [img1, img2];

    } else {
      //  Insert new record
      query = `INSERT INTO missionimage 
               (id, img1, img2) 
               VALUES (1, ?, ?)`;
      params = [img1, img2];
    }

    await pool.query(query, params);

    //  Fetch updated record
    const [data] = await pool.query(
      "SELECT * FROM missionimage WHERE id = 1"
    );

    return res.status(200).json({
      success: true,
      message: "Mission  images saved successfully",
      data: data[0],
    });

  } catch (error) {
    console.error("Server Error:", error);

    //  Cleanup uploaded files if DB fails
    if (req.files?.img1) {
      fs.unlinkSync(
        path.join("uploads/missionimg", req.files.img1[0].filename)
      );
    }
    if (req.files?.img2) {
      fs.unlinkSync(
        path.join("uploads/missionimg", req.files.img2[0].filename)
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// get mission image 
const getMissionImage = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM missionimage WHERE id = 1");
    return res.status(200).json({
      success: true,
      message: "Mission images fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// MISSION SECTION END

// TEAM SECTION 
// create team 
const createTeam = async (req, res) => {
  const { name, description } = req.body;
  const dp = req.file ? req.file.filename : null;

  try {
    // Validation
    if (!name || !description || !dp) {
      // Remove uploaded image if validation fails
      if (dp) {
        const imagePath = path.join("uploads", "team", dp);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }

      return res.status(400).json({
        success: false,
        message: "Name, description, and display picture are required",
      });
    }

    // Insert into team table
    const [result] = await pool.query(
      `INSERT INTO team (name, dp, description)
       VALUES (?, ?, ?)`,
      [name, dp, description]
    );

    // Fetch newly created record
    const [team] = await pool.query(
      "SELECT * FROM team WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: team[0],
    });

  } catch (error) {
    console.error("Server Error:", error);

    // Cleanup uploaded image on error
    if (dp) {
      const imagePath = path.join("uploads", "team", dp);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// get team 
const getAllTeam = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM team");
    return res.status(200).json({
      success: true,
      message: "Team members fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// delete team with id 
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM team WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// TEAM SECTION END

// GALLARY SECTION 
// create gallery 
const createGallery = async (req, res) => {
  const { title } = req.body;
  const images = req.files || [];

  try {
    // Validation
    if (!title || images.length === 0) {
      // cleanup uploaded images
      images.forEach(file => {
        const imgPath = path.join("uploads", "gallery", file.filename);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });

      return res.status(400).json({
        success: false,
        message: "Title and at least one image are required",
      });
    }

    // Count existing images
    const [existing] = await pool.query(
      "SELECT COUNT(*) AS total FROM gallery"
    );

    const existingCount = existing[0].total;
    const newCount = images.length;

    // Max 6 images allowed
    if (existingCount + newCount > 6) {
      images.forEach(file => {
        const imgPath = path.join("uploads", "gallery", file.filename);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });

      return res.status(400).json({
        success: false,
        message: `Gallery limit exceeded. Maximum 6 images allowed.`,
      });
    }

    // Insert images
    const values = images.map(file => [
      title,
      `uploads/gallery/${file.filename}`,
    ]);

    await pool.query(
      "INSERT INTO gallery (title, image) VALUES ?",
      [values]
    );

    const [gallery] = await pool.query("SELECT * FROM gallery");

    return res.status(201).json({
      success: true,
      message: "Gallery images uploaded successfully",
      data: gallery,
    });

  } catch (error) {
    console.error("Gallery Error:", error);

    // Cleanup uploaded images on error
    images.forEach(file => {
      const imgPath = path.join("uploads", "gallery", file.filename);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// delete gallary 
deleteGalleryImage = async (req, res) => {
    try {
    const { imageName } = req.params;
    const [result] = await pool.query(
      "DELETE FROM gallery WHERE image = ?",
      [`uploads/gallery/${imageName}`]
    );

    const imgPath = path.join("uploads", "gallery", imageName);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// get gallary 
const getGallery = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gallery");
    res.json(rows);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// GALLARY SECTION END 

// BLOG SECTION 
// create blogs 
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const coverImage = req.file ? req.file.filename : null;
  try {
    // Auth user (from JWT middleware)
    const user = req.user; // { id, name, email }
    if (!title || !content || !coverImage) {
      if (coverImage) {
        const imgPath = path.join("uploads", "blogs", coverImage);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      return res.status(400).json({
        success: false,
        message: "Title, content, and cover image are required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO blogs
       (title, content, cover_image, author_id, author_name)
       VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        content,
        coverImage,
        user.userId,
        user.fullName,
      ]
    );

    const [blog] = await pool.query(
      "SELECT * FROM blogs WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog[0],
    });

  } catch (error) {
    console.error("Blog Error:", error);

    if (coverImage) {
      const imgPath = path.join("uploads", "blogs", coverImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// get all blog 
const getallBlog = async (req, res) => {
   try {
    const [rows] = await pool.query("SELECT * FROM blogs");
    res.json(rows);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// delete blog 
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get blog first
    const [rows] = await pool.query(
      "SELECT cover_image FROM blogs WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const coverImage = rows[0].cover_image; // cover_image is string

    // 2. Delete blog from DB
    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);

    // 3. Delete image from server
    if (coverImage) {
      const imgPath = path.join("uploads", "blogs", coverImage);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    return res.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// update blog 
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const newImage = req.file ? req.file.filename : null;

    // Validation
    if (!title || !content) {
      if (newImage) {
        const imgPath = path.join("uploads", "blogs", newImage);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    // Get existing blog
    const [rows] = await pool.query(
      "SELECT cover_image, author_id FROM blogs WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      if (newImage) {
        const imgPath = path.join("uploads", "blogs", newImage);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const blog = rows[0];


    // Build dynamic update query
    let query = `
      UPDATE blogs SET
        title = ?,
        content = ?
    `;
    const values = [title, content];

    if (newImage) {
      query += `, cover_image = ?`;
      values.push(newImage);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    await pool.query(query, values);

    // Delete old image if replaced
    if (newImage && blog.cover_image) {
      const oldImgPath = path.join("uploads", "blogs", blog.cover_image);
      if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
    }

    // Fetch updated blog
    const [updated] = await pool.query(
      "SELECT * FROM blogs WHERE id = ?",
      [id]
    );

    return res.json({
      success: true,
      message: "Blog updated successfully",
      data: updated[0],
    });

  } catch (error) {
    console.error("Edit Blog Error:", error);

    // Cleanup new image on failure
    if (req.file) {
      const imgPath = path.join("uploads", "blogs", req.file.filename);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// BLOG SECTION END

// CLIENT MESSAGE SECTION 
const createClientMessage = async (req, res) => {
  try {
    const { message, email, name } = req.body;

    if (!message || !email || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await pool.query(
      "INSERT INTO clientmess (mess, email, name) VALUES (?, ?, ?)",
      [message, email, name]
    );

    return res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json(
      {
        success: false,
        message: error.message || "Server error",
      }
    )
  }
}
const deleteClientMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM clientmess WHERE id = ?", [id]);
    return res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
const getAllClientMessage = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientmess");
    return res.json({
      success: true,
      message: "Messages fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
// CLIENT MESSAGE SECTION END


// FAQS SECTION 
// CREATE FAQ
const createFaq = async (req, res) => {
  try {
    const { ques, ans } = req.body;

    if (!ques || !ans) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO faqs (ques, ans) VALUES (?, ?)",
      [ques, ans]
    );

    const [faq] = await pool.query(
      "SELECT * FROM faqs WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq[0],
    });
  } catch (error) {
    console.error("Create FAQ Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// GET ALL FAQS
const getAllFaqs = async (req, res) => {
  try {
    const [faqs] = await pool.query(
      "SELECT * FROM faqs ORDER BY id DESC"
    );

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("Get FAQs Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// UPDATE FAQ
const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { ques, ans } = req.body;

    if (!ques || !ans) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const [existing] = await pool.query(
      "SELECT * FROM faqs WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    await pool.query(
      "UPDATE faqs SET ques = ?, ans = ? WHERE id = ?",
      [ques, ans, id]
    );

    const [updated] = await pool.query(
      "SELECT * FROM faqs WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "FAQ updated successfully",
      data: updated[0],
    });
  } catch (error) {
    console.error("Update FAQ Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// DELETE FAQ
const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      "SELECT * FROM faqs WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    await pool.query(
      "DELETE FROM faqs WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("Delete FAQ Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
// FAQS SECRION ENEDE



module.exports = { createHeroSection, getHeroSection, deleteHeroSectionImage, createAboutUs, createAboutUsImage, createMissionImage, createMission, getAboutUs, getAboutUsImage, getMission, getMissionImage, createTeam, getAllTeam, deleteTeam, createGallery, deleteGalleryImage, getGallery,createBlog, getallBlog, deleteBlog, editBlog, getAllClientMessage, deleteClientMessage, createClientMessage,   createFaq,
  getAllFaqs,
  updateFaq,
  deleteFaq, };
