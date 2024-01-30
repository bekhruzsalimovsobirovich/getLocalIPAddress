const os = require('os');
const address = require('address');

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
var adresses = '';
address.mac(function (err,addr){
    adresses = addr;
});
app.get('/', (req, res) => {
    // Sending a JSON response
    const jsonData = {
        ip: localAddresses ,
        mac_address: adresses
    };
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

