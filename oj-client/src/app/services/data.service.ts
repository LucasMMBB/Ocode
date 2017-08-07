import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DataService {
  
  constructor(private http: Http) { }

  getProblems(): Problem[] {
  	this.http.get("api/v1/problems")
  }

  getProblem(id: number): Problem {
  	
  }

  addProblem(problem: Problem): void {
  	problem.id = this.problems.length + 1;
  	this.problems.push(problem);
  }

}
