const jwt = require('jsonwebtoken');

module.exports = {
    build: (app) => {
        app.get('/login', (req, res) => {
            res.sendfile('mock-server/mocks/login.html');
        });
        
        app.get('/complete-login', (req, res) => {
            const destination = decodeURIComponent(req.query.urlRedirection);
            res.redirect(destination);
        });

        app.get('/api/auth', (req, res) => {
            res.send({
                "id": 12312,
                "vid": "123456",
                "firstName": "AAAAA",
                "lastName": "BBBBB",
                "atcRating": 4,
                "pilotRating": 5,
                "division": "BR",
                "country": "BR",
                "admin": 2,
                "suspended": 0
            });
        });
        
        app.post('/api/auth', (req, res) => {
            const payload = {
                sub: {
                    vid: "123456",
                    id: 1234
                },
                iss: "https://localhost:3003",
                aud: "https://localhost:3003",
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (10 * 60)
            };

            const secret = "secret";
            const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

            res.send({ jwt: token });
        });
    }
}