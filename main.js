import pkg from 'whatsapp-web.js';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'node:fs/promises';
import qrcode from 'qrcode-terminal';

const { Client, MessageMedia } = pkg;

const client = new Client();
const ttsClient = new TextToSpeechClient();

const targetContactName = 'Onilde';

async function convertTextToAudio(text) {
  const request = {
    input: { text: text },
    voice: { languageCode: 'pt-BR', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await ttsClient.synthesizeSpeech(request);

  const audioFilePath = 'output.mp3';
  await writeFile(audioFilePath, response.audioContent, 'binary');
  console.log('Áudio gerado com sucesso: output.mp3');

  return audioFilePath;
}

client.on('ready', async () => {
  console.log('Client is ready!');

  const contacts = await client.getContacts();
  const targetContact = contacts.find(
    (contact) => contact.name === targetContactName
  );

  if (!targetContact) {
    console.log(`Contato "${targetContactName}" não encontrado.`);
    return;
  }

  console.log(`Pronto para enviar mensagens para "${targetContactName}".`);
});

client.on('message_create', async (message) => {
  const chat = await message.getChat();
  if (chat.name === targetContactName) {
    console.log(`Mensagem recebida de "${targetContactName}": ${message.body}`);

    try {
      const audioFilePath = await convertTextToAudio(message.body);

      if (!audioFilePath) {
        console.log('Erro: O arquivo de áudio não foi gerado.');
        return;
      }

      try {
        const audio = MessageMedia.fromFilePath(audioFilePath);
        await chat.sendMessage(audio);
        console.log('Áudio enviado com sucesso.');
      } catch (mediaError) {
        console.error('Erro ao carregar o arquivo de áudio:', mediaError);
      }
    } catch (conversionError) {
      console.error('Erro ao converter texto para áudio:', conversionError);
    }
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();
