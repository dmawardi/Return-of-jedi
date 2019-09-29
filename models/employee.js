module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    employeeDepartment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    employeePosition: {
      type: DataTypes.STRING
    },
    employeeAddress: {
      type: DataTypes.STRING
    },
    employeeContactNumber: {
      type: DataTypes.STRING
    },
    employeeDOB: {
      type: DataTypes.STRING
    },
    employeeImage: {
      type: DataTypes.BLOB
    }
  });

  Employee.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Employee.belongsTo(models.Employer, {
      foreignKey: {
        allowNull: false
      }
    });

    Employee.hasMany(models.TimeSheet, {
      onDelete: "cascade"
    });
  };

  return Employee;
};
