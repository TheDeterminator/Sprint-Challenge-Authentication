<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
Middleware is code that sits in between other code or fuctions. Sessions, bcrypt
and JWT are middleware that we use in authentication. Sessions is used to authenticate
users or other features across different (usually server-side) requests. Bcrypt is
used to cryptographically hash passwords sent to servers and JWT is an authentication
middleware which unlike sessions is used predominantly for authenticating client-side
requests.
2.  What does bcrypt do in order to prevent attacks?
Bcrypt cryptographically hashes passwords using a SHA or secure hashing algorithm.
It's important not to confuse this with an encryption. Unlike two-way encryption,
hashing is a one-way function which does not have a key to decode hashed passwords
back into readable passwords.
3.  What are the three parts of the JSON Web Token?
The three parts of a JWT are the header (contains the algirthm and token types),
the payload (contains claims information, such as a user id that we want to send
  with the JWT) and the signature (A secret attached to the end of the (?) of a
  base 64 encoded header/payload combination string);
