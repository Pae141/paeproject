const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth"); // 👈 เพิ่มตรงนี้

router.get("/", userController.getUsers);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/userprofile", userController.userprofile);
router.put("/updateuser", auth, userController.updateuser);
router.delete("/:id", userController.delete);




// 👇 เพิ่ม middleware ตรวจ token
router.get("/profile", auth, userController.profile);

// ✅ เพิ่มเส้นทางนี้
router.get("/me", auth, (req, res) => {
  res.json({ username: req.user.username });
});

// เพิ่ม logout route
router.post("/logout", auth, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // ถ้าใช้ HTTPS เปลี่ยนเป็น true
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
