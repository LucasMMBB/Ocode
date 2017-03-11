import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;
declare var io: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  sessionId: string;

  // languages available and default language
  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';

  defaultContent = {
    'Java': `public class Example {
  public static void main(String[] args) {
      // Type your Java code here
  }
}`,
    'C++': `#include <iostream>
using namespace std;

int main() {
   // Type your C++ code here
   return 0;
}`,
    'Python': `class Solution:
    def example():
        # Write your Python code here`
  };

  constructor( @Inject('collaboration') private collaboration,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // use problem id as session id
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
  }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    document.getElementsByTagName('textarea')[0].focus();

    // set up collaboration socket
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    //registering change callback
    this.editor.on("change", (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

  }

  // reset editor content
  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
  }

  // set language
  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  // submit
  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);
  }
}
