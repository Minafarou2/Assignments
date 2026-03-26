const http = require("http");
const fs = require("fs");

const PORT = 3000;

function readUsers() {
  return JSON.parse(fs.readFileSync("users.json"));
}

function writeUsers(data) {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // GET ALL USERS
  if (method === "GET" && url === "/users") {
    const users = readUsers();
    res.end(JSON.stringify(users));
  }

  // GET USER BY ID
  else if (method === "GET" && url.startsWith("/users/")) {
    const id = url.split("/")[2];
    const users = readUsers();

    const user = users.find((u) => u.id == id);

    if (!user) {
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      res.end(JSON.stringify(user));
    }
  }

  // ADD USER
  else if (method === "POST" && url === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);
      const users = readUsers();

      const exists = users.find((u) => u.email === newUser.email);

      if (exists) {
        return res.end(JSON.stringify({ message: "Email already exists" }));
      }

      newUser.id = Date.now();
      users.push(newUser);

      writeUsers(users);

      res.end(JSON.stringify({ message: "User added successfully" }));
    });
  }

  // UPDATE USER
  else if (method === "PATCH" && url.startsWith("/users/")) {
    const id = url.split("/")[2];
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      const updates = JSON.parse(body);
      const users = readUsers();

      const index = users.findIndex((u) => u.id == id);

      if (index === -1) {
        return res.end(JSON.stringify({ message: "User not found" }));
      }

      users[index] = { ...users[index], ...updates };

      writeUsers(users);

      res.end(JSON.stringify({ message: "User updated successfully" }));
    });
  }

  // DELETE USER
  else if (method === "DELETE" && url.startsWith("/users/")) {
    const id = url.split("/")[2];
    const users = readUsers();

    const newUsers = users.filter((u) => u.id != id);

    if (users.length === newUsers.length) {
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    writeUsers(newUsers);

    res.end(JSON.stringify({ message: "User deleted successfully" }));
  } else {
    res.end("Route Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
