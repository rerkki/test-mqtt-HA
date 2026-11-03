const mqtt = require('mqtt');

// Korvaa nämä omilla Home Assistant -tunnuksillasi
const USERNAME = 'teacher';
const PASSWORD = 'CrucialDeliriousBagfulEachGoldsmithAvengingPlus1Richly';

// Brokerin osoite (WebSocket-yhteys vaatii wss://-etuliitteen)
const brokerUrl = 'wss://iot-mqtt.aiot-garage.net';

const options = {
    username: USERNAME,
    password: PASSWORD,
    clientId: `nodejs_mqtt_${Math.random().toString(16).substr(2, 8)}`,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
};

console.log('Yhdistetään MQTT-brokeriin...');
const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
    console.log('Yhteys muodostettu onnistuneesti!');

    // Julkaistaan viesti julkiseen aiheeseen, johon kaikilla on oikeudet
    const topic = '/users/teacher/xxxxx';
    const message = 'hello world';

    client.publish(topic, message, { qos: 0 }, (err) => {
        if (err) {
            console.error('Julkaisu epäonnistui:', err);
        } else {
            console.log(`Viesti "${message}" julkaistu aiheeseen: ${topic}`);
        }
        
        // Suljetaan yhteys siististi julkaisun jälkeen
        client.end();
    });
});

client.on('error', (err) => {
    console.error('Yhteysvirhe:', err);
});