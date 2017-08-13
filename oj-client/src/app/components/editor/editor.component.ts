import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  constructor() { 
  }

  ngOnInit() {
  	this.editor = ace.edit('editor');
  	this.editor.setTheme('ace/theme/monokai');
  	this.editor.getSession().setMode('ace/mode/javascript');
  }

}
