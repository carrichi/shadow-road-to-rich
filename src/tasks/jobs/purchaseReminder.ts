import { PurchaseService } from 'src/models/purchase/purchase.service';

const TELEGRAM_HOST = 'https://api.telegram.org';
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
  sunglasses: '😎',
  rock: '🤘',
  yolo_cash: '🤑',
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

const sendMessage = async (message: string, settings, options) => {
  const BOT_TOKEN = settings.token;
  const CHAT_ID = settings.chat_id;

  let REQUEST_URL = `${TELEGRAM_HOST}/bot${BOT_TOKEN}/sendMessage
      ?chat_id=${CHAT_ID}
      &parse_mode=MarkdownV2
      &disable_notification=${options.silent ?? false}
      &text=${message}`;
  REQUEST_URL = REQUEST_URL.replace(/\r?\n|\r|\s+/g, '');

  console.log(`REQUEST_URL: ${REQUEST_URL}`);

  const res = await fetch(REQUEST_URL).then((res) => res.json());
  if (!res.ok) console.log(res);
};

export default async function purchaseReminder(
  service: PurchaseService,
  config,
) {
  const today = new Date();
  const limit_date = new Date(today.setDate(today.getDate() + 5));

  const purchases = await service.findAll({
    method: 'AND',
    fields: {
      status: ['OFF_TRACK', 'TO_PAY', 'UP_NEXT'],
      deadline: { before: limit_date },
    },
    order_by: [
      {
        field: 'deadline',
        direction: 'ASC',
      },
    ],
  });
  if (purchases.length == 0) {
    let message =
      `*YOUR CASH IS FREE ${emojis.yolo_cash} \\- ${formatDateISO(new Date())}* ` +
      emojis.sunglasses +
      newLine;
    message +=
      'You have no payments due in the next few days, enjoy your day! ' +
      emojis.rock +
      newLine;
    console.log('Sending free day...');
    await sendMessage(
      message.replaceAll('!', '\\!').replaceAll(' ', '+'), // Preparing spaces in URL
      { token: config.token, chat_id: config.chat_id },
      { silent: false },
    );
  } else {
    // Send summary...
    const total = purchases
      .map((purchase) => purchase.amount)
      .reduce((sum, curr) => sum + curr, 0);

    const fechas: string[] = purchases
      .map((purchase) => formatDateISO(new Date(purchase.deadline)))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let message =
      `*PENDING PAYMENTS \\- ${formatDateISO(new Date())}* ` +
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

    console.log('Sending summary...');
    await sendMessage(
      message.replaceAll(' ', '+'), // Preparing spaces in URL
      { token: config.token, chat_id: config.chat_id },
      { silent: false },
    );

    // Send details...
    message =
      `*DETAIL \\- ${formatDateISO(new Date())}* ` +
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

    console.log('Sending details...');
    await sendMessage(
      message.replaceAll('_', '+').replaceAll(' ', '+'), // Preparing spaces in URL
      { token: config.token, chat_id: config.chat_id },
      { silent: true },
    );
  }
}
