module.exports = function(io) {

	// collaboration sessions
	var collaborations = [];

	// map from socketId to sessionId
	var socketIdToSessionId = []

	io.on('connection', (socket) =>{
		let sessionId = socket.handshake.query['sessionId'];

		socketIdToSessionId[socket.id] = sessionId;

		// add socket.id to corresponding collaboration session participants
		if(!(sessionId in collaborations)){
			collaborations[sessionId] = {
				'participants' : []
			}
		}else{
			collaborations[sessionId]['participants'].push(socket.id);
		}

		//----- socket event listeners -----

		//socket change event listener
		socket.on('change', (delta) => {
			console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
			forwardEvents(socket.id, 'change', delta);
		});

		//socket cursorMove event listener
		socket.on('cursorMove', (cursor)=>{
			console.log("cursorMove" + socketIdToSessionId[socket.id] + " " + cursor);
			cursor = JSON.parse(cursor);
			cursor['socketId'] = socket.id;
			cursor = JSON.stringify(cursor);
			forwardEvents(socket.id, "cursorMove", cursor);
		});

		// function to receive events from client(delta, cursor)
	    function forwardEvents(socketId, eventName, dataString){
			let sessionId = socketIdToSessionId[socketId];

			//cursor = JSON.stringify(cursor);
			if(sessionId in collaborations){
				let participants = collaborations[sessionId]['participants'];
				for(let i = 0; i < participants.length; i++){
					if(socket.id != participants[i]){
						io.to(participants[i]).emit(eventName, dataString);
					}
				}
			} else {
				console.log("WARNING: could not tie socket_id to any collaborations");
			}

    	}
		
	});

}