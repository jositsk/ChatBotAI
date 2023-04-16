# Ejecutar el Bot
- Clonar el repositorio:
     ```bash
       $ git clone https://github.com/jositsk/ChatBotAI.git 
       
       $ cd ChatBotAI

     ```
- Instalar dependencias:
     ```bash
        $ npm install
     ```
- Añadir tu API-KEY de [OpenAI](https://platform.openai.com/account/api-keys) a **src/main.js**
     ```javascript
        # src/main.js:22-24
        const configuration = new Configuration({
               apiKey : "YOUR-API-KEY",
        });   
        
     ```
### Estructura
     ```
        ChatBotAI/
           node_modules/
           src/
             main.js
           example.env
           package.json
           package-lock.json
     ```
