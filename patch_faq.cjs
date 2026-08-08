const fs = require('fs');

let content = fs.readFileSync('resources/js/i18n.js', 'utf8');

const msgStart = content.indexOf('const messages = {');
const msgEnd = content.indexOf('const i18n = createI18n');

let msgString = content.substring(msgStart + 17, msgEnd).trim();
if (msgString.endsWith(';')) msgString = msgString.slice(0, -1);

let messages = eval('(' + msgString + ')');

messages.en.faq_page.back_home = "← Home";
messages.en.faq_page.title = "Frequently Asked Questions";
messages.en.faq_page.contact_q = "Still have questions?";
messages.en.faq_page.contact_btn = "Contact us on Instagram";

messages.id.faq_page.back_home = "← Rumah";
messages.id.faq_page.title = "Pertanyaan yang Sering Diajukan";
messages.id.faq_page.contact_q = "Masih ada pertanyaan?";
messages.id.faq_page.contact_btn = "Hubungi kami di Instagram";

const newMsgString = JSON.stringify(messages, null, 2);

const newContent = content.substring(0, msgStart) + 
  "const messages = " + newMsgString + ";\n\n" + 
  content.substring(msgEnd);

fs.writeFileSync('resources/js/i18n.js', newContent, 'utf8');
console.log("FAQ keys updated successfully");
