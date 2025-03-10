const express = require("express");
const router = express.Router();
const User = require("./User.js");
const jwt = require("jsonwebtoken");

// Rutas
router.get("/", (_, res) => {
  res.send("Devflix backend working 🚀");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // ❌ Validar email y password
  if (email === "") {
    return res.status(400).json({ message: "Email is required" });
  } else if (password === "") {
    return res.status(400).json({ message: "Password is required" });
  }

  // ✅ Comparar email y password con la base de datos
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    if (user.password === password) {
      // Aqui devolver un token de autenticación JWT
      // Generar el JWT
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      }); // 'SECRET_KEY' debería estar en un archivo .env
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(400).json({ err: "Incorrect password" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ err: "Internal server error", message: error.message });
  }
});

module.exports = router;
