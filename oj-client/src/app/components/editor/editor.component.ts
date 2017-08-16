import {Component, OnInit, Inject} from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router';

declare var ace: any;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {

  editor: any;

  sessionId: string;

  languages: string[] = ['Java', 'Python', 'C++', 'JavaScript'];
  language: string = 'JavaScript';

  themes: string[] = ['Monokai', 'Github', 'Eclipse', 'Xcode', 'Terminal', 'Textmate'];
  theme: string = 'Eclipse';

  output: string;

  defaultContent = {
'Python': `class Solution(object):
def countAndSay(self, n):
    """
    :type n: int
    :rtype: str
    """
	  `,
'Java': `public class Solution{
	public static void main(String[] args){
		// put your code here!
	}
}
	  `,
'JavaScript': `
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    
};`
		,
'C++':`class Solution {
public:
    string countAndSay(int n) {
        
    }
};`
  }

  constructor(@Inject('collaboration') private collaboration,
                          @Inject('data') private data,
                          private route: ActivatedRoute) { 
  }

  ngOnInit() {
    // question id send back to server
    this.route.params
          .subscribe(params => {
            this.sessionId = params['id'];
            this.initEditor();
          });

    //this.initEditor();

  }

  initEditor(): void {
    // editor set up
    this.editor = ace.edit('editor');
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    this.collaboration.init();

    document.getElementById('editor').focus();


    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (e)=>{
      console.log('editor changes: ' + JSON.stringify(e));
      
      if(this.editor.lastAppliedChange != e){
          this.collaboration.change(JSON.stringify(e));
      }
      
    });

    this.editor.getSession().getSelection().on("changeCursor", ()=>{
        let cursor = this.editor.getSession().getSelection().getCursor();
        console.log("cursor move: " + JSON.stringify(cursor));
        this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }// initEditor ends

  resetEditor(): void {
  	this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
  	this.editor.setTheme('ace/theme/' + this.theme.toLowerCase());
  	this.editor.setValue(this.defaultContent[this.language]);
    this.editor.gotoLine(this.editor.session.getLength());
    this.output = '';
    //this.editor.setHighlightActiveLine(true);
  }

  setTheme(theme: string): void {
  	this.theme = theme;
  	this.resetEditor();
  }

  setLanguage(language: string): void {
  	this.language = language;
  	this.resetEditor();
  }

  submit(): void {
  	let userCode = this.editor.getValue();

    let data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    };

    // use data service
    this.data.buildAndRun(data)
            .then(res => this.output = res.text);
  	console.log(userCode);
  }


}
