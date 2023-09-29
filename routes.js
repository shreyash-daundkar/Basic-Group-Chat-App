const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/login", (req, res, next) => {
  res.send(
    `<h4>Enter username</h4>
     <form action="/user" method="POST">
         <input type="text" name="username">
         <input type="submit" value="login">
    </form>`
  );
});

router.post("/user", (req, res, next) => {
  res.status(302)
  .send(
    `<Script>
         localStorage.setItem('user', '${req.body.username}');
         window.location.href = '/';
    </Script>`
    );
});

router.post("/msg", (req, res, next) => {
  fs.appendFile("data.txt",`[${req.body.username} : "${req.body.msg}"] , `, err => {
      if(err) throw err;
      res.redirect("/")
  });
});

router.use("/", (req, res, next) => {
  fs.readFile("data.txt", 'utf8', (err, data) => {
    if(err) throw err;
    res.send(
      `<p>${data}</p>
      <form action="/msg" method="POST" id="form">
          <input type="text" name="msg">
          <input type="hidden" name="username" id="username">
          <input type="submit" value="send">
      </form>
      <script>
          const name = localStorage.getItem('user');
          document.querySelector('#username').value = name;
      </script>`
      );
  });
});

module.exports = router;