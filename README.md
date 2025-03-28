![Logo Image](https://raw.githubusercontent.com/trusterop2p/trustero/main/Pidgeon.png)

Trustero P2P a serverless peer to peer decentralized encrypted chat program

This program is unique in that it's completely front end so users can validate that it is completely safe and
encrypted with no back doors and a completely serverless chat program. This is possible thanks to the project
"Trystero" which is a WebRTC matchmaking library that uses IPFS, Firebase and BitTorrent for connecting.
Users can run it on their local machine by opening multiple tabs and running "local.bat" to serve the page.
Then they type http://localhost:9000/index.htm

The project currently shows the login procedure, room generation, message signing and encryption process.
The current project status is shown as a demonstration. Connections are pretty robust once two peers find
each other however they may have to switch connection strategies or set a free TURN server in their configuration.
This application is made in a way so users can improvise when they struggle to connect for whatever reason.
It's encouraged for collaborators to push improvements to the peer to peer libraries this application relies on.
The internet is unfortunately set up in a way set up deliberately to prevent peer to peer applications on the web
where the ISP or firewall will prevent direct connections. We believe this prevents the decentralization of
pure front end peer to peer services. Therefore various strategies such as torrent trackers are a good
way for peers to find each other and connect. This allows users to connect to each other without the use
of servers other than a free TURN relay that they might set up between each other in some edge cases.

How it works:
1) Users generate a public key with a username and password. This is not saved anywhere, it's only used to save
   their private key in temporary memory for decrypting and signing messages.
2) Next a user will add friends to chat with(group chat is possible but not fully implemented). To add a friend
   they only need to know their public key. Optionally they can add a password for their chat to make it harder
   for the chat room to be entered by other peers. Even so, everything is encrypted.
3) To enter a room with a friend, they use the hash of their public keys for the room name and password if used.
4) To send a message they send a timestamp, the message type, and the message encrypted with their friends public
   key and they sign it with their public key to verify it's actually them. For sending images or audio, just send
   them as base64 for example and proceed as normal.
5) Since there is no servers the strategy for making sure messages arrive takes several steps. First they send
   the message only when the other peer is in the room. Then they wait some minutes for a confirmation. If they
   don't get it, they resend the message.
6) For chat rooms with multiple parties, you may want to limit the size due to browsers not being able to handle
   too many WebRTC peers multicasting at the same time. However I think groups can be quite large.
7) Since it's probably best to not be in too many rooms at once, for people with large friends lists who they are
   not actively chatting with, they can cycle through their rooms in batches of 50-100 at a time. Then every few
   minutes they leave and join another batch. They can prioritize the users they more commonly chat with.
   However currently the application is not tested or set up for large lists of contacts.

RSA public key cryptography is used for asymmetric encryption with signing and verifying messages. This is 
extremely useful in serverless architecture. This is done thanks to the Criptico library which is being used 
purely on the front end. The users private keys are basically going to be as strong as whatever username and
password they decide to use.

With that said, the Cryptico library is older and is probably in need of a full audit. JavaScript crypto
is said to have some issues with side channels(although I can't think of any attack that would apply here).
Also there is some concerns about randoms although solutions exist to improve that. The username and password
is hashed several times and used in combination with "Tom Wu's RSA key generator" which does use an exponent
of 3(instead of 65537), however various other steps are taken which should be okay. Cryptographers may want to
check the padding as well. Either way, peers can generate longer keys which are 2048 bits which definitely
will add to their security. The default setting of 512 bits is good for fast chat although long term it's
best for users to choose 1024 or 2048. The messages are immune to plain-text attacks because after every
keystroke random data is used to make a very unpredictable hashed addition to the plain-text. So this should
easily avoid almost all forms of cryptoanalysis. Additionally, it's also a good idea to encrypt the messages
with AES by using an additional password that protects the room name and the message contents. Lastly some
useful libraries are included but not used such as NACL which may also be good for future use.
The signing and verifying of messages guarantees that no "man in the middle" could intercept communication.
Also the padding protects against "chosen cipher" and other forms of cryptoanalysis respectively. Of course
all of this is considering that the users of this application use secure and open source hardware and devices.

This chat program is still somewhat complete and probably more secure than almost anything else out there.
It supports encrypted webRTC phone calls, both RSA and AES encryption, messages in storage are encrypted,
sending of images, and multiple chats at once with notifications. The word Trystero comes from a book
where it symbolizes a shadow organization of mail carriers. The project name is a spin on that with
"Trustero" which symbolizes a decentralized chat that can be trusted unlike mainstream chat services.