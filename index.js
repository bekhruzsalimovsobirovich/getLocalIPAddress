const os = require('os');

const express = require('express')
const app = express()
const port = 3000

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Extract local IPv4 addresses
const localAddresses = [];
Object.keys(networkInterfaces).forEach(interfaceName => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach(interfaceInfo => {
        if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
            localAddresses.push(interfaceInfo.address);
        }
    });
});

app.get('/', (req, res) => {
    // Sending a JSON response
    const jsonData = { ip: localAddresses };
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

