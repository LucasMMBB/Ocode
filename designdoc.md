#Collaborative Online Judge Syste
## Overview
Collaborative Online Judge System is a full-stack system supporting collaborative code editing, compiling, execution and resulte judgement. This document covers the details of the implementation of Collaborative Editor and User Code Executor from an engineering perspective
## Major Use Cases
- User can use interactive code editor to edit code. SUpported languates are Java, C++, Python and JavaScript. In addition, I need to keep the capacity for new languages.
- Multiple users can edit the same piece of code simultaneously. Each user's change can be seen and applied to every other user's code immediately.
- User can compile the code by clicking 'combile' button and the compile result will be displayed to user
- User can browser pre-stored coding problem list.
- User can get details of a specific coding problem by clicking the problem in the list.
- User can submit the code through 'submit' button to submit the code to solve the chosen question. The result, including compiling, correctness and running time, will be displayed to user.
- User's submissions will be recorded for reference
- User can check his progress / statistics for questions.
- Admin can manually add new problem.
## High-Level Stack Diagram
| Stack              | Technologies         |
|--------------------|----------------------|
|Frontend - client   |Angular.js Socket.io  |
|Frontend - server   |Node.js Redis, Nginx  |
|Backend - executor  |Nginx, Flask, Docker  |
## Design Details
### Collaborative Editor
I am using socket.io as the communication protocol between client and server. The reasons are:
	- Client - server communication is heavy
	- Full - duplex async messaging is preferred
	- WebSockets pass through most fireworks without any recongfiguration

### Client-side Editor
#### ACE editor
Here I have two options for choose an editor for browser: ACE and CodeMirro. They are both javascript-based editor for browser and support source code editing. They both support multiple languages, color themes, programming APIs for advanced usage.
Programming API is the top1 feature I should consider. I need to dynamically get and change the status of the editor. These include getting the change of the content, applying the change of the current content, and so on. Both ACE and CodeMirror expose a good set of APIs.

I chose ACE as it has been proven to be a stable editor by adopting by Cloud9 IDE. It is easier to get help from community considering the number of users.