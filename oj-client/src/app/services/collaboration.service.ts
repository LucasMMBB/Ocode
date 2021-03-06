import { Injectable } from '@angular/core';
import {  COLORS } from '../../assets/colors';


declare var io: any;
declare var ace: any;

@Injectable()
export class CollaborationService {
  
  collaborationSocket: any;
  clientsInfo: Object = {};

  clientNum: number = 0;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId });

    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on("cursorMove", (cursor)=>{
      // cursorMove socket event received from server

      console.log("cursor move: " + cursor);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      let changeClientId = cursor['socketId'];
      console.log(x + ' ' + y + ' ' + changeClientId);

      if (changeClientId in this.clientsInfo) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        this.clientsInfo[changeClientId] = {};

        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_" + changeClientId
            + " { position:absolute; background:" + COLORS[this.clientNum] + ";"
            + " z-index: 100; width:3px !important; }";

        document.body.appendChild(css);
        this.clientNum++;
      }

      let Range = ace.require('ace/range').Range;
      let newMarker = session.addMarker(new Range(x, y, x, y + 1), 'editor_cursor_' + changeClientId, true);
      this.clientsInfo[changeClientId]['marker'] = newMarker;
      
    });



    // test
  	this.collaborationSocket.on("message", (message) => {
  		console.log("From server: " + message);
  	});
  }// init ends

  change(delta: string): void {
  	this.collaborationSocket.emit("change", delta);
  }// change ends

  cursorMove(cursor: string): void{
    // send to server about the cursor change
    this.collaborationSocket.emit("cursorMove", cursor);
  }// cursorMove ends

  restoreBuffer(): void {
    // tell server to restore
    this.collaborationSocket.emit("restoreBuffer");
  }// restoreBuffer end

}