import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  defaultContent = {
	  'Python': `
class Solution(object):
    def countAndSay(self, n):
        """
        :type n: int
        :rtype: str
        """
	  `,

	  'Java': `
public class Solution{
		public static void main(String[] args){
			// put your code here!
		}
	}
	  `
  }

  constructor() { 
  }

  ngOnInit() {
  	this.editor = ace.edit('editor');
  	this.editor.setTheme('ace/theme/monokai');
  	this.editor.getSession().setMode('ace/mode/python');
  	this.editor.setValue(this.defaultContent['Python']);
  	this.editor.$blockScrolling = Infinity;
  }

}
