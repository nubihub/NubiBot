const Discord = require("discord.js");
const { token, prefix } = require("./config/config.json");

const client = new Discord.Client();

client.on('ready', () => { // 여기서 사용되는 Arrow Function은 콜백함수
  console.log(`${client.user.tag} 접속 성공!`); // Bot이 준비가 되면 실행할 콜백함수
});

client.on("message", function (message) {
  // message 작성자가 봇이면 그냥 return
  if (message.author.bot) return;
  // message 시작이 prefix가 아니면 return
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  const input = args;

  switch (command) {
    case "뽕":
      message.channel.send(`뿡!`);
      break;
    case "합":
      const numArgs = args.map(x => parseFloat(x));
      const sum = numArgs.reduce((counter, x) => counter += x);
      message.reply(`다 더하면 ${sum}!`);
      break;
    case "킹치만":
      const emoji = new Discord.MessageAttachment('https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTVfMTE2/MDAxNTcxMTQ0MjIwODE4.Yd4D6HvDtIQ600HpJJJbadGBT8aVJ91nQ4OUp6jd7oYg.uvrak7O9UOuiIKfWDh7KG906yeEYBSptki2qdXw__YMg.PNG.azzi_01/01_.png?type=w800');
      message.channel.send(emoji);
      break;
    case "프로필":
      message.channel
        .send(
          message.author.displayAvatarURL(),
        );
      break;
    case "삭제":
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel
        .send(
          "메시지 관리 권한이 없어요!",
        );
      }
      if (isNaN(input)) {
        return message.channel
          .send('삭제할 메시지의 수를 입력해주세요!')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
      if (Number(input) < 0) {
        return message.channel
          .send('양수만 입력이 가능해요!')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
      // 전송한 커맨드까지 삭제하려면 +1
      const amount = Number(input) > 100
        ? 101
        : Number(input) + 1;
      message.channel.bulkDelete(amount, true)
        .then((_message) => {
          message.channel
            .send(`명령어와 메시지 \`${_message.size - 1}\`개를 삭제했어요! :broom:`)
            .then((sent) => {
              setTimeout(() => {
                sent.delete();
              }, 2500);
            });
        });
  }
});

client.login(token);