import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import Canvas from "canvas";
import { Client } from "eris";

import {
  serverName,
  token,
  welcomeChannelID,
  welcomeImage,
  welcomeMessage,
} from "./config.js";

const client = new Client(token, {
  intents: ["guilds", "guildMembers"],
  messageLimit: 10,
});

client.on("guildMemberAdd", async (member) => {
  const welcomeImg = await welcome(member);
  const attachment = { file: welcomeImg.toBuffer(), name: "welcome.png" };
  client.createMessage(
    welcomeChannelID,
    welcomeMessage.replace("{{member}}", `<@${member.id}>`),
    attachment,
  );
});

await client.connect();

async function welcome(member) {
  const user = member.user;

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${fontSize -= 10}px "Cantarell" bold`;
    } while (ctx.measureText(text).width > canvas.width - 320);
    return ctx.font;
  };

  const canvas = Canvas.createCanvas(1200, 300);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(`${__dirname}/${welcomeImage}`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fill();

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = applyText(canvas, `Welcome to ${serverName},`);

  ctx.strokeStyle = "#000000";
  ctx.textAlign = "left";
  ctx.lineWidth = 4;

  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.strokeText(`Welcome to ${serverName},`, 320, canvas.height / 2);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Welcome to ${serverName},`, 320, canvas.height / 2);

  ctx.font = applyText(canvas, `${user.username}#${user.discriminator}`);

  ctx.strokeStyle = "#000000";
  ctx.textAlign = "left";
  ctx.lineWidth = 4;

  ctx.shadowColor = "black";
  ctx.shadowBlur = 7;
  ctx.strokeText(
    `${user.username}#${user.discriminator}`,
    320,
    canvas.height / 1.4,
  );
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${user.username}#${user.discriminator}`,
    320,
    canvas.height / 1.4,
  );

  const avatar = await Canvas.loadImage(user.staticAvatarURL);

  ctx.fillStyle = "#303030";
  ctx.drawImage(avatar, 15, 15, 270, 270);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  return canvas;
}
