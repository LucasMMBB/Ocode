import { Problem } from "./models/problem.model";

export const PROBLEMS: Problem[] = [
  {
    id:2,
    name: "Add two sum",
    desc: "You are given two non-empty linked lists representing two non-negative integers.\
     The digits are stored in reverse order and each of their nodes contain a single digit.\
      Add the two numbers and return it as a linked list.\You may assume the two\
       numbers do not contain\
       any leading zero, except the number 0 itself.",
     difficulty: "easy"
  },
  {
    id:3,
    name: "Longest Substring Without Repeating Characters",
    desc: "Given a string, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
  },
  {
    id:4,
    name:"Median of two sortted arrays",
    desc: "There are two sorted arrays nums1 and nums2 of size m and n respectively.\
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    difficulty: "hard"
  },
  {
    id: 5,
    name: "Longest Palindromic Substring",
    desc: "Given a string s, find the longest palindromic substring in s.\
     You may assume that the maximum length of s is 1000.",
     difficulty: "medium"
  },
  {
    id:6,
    name: "ZigZag Conversion",
    desc: "The string 'PAYPALISHIRING' is written in a zigzag\
     pattern on a given number of rows like this: (you may want to\
      display this pattern in a fixed font for better legibility)",
    difficulty: "super"
  }
];