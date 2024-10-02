var RTCConfiguration = {
  iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "b5987c8a07c3e4f8c2f11916",
        credential: "PWwI9bRYdVZ6GtFK",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "b5987c8a07c3e4f8c2f11916",
        credential: "PWwI9bRYdVZ6GtFK",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "b5987c8a07c3e4f8c2f11916",
        credential: "PWwI9bRYdVZ6GtFK",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "b5987c8a07c3e4f8c2f11916",
        credential: "PWwI9bRYdVZ6GtFK",
      },
  ],
  iceTransportPolicy: 'all',
  bundlePolicy: 'balanced',
  rtcpMuxPolicy: 'require',
  sdpSemantics: 'unified-plan',
  iceCandidatePoolSize: 10
};