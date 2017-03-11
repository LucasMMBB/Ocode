var redisClient = require('../modules/redisClient')
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    // collaboration sessions
    var collaborations = [];
    // map from socketId to sessionId
    var socketIdToSessionId = [];

    var sessionPath = "/temp_sessions/";

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];

        socketIdToSessionId[socket.id] = sessionId;

        // add socket.id to corresponding collaboration session participants
        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            // not in memory but is it on the redis?
            redisClient.get(sessionPath + "/" + sessionId, function(data) {
                if (data) {
                    console.log("session terminated previously, pulling back from redis");
                    collaborations[sessionId] = {
                        'cachedInstructions': JSON.parse(data),
                        'participants': []
                    };
                } else {
                    console.log("creating new session");
                    collaborations[sessionId] = {
                        'cachedInstructions': [],
                        'participants': []
                    };
                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }

        // socket event listeners
        socket.on('change', (delta) => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedInstructions'].push(["change", delta, Date.now()]);
            }
            forwardEvent(socket.id, 'change', delta);
        });

        socket.on('cursorMove', (cursor) => {
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

        socket.on('restoreBuffer', () => {
            let sesssionId = socketIdToSessionId[socket.id];
            console.log('restore buffer for session: ' + sessionId + ', socket: ' + socket.id);

            if (sessionId in collaborations) {
                let instructions = collaborations[sessionId]['cachedInstructions'];
                for (let i = 0; i < instructions.length; i++) {
                    socket.emit(instructions[i][0], instructions[i][1]);
                }
            } else {
                console.log("WARNING: could not tie socket.id to any collaboration");
            }
        });

        // disconnect, save to redis when all participants leave session
        socket.on('disconnect', function() {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('socket ' + socket.id + 'disconnected from session ' + sessionId);
            let foundAndRemoved = false;
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                let index = participants.indexOf(socket.id);
                if (index >= 0) {
                    participants.splice(index, 1);
                    foundAndRemoved = true;
                    if (participants.length == 0) {
                        console.log("last participant in collaboration, committing to redis & removing from memory");
                        // no one is left in this session, we commit it to redis & remove it from memory
                        let key = sessionPath + "/" + sessionId;
                        let value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            }
            if (!foundAndRemoved) {
                console.log("WARNING: could not tie socket.id to any collaboration");
            }
            console.log(collaborations);
        });

    });

}
