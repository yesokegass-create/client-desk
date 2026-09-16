const fs = require('fs');
const path = require('path');
const files = ['TambahBooking.vue', 'Pengaturan.vue', 'PublicBooking.vue', 'FormBooking.vue', 'TimFreelance.vue'];
files.forEach(f => {
  const fp = path.join('d:/FREELANCE/client-desk/resources/js/pages', f);
  let content = fs.readFileSync(fp, 'utf8');
  content = content.replace(/type="tel"/g, 'type="tel" maxlength="13"');
  // Avoid duplicate maxlength if run multiple times
  content = content.replace(/(maxlength="13"\s*)+/g, 'maxlength="13" ');
  fs.writeFileSync(fp, content);
  console.log('Fixed', f);
});
