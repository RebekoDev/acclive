const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const config = require('./config/express.server.config');

const startServer = async () => {
    try {
        await mongoose.connect(config.dbUrl);
        const server = http.createServer(app);
        server.listen(config.port);
        
        console.warn(`App load on port:${config.port}`);
    } catch (e) {
        console.error(e);
    }
}

startServer();
