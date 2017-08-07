var ProblemModel = require('../models/problemModel');

var getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}

var getProblem = (id) => {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({ id: id }, (err, problem) => {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}

var addProblem = (newProblem) => {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, (err, problem)=>{
          if(problem){
            reject("Problem name already exits!");
          }else{
            ProblemModel.count({}, (err, num) => {
              newProblem.id = num + 1;
              var mongoProblem = new ProblemModel(newProblem);
              mongoProblem.save();
              resolve(mongoProblem);
            });
          }
        });
    });
}

module.exports = {
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}