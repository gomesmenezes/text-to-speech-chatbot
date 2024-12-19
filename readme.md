# WhatsApp Text-to-Speech Bot

Este é um bot que interage com o WhatsApp Web e utiliza o serviço Google Cloud Text-to-Speech para converter mensagens de texto em áudio e enviá-las de volta ao contato configurado.

---

## **Funcionalidades**
- Conexão ao WhatsApp Web via QR Code.
- Identificação de mensagens enviadas por um contato específico.
- Conversão de mensagens de texto em áudio (formato MP3) utilizando Google Cloud Text-to-Speech.
- Envio automático do áudio gerado como resposta ao contato.

---

## **Requisitos**

1. **Node.js**: versão 14 ou superior.
2. **Conta no Google Cloud** com o serviço Text-to-Speech habilitado.
3. **Bibliotecas instaladas**:
   - `whatsapp-web.js`
   - `@google-cloud/text-to-speech`
   - `qrcode-terminal`

---

## **Instalação**

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Google Cloud:
   - Gere uma chave de autenticação JSON e salve-a localmente.
   - Defina a variável de ambiente para autenticação:
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="caminho/para/sua-chave.json"
     ```

4. Edite o arquivo principal para configurar o nome do contato:
   ```javascript
   const targetContactName = 'NOME_DO_CONTATO';
   ```

---

## **Uso**

1. Inicie o bot:
   ```bash
   npm run dev
   ```

2. Escaneie o QR Code exibido no terminal com o aplicativo do WhatsApp.

3. O bot estará pronto para interagir com o contato configurado. Ao receber uma mensagem de texto, ele irá:
   - Converter o texto em um arquivo de áudio (MP3).
   - Enviar o áudio de volta para o contato.

---

## **Estrutura do Projeto**

- `main.js`: Script principal do bot.
- `output.mp3`: Arquivo gerado temporariamente para cada áudio.

---

## **Personalização**

- Para alterar o idioma ou a voz utilizada na conversão de texto para áudio, modifique o seguinte trecho no código:
  ```javascript
  const request = {
    input: { text: text },
    voice: { languageCode: 'pt-BR', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  ```
  - `languageCode`: Altere para o idioma desejado, por exemplo, `en-US` para inglês.
  - `ssmlGender`: Configure para `MALE` ou `FEMALE`, se necessário.

---

## **Bibliotecas Utilizadas**

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js): Interação com o WhatsApp Web.
- [@google-cloud/text-to-speech](https://cloud.google.com/text-to-speech): Conversão de texto em fala.
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal): Geração de QR Codes no terminal.

---

## **Licença**

Este projeto é de uso pessoal e experimental. Modifique e utilize conforme necessário!

---

## **Contribuição**

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
Versão 1.0

---

## **Autor**

- Desenvolvido por José Gomes com ❤️ para facilitar interações automatizadas no WhatsApp.
