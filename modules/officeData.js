class Data {
    employees;
    classes;
  
    constructor(employees, classes) {
      this.employees = employees;
      this.classes = classes;
    }
  }
  
  let dataCollection = null;
  
  module.exports.initialize = () => {
    const fs = require("fs");
    return new Promise((resolve, reject) => {
      fs.readFile("./data/employees.json", "utf8", (err, dataEmployees) => {
        if (err) {
          reject("unable to read employees.json");
        } else {
          fs.readFile("./data/classes.json", "utf8", (err, dataClasses) => {
            if (err) {
              reject("unable to read classes.json");
              return;
            } else {
              dataCollection = new Data(
                JSON.parse(dataEmployees),
                JSON.parse(dataClasses)
              );
              resolve();
            }
          });
        }
      });
    });
  };
  
  module.exports.getAllEmployees = () =>
    new Promise((resolve, reject) => {
      dataCollection.employees.length === 0
        ? reject("no results returned")
        : resolve(dataCollection.employees);
    });
  
  module.exports.getEAs = () =>
    new Promise((resolve, reject) =>
      dataCollection.employees.filter((employee) => employee.EA).length === 0
        ? reject("no results returned")
        : resolve(dataCollection.employees.filter((employee) => employee.EA))
    );
  
  module.exports.getClasses = () =>
    new Promise((resolve, reject) =>
      dataCollection.classes.length === 0
        ? reject("no results returned")
        : resolve(dataCollection.classes)
    );
  
  module.exports.getPartTimers = () =>
    new Promise((resolve, reject) =>
      dataCollection.employees.filter(
        (employee) => employee.status === "Part Time"
      ).length === 0
        ? reject("no results returned")
        : resolve(
            dataCollection.employees.filter(
              (employee) => employee.status === "Part Time"
            )
          )
    );
  
  module.exports.getEmployeeByNum = (num) =>
    new Promise((resolve, reject) =>
      dataCollection.employees.find(
        (employee) => employee.employeeNum === num
      ) === undefined
        ? reject("no results returned")
        : resolve(
            dataCollection.employees.find(
              (employee) => employee.employeeNum === num
            )
          )
    );
