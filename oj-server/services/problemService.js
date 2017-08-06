var problems = [
  {
    id:1,
    name: "Add two sum",
    desc: "You are given two non-empty linked lists representing two non-negative integers.\
     The digits are stored in reverse order and each of their nodes contain a single digit.\
      Add the two numbers and return it as a linked list.\You may assume the two\
       numbers do not contain\
       any leading zero, except the number 0 itself.",
     difficulty: "easy"
  },
  {
    id:2,
    name: "Longest Substring Without Repeating Characters",
    desc: "Given a string, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
  },
  {
    id:3,
    name:"Median of two sortted arrays",
    desc: "There are two sorted arrays nums1 and nums2 of size m and n respectively.\
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    difficulty: "hard"
  },
  {
    id:4,
    name: "Longest Palindromic Substring",
    desc: "Given a string s, find the longest palindromic substring in s.\
     You may assume that the maximum length of s is 1000.",
     difficulty: "medium"
  },
  {
    id:5,
    name: "ZigZag Conversion",
    desc: "The string 'PAYPALISHIRING' is written in a zigzag\
     pattern on a given number of rows like this: (you may want to\
      display this pattern in a fixed font for better legibility)",
    difficulty: "super"
  }
];


var getProblems = function(){
	return new Promise((resolve, reject) => {
		resolve(problems);
	});
}

var getProblem = (id) => {
  return new Promise((resolve, reject) => {
    resolve(problems.find(problem => problem.id === id));
  });
}

var addProblem = (newProblem) => {
  return new Promise((resolve, reject) => {
    if(problems.find(problem => problem.name === newProblem.name)){
      reject("Problem already exists");
    }else{
      newProblem.id = problems.length + 1;
      problems.push(newProblem);
      resolve(newProblem);
    }
  });
}

module.exports = {
	getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
}