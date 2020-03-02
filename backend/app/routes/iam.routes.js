const config = require("../config/auth.config");
const { verifySignUp } = require("../middlewares");
const db = require("../models");
const User = db.user;
const Role = db.role;


var bcrypt = require("bcryptjs");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    (req, res) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
    
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles }
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              user.roles = roles.map(role => role._id);
              user.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
    
                res.send({ message: "User was registered successfully!" });
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            user.roles = [role._id];
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              res.send({ message: "User was registered successfully!" });
            });
          });
        }
      });
    }
  );

  
  // READ 
  app.get('/api/iam', function(req, res) {
    User.find({}, function(err, users) {
      var userMap = {};
  
      users.forEach(function(user) {
        userMap[user._id] = user;
      });
  
      res.send(userMap);  
    });
  })

  // EDIT
  app.get('/api/edit/user/:id', function(req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user){
        if(err) {
          res.json(err);
        }
        res.json(user);
    });
  })

  //  Defined update route

    // Update
    app.post('/api/update/user/:id', function(req, res) {
      console.log("Updating User")
      User.findById(req.params.id, function(err, user) {
        if (!user)
          res.status(404).send("data is not found");
        else {
          user.username = req.body.username;
          user.email = req.body.email;
          user.roles = req.body.roles;
          user.save().then(() => {
              res.json('Update complete');
          })
          .catch(() => {
                res.status(400).send("unable to update the database");
          });
        }
      });
    })

       // Delete
       app.delete('/api/delete/user/:id', function(req, res) {
        User.findByIdAndRemove({_id: req.params.id}, function(err){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
      })
      

};
