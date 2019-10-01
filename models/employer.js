
const bcrypt = require("bcrypt");


validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = function(sequelize, DataTypes) {
  var Employer = sequelize.define("Employer", {
    employerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    employerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1] 
      }
    },
    employerPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1] 
      }
    },
    employerCompanyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    link: {
      type: DataTypes.STRING,
      defaultValue: ""
    }
  });


  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Employer.prototype.validPassword = function(employerPassword) {
    return bcrypt.compareSync(employerPassword, this.employerPassword);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Employer.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.employerPassword, bcrypt.genSaltSync(10), null);
  });





  Employer.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Employer.hasMany(models.Employee, {
      onDelete: "cascade"
    });
  };
  
  return Employer;
};






