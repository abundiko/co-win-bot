const express = require("express");
require('dotenv').config()
const app = express();
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const welcome = require("./src/models/first");
const { clubs, plans } = require("./src/models/data");
const { delay } = require("./src/utils/functions");
const {
  init,
  newUser,
  updateSession,
  getSession
} = require("./src/database/mongoose_client");
let client = false;

    let testQR = '';
app.get("/", (req, res) => { 
  if (!client) {
    return res.send('ok');
    let hasLoaded = false;
    client = new Client();

    let history = [];
    let session = {};
    let sessionHasUpdated = false;

    client.on("qr", qr => {
      try {
        testQR = qr;
        qrcode.generate(qr, { small: true });
        res.redirect(
          `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=111b21&bgcolor=eee&margin=20&data=${encodeURIComponent(
            qr
          )}`
        );
      } catch (e) {}
    });

    client.on("ready", async () => {
      console.log("Client is ready!");
      init();
      while (!hasLoaded) {
        try {
          const prevSession = await getSession();
          session = prevSession;
          console.log(session, "is session");
          hasLoaded = true;
        } catch (e) {
          console.error("Init error:", e);
        }
      }

      setInterval(async () => {
        if (sessionHasUpdated) {
          sessionHasUpdated = false;
          if (await updateSession(session))
            console.log("session updated", session);
        }
      }, 5000);
    });

    client.on("message", async message => {
      if (message.body && hasLoaded) {
        const sender = message.from;
        if (session[sender]["stage"] != "final") sessionHasUpdated = true;
        if (!session[sender]) {
          await client.sendMessage(sender, welcome.welcome);
          session[sender] = { stage: "welcome" };
          await delay(4); // wait 4s
          await client.sendMessage(sender, welcome.welcome2);
          session[sender]["stage"] = "welcome2";
          await delay(4); // wait 4s
          await client.sendMessage(sender, welcome.fullname);
          session[sender]["stage"] = "fullname";
          return;
        } else if (session[sender]["stage"]) {
          switch (session[sender]["stage"]) {
            case "fullname":
              const fullname = message.body.trim().split(" ")[0];
              await client.sendMessage(
                sender,
                welcome.fullnameConfirm(fullname)
              );
              session[sender]["name"] = fullname;
              session[sender]["stage"] = "fullnameConfirm";
              break;
            case "fullnameConfirm":
              let response = message.body.trim().toLowerCase();
              if (response == "yes") {
                await client.sendMessage(sender, welcome.favClub);
                session[sender]["stage"] = "favClub";
              } else {
                await client.sendMessage(sender, welcome.fullname);
                session[sender]["stage"] = "fullnameConfirm";
                delete session[sender]["name"];
              }
              break;
            case "favClub":
              const clubResponse = message.body.toLowerCase().trim();
              //check if favClub is a number
              if (Number(clubResponse)) {
                if (+clubResponse > clubs.length || +clubResponse < 1) {
                  await client.sendMessage(
                    sender,
                    welcome.favClubWrongNumber(clubResponse)
                  );
                  break;
                }
                await client.sendMessage(
                  sender,
                  welcome.favClubConfirm(clubs[+clubResponse - 1])
                );
                session[sender]["stage"] = "favClubConfirm";
                session[sender]["favClub"] = clubs[+clubResponse - 1];
                break;
              }
              await client.sendMessage(
                sender,
                welcome.favClubConfirm(clubResponse)
              );
              session[sender]["stage"] = "favClubConfirm";
              session[sender]["favClub"] = clubResponse;

              break;
            case "favClubConfirm":
              const favCCResponse = message.body.trim().toLowerCase();
              if (favCCResponse == "yes") {
                await client.sendMessage(
                  sender,
                  welcome.welcomeUltimate(session[sender]["name"])
                );
                await delay(5);
                await client.sendMessage(sender, welcome.welcomeCoWinners);
                await delay(5);
                let planString = "Here are our available plans:";
                plans.forEach((plan, i) => {
                  planString += `\n\n${i + 1}. ${plan.body}`;
                });
                planString +=
                  "\n\nEnter the number for your corresponding plan:";
                await client.sendMessage(sender, planString);
                session[sender]["stage"] = "planConfirm";
              } else {
                await client.sendMessage(sender, welcome.favClub);
                session[sender]["stage"] = "favClub";
                delete session[sender]["favClub"];
              }
              break;
            case "planConfirm":
              const planResponse = message.body.trim().toLowerCase();
              if (
                Number(planResponse) &&
                !(+planResponse > plans.length || +planResponse < 1)
              ) {
                session[sender]["plan"] = plans[+planResponse - 1].title;
                session[sender]["stage"] = "final";
                await delay(2);
                await client.sendMessage(sender, welcome.final);
                const newUserData = {
                  name: session[sender].name,
                  fav_club: session[sender].favClub,
                  phone: sender.split("@")[0],
                  plan: session[sender].plan,
                  phone_id: sender
                };
                if (await newUser(newUserData)) {
                  client.sendMessage(
                    message.to,
                    `New User:
Name: ${newUserData.name}
PhoneNumber: ${newUserData.phone}
Plan: ${newUserData.plan}
Favourite Club: ${newUserData.fav_club}`
                  );
                }
              } else {
                await client.sendMessage(
                  sender,
                  "Invalid response. enter a number for a corresponding plan:"
                );
              }

              break;

            default:
              break;
          }
        }
        // chat(message.body, history, newHistory => {
        //   history = newHistory;
        //   message.reply(newHistory[newHistory.length - 1].content);
        // });
      }
    });

    client.initialize();
  } else {
    res.redirect(
          `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=111b21&bgcolor=eee&margin=20&data=${encodeURIComponent(
            testQR
          )}`
        );
  }
});

app.get('/end',(req, res)=>{
  if(SERVER){
    SERVER.close(()=>{console.log('stopped');
                     SERVER = app.listen(3000, () => {
  console.log("listening new...");
});});
    
  }
});

let port = process.env.PORT || 3000
let SERVER = app.listen(port, () => {
  console.log("listening first...", port);
});
