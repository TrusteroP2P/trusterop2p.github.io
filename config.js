var RTCConfiguration = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80"
    },
    {
      urls: "turn:global.relay.metered.ca:80", // TURN over UDP
      username: "b5987c8a07c3e4f8c2f11916",
      credential: "PWwI9bRYdVZ6GtFK"
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp", // TURN over TCP
      username: "b5987c8a07c3e4f8c2f11916",
      credential: "PWwI9bRYdVZ6GtFK"
    },
    {
      urls: "turn:global.relay.metered.ca:443", // TURN over TLS
      username: "b5987c8a07c3e4f8c2f11916",
      credential: "PWwI9bRYdVZ6GtFK"
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp", // TURN over TCP
      username: "b5987c8a07c3e4f8c2f11916",
      credential: "PWwI9bRYdVZ6GtFK"
    },
    {
      urls: "stun:global.stun.twilio.com:3478"
    },
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ],
  iceTransportPolicy: 'all',
  bundlePolicy: 'balanced',
  rtcpMuxPolicy: 'require',
  sdpSemantics: 'unified-plan',
  iceCandidatePoolSize: 5
};