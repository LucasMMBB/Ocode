module.exports = function(io) {
    // collaboration sessions
    var collaborations = [];
    // map from socketId to sessionId
    var socketIdToSessionId = [];

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];

        socketIdToSessionId[socket.id] = sessionId;

        // add socket.id to corresponding collaboration session participants
        if (!(sessionId in collaborations)) {
            collaborations[sessionId] = {
                'participants': []
            };
        }
        collaborations[sessionId]['participants'].push(socket.id);

        // socket event listeners
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            forwardEvent(socket.id, 'change', delta);
        });

        socket.on('cursorMove', function(cursor) {
            console.log("cursor move for session: " + socketIdToSessionId[socket.id] + ", socketId: " + socket.id);
            // bind socketId to cursor
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;

            forwardEvent(socket.id, 'cursorMove', JSON.stringify(cursor));
        });

        // forward event from socketId to its collaborators
        var forwardEvent = function(socketId, eventName, dataString) {
            let sessionId = socketIdToSessionId[socketId];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socketId != participants[i]) {
                        io.to(participants[i]).emit(eventName, dataString);
                    }
                }
            } else {
                console.log("WARNING: could not tie socket.id to any collaboration");
            }
        }

    });

}
