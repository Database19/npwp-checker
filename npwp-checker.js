const puppeteer = require('puppeteer');

async function checkNpwp(npwpNumber) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  await page.goto('https://klikpajak.id/cek-validasi-npwp/');
  await page.type('#npwp_input', npwpNumber);
  await page.click('.btn-cn-submit');
  await page.waitForSelector('.npwp-val-msg .msg .text');

  const additionalInfo = await page.$eval('.npwp-val-msg .msg .text', el => el.innerText || 'No additional information');

  await browser.close();
  return additionalInfo;
}

async function validateNpwp(npwpNumber) {
  try {
    const status = await checkNpwp(npwpNumber);
    console.log(JSON.stringify({ status }));
  } catch (error) {
    console.error('Error occurred during NPWP validation:', error);
  }
}

module.exports = validateNpwp;
