;(function(rtc) {

    var pad0 = function(number) { return number < 10 ? '0' + number : number }
    var log = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        var date = new Date();
        args.unshift('%0:%1:%2'.f(
            pad0(date.getHours()),
            pad0(date.getMinutes()),
            pad0(date.getSeconds())));
        console.log.apply(console, args);
        return log;
    }

    rtc.log_data_stream_data = false;
    rtc.log_heartbeat = false;
    rtc.log_event_source_message = true;

    rtc
    
    /* EventSource */
    .on('connect', function(stream_url) {
        log('Connected to ' + stream_url);
    })
    .on('connecting', function(stream_url) {
        log('Connecting to ' + stream_url);
    })
    .on('disconnect', function(stream_url) {
        log('Disconnected from ' + stream_url);
    })
    .on('event_source_error', function(event) {
        log('Event source error', event);
    })
    .on('event_source_message', function(event) {
        var data = JSON.parse(event.data);
        if ((data.event === 'heartbeat' && !rtc.log_heartbeat) ||
            !rtc.log_event_source_message)
            return;
        log('Event source message', event);
    })

    /* PeerConnection */
    .on('new_peer_connection', function(username, config) {
        log('new PeerConnection for ' + username, config);
    })
    .on('ice_candidate', function(username, candidate, event) {
        log('ICE Candidate ' + username, candidate, event);
    })
    .on('peer_connection_opened', function(username) {
        log('PeerConnection opened for ' + username);
    })
    .on('ice_state_chjange', function(event) {
        log('new ICE state: ' + event.target.iceConnectionState, event);
    }) 
    .on('add_data_channel', function(username, event) {
        log('Added data cannel for ' + username, event);
    })
    .on('pc_error', function(username, event) {
        log('Peer connection error with ' + username, event);
    }) 
    .on('set_local_description', function(username) {
        log('Set LocalDescription for ' + username);
    })
    .on('set_local_description_error', function(username, error) {
        log('Set LocalDescription error with ')
    })
    .on('send_offer', function(username) {
        log('Sent PC offer to ' + username);
    })
    .on('send_offer_error', function(username, error) {
        log('PC offer error with ' + username, error);
    })
    .on('receive_offer', function(username, sdp) {
        log('received PC offer from ' + username, sdp);
    })
    .on('receive_answer', function(username, sdp_in) {
        log('received PC answer from ' + username, sdp_in);
    })  
    .on('set_remote_description', function(username) {
        log('Set RemoteDescription for '+ username);
    })
    .on('set_remote_description_error', function(username, error) {
        log('RemoteDescription error with ' + username, error);
    })

    /* DataChannel */
    .on('data_channel_added', function(username, channel, label) {
        log('added DataChannel with %0 labeled "%1"'.f(username, label));
    })
    .on('data_channel_error', function(username, error) {
        log('DataChannel error with ' + username, error))
    .on('data_stream_open', function(username) {
        log('DataChannel opened for ' + username);
    })
    .on('data_stream_close', function(username) {
        log('DataStream closed for ' + username);
    })
    .on('data_stream_data', function(username, message) {
        if (rtc.log_data_stream_data)
            log('received from %0: %1'.f(username, message));
    })
    .on('')

    .on('set_secret', function() {
        log('OTR is ' + (rtc.using_otr ? 'on' : 'off'));
    })

    .on('get_peers', function(data) {
        log('get_peers', data);
    })

    .on('joined_room', function(room) {
        log('joined room: ' + room);
    })

    .on('user_join', function(data) {
        log(data.username + ' has joined the room');
    })

    .on('set_username_success', function(username) {
        log('successfuly set username to ' + username);
    })
    .on('set_username_error', function(username) {
        log('failed to set username to ' + username);
    })

    .on('message', function(username, message, encrypted) {

    })
    ;
})(rtc);