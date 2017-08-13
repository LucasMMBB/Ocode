import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  languages: string[] = ['Java', 'Python', 'C++', 'JavaScipt'];
  language: string = 'Python';

  themes: string[] = ['Monokai', 'Github', 'Eclipse', 'Xcode'];
  theme: string = 'Monokai';

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
	  `,
	  'JavaScript': `
var sum(a, b) = {
	return a + b;
}
sum(1, 2);
	  `
  }

  constructor() { 
  }

  ngOnInit() {
  	this.editor = ace.edit('editor');
  	this.resetEditor();
  	this.editor.$blockScrolling = Infinity;
  }

  resetEditor(): void {
  	this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
  	this.editor.setTheme('ace/theme/' + this.theme.toLowerCase());
  	this.editor.setValue(this.defaultContent[this.language]);
  }

  setTheme(theme: string): void {
  	this.theme = theme;
  	this.resetEditor();
  }

  setLanguage(language: string): void {
  	this.language = language;
  	this.resetEditor();
  }
}
