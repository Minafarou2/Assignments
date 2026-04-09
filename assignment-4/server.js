const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

function readUsers() {
  return JSON.parse(fs.readFileSync("users.json"));
}

function writeUsers(data) {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

// Add User
app.post("/user", (req, res) => {
  const { name, age, email } = req.body;

  let users = readUsers();

  let exists = users.find((u) => u.email === email);
  if (exists) {
    return res.json({ message: "Email already exists." });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age,
    email,
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: "User added successfully." });
});

// update user
app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  let users = readUsers();

  let user = users.find((u) => u.id == id);

  if (!user) {
    return res.json({ message: "User ID not found." });
  }

  Object.assign(user, req.body);

  writeUsers(users);

  res.json({ message: "User updated successfully." });
});

//delete user
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  let users = readUsers();

  let filtered = users.filter((u) => u.id != id);

  if (filtered.length === users.length) {
    return res.json({ message: "User ID not found." });
  }

  writeUsers(filtered);

  res.json({ message: "User deleted successfully." });
});

// Get user by name
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;

  let users = readUsers();

  let user = users.find((u) => u.name === name);

  if (!user) {
    return res.json({ message: "User name not found." });
  }

  res.json(user);
});

// Get all users
app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Filter by age
app.get("/user", (req, res) => {
  try {
    const { age } = req.query;

    if (!age) {
      return res.status(400).json({ message: "Age is required" });
    }

    const ageNum = Number(age);
    if (Number.isNaN(ageNum)) {
      return res.status(400).json({ message: "Age must be a valid number" });
    }

    const users = readUsers();
    if (!Array.isArray(users)) {
      return res.status(500).json({ message: "Users data not found" });
    }

    const filteredUsers = users.filter(
      (u) => typeof u.age === "number" && u.age >= ageNum,
    );

    if (filteredUsers.length === 0) {
      return res.json({ message: "No users found above this age" });
    }

    res.json(filteredUsers);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user by ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  let users = readUsers();

  let user = users.find((u) => u.id == id);

  if (!user) {
    return res.json({ message: "User ID not found." });
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
