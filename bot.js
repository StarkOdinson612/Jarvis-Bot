/* eslint-disable no-unused-vars */
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, alias } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const protocols = {
    color: 0x099ff,
    title: 'Protocols Available:',
    fields: [{
        name: 'Theta Protocol',
        value: 'Purge',
    },
    {
        name: 'Barn Door Protocol',
        value: 'Lock Down All Channels',
    },
    {
        name: 'Infinity Gauntlet',
        value: 'Full Lockdown',
    },
    ],
};

const commands = {
    color: 0x099ff,
    title: 'Commands Available:',
    fields: [{
        name: 'Destroy',
        value: 'Ban member. Use d, des, or destroy.',
    },
    {
        name: 'Neutralise',
        value: 'Kick member. Use n, neut, or neutralise.',
    },
    ],
};

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

    const msg = message.content.toUpperCase();

    if ((!msg.startsWith(prefix) && !msg.startsWith(alias)) || message.author.bot) return;

    let args = '';


    if (msg.startsWith(prefix)) {args = message.content.slice(prefix.length).trim().split(/ +/);}
    else if (msg.startsWith(alias)) {args = message.content.slice(alias.length).trim().split(/ +/);}

    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {

        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(process.env.BOT_TOKEN);