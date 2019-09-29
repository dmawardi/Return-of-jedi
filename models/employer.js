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

  Employer.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Employer.hasMany(models.Employee, {
      onDelete: "cascade"
    });
  };

  return Employer;
};
