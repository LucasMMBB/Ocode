import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../models/problem.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(problems: Problem[], term: string): Problem[] {
  	//console.log(problems);
    return problems.filter(
    		(prob) => {
    			if (prob.name.toLowerCase().includes(term))
    				return prob;
    		}
    	);
  }

}
