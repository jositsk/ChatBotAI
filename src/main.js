// Importación de las bibliotecas necesarias
const {Client} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const {Configuration, OpenAIApi} = require("openai");

// Configuración del cliente de WhatsApp
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    }
})

// Evento que se dispara cuando se genera un código QR
client.on('qr',(qr) =>{
    qrcode.generate(qr,{small:true});
});

// Evento que se dispara cuando el cliente de WhatsApp está listo
client.on('ready',() =>{
    console.log("----Conectado----");
});

// Inicialización del cliente de WhatsApp
client.initialize();

// Configuración de la API de OpenAI
const configuration = new Configuration({
    apiKey : "YOUR-API-KEY", // Reemplazar con la clave API de OpenAI
});
const openai = new OpenAIApi(configuration);

// Función para ejecutar la generación de completado en OpenAI
async function runCompletion(message){
    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: message,
        max_tokens: 200,
    });
    const result = completion.data.choices[0].text.trim();
    if (result !== '') {
        return result;
    }
    return `Sorry, I didn't understand your message.`;
}

// Configuración de las variables de entorno utilizando dotenv
require('dotenv').config();

// Evento que se dispara cuando se recibe un mensaje en WhatsApp
client.on('message', async message => {
    // Obtener información del contacto que envió el mensaje
    const contact = await message.getContact();
    const filteredContacts = process.env.FILTERED_CONTACTS.split(',');

    // Imprimir en la consola el nombre del contacto y el mensaje recibido
    console.log(`${contact.name}: ${message.body}`);

    // Verificar si el contacto está en la lista de contactos filtrados
    if(filteredContacts.includes(contact.name)){
        console.log("No enviar mensajes a: "+ contact.name)
    } else {
        // Ejecutar la función de generación de completado en OpenAI y responder al mensaje
        runCompletion(message.body).then(result => message.reply(result));
    }
})

