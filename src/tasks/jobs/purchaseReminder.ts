import { PurchaseService } from 'src/models/purchase/purchase.service';

const TELEGRAM_HOST = 'https://api.telegram.org';
const BOT_TOKEN = '6993305175:AAF3i7uyQkXA9G418mFZ2g_abGXknhdpG4E';
const CHAT_ID = '1359726201';

const API_URL = `${TELEGRAM_HOST}/bot${BOT_TOKEN}`;

// Custom characters...
const newLine = '%0A';
const emojis = {
  title: '📝',
  amount: '💸',
  payment: '💳',
  status: '🚀',
  category: '👉',
  appliedAt: '⚡',
  deadline: '☠',
  happy: '🌟',
  moneybag: '💰',
  explotion: '💥',
};
const USDDollar = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const us_months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dic',
};
const formatDateISO = (date: Date) =>
  date.getDate() + '/' + us_months[date.getMonth()] + '/' + date.getFullYear();

const sendMessage = async (message: string, silent: boolean) => {
  console.log('Calling sendMessage...');
  const res = await fetch(
    `${API_URL}/sendMessage?chat_id=${CHAT_ID}&parse_mode=MarkdownV2&disable_notification=${silent}&text=${message}`,
  ).then((res) => res.json());
  if (!res.ok) console.log(res);
};

export default async function purchaseReminder(service: PurchaseService) {
  const purchases = await service.findAll({});
  if (purchases) {
    // Send summary...
    const total = purchases
      .map((purchase) => purchase.amount)
      .reduce((sum, curr) => sum + curr, 0);
    const fechas: string[] = purchases
      .map((purchase) => formatDateISO(new Date(purchase.deadline)))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    console.log(fechas);
    let message =
      `*YOU HAVE PENDING PAYMENTS \\- ${formatDateISO(new Date())}* ` +
      emojis.happy +
      ' ' +
      newLine;
    message +=
      emojis.moneybag +
      ' Total: ' +
      USDDollar.format(total).replaceAll('.', '\\.') +
      newLine;
    message +=
      emojis.explotion +
      ' Deadlines: ' +
      fechas.at(0).replaceAll('-', '\\-') +
      ' \\- ' +
      fechas.at(-1).replaceAll('-', '\\-');

    await sendMessage(message, false);

    // Send details...
    message =
      `*DETAIL OF PENDING PAYMENTS \\- ${formatDateISO(new Date())}* ` +
      emojis.happy +
      newLine +
      newLine;
    for (const purchase of purchases) {
      message +=
        emojis.title + ' ' + purchase.concept.replaceAll('-', '\\-') + newLine;
      message +=
        emojis.amount +
        ' ' +
        USDDollar.format(purchase.amount).replaceAll('.', '\\.') +
        newLine;
      message += emojis.payment + ' ' + purchase.payment_method + newLine;
      message += emojis.status + ' ' + purchase.status + newLine;
      message +=
        emojis.deadline +
        ' ' +
        formatDateISO(new Date(purchase.deadline)) +
        newLine;
      message += newLine;
    }

    await sendMessage(message, true);
  }
}
