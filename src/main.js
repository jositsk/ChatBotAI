// API-KEY: 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



const {Client} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const {Configuration, OpenAIApi} = require("openai");


const client = new Client({
	puppeteer: {
		args: ['--no-sandbox'],
	}
})

client.on('qr',(qr) =>{
    qrcode.generate(qr,{small:true});
});

client.on('ready',() =>{
    console.log("----Conectado----");
});

client.initialize();

const configuration = new Configuration({
    apiKey : "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",
});
const openai = new OpenAIApi(configuration);

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

require('dotenv').config();

client.on('message', async message => {
    const contact = await message.getContact();
    const filteredContacts = process.env.FILTERED_CONTACTS.split(',');
    console.log(`${contact.name}: ${message.body}`);

    if(filteredContacts.includes(contact.name)){
        console.log("No enviar mensajes a: "+ contact.name)

    }else{
        runCompletion(message.body).then(result => message.reply(result));
    }
   
})