const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const no_auth = {
    color: 0x0099ff,
    description: 'Not authorized to use command',
    timestamp: new Date(),
};

const kick = {
    color: 0x0099ff,
    description: 'Kicked member',
    timestamp: new Date(),
};

const ban = {
    color: 0x0099ff,
    description: 'Banned member',
    timestamp: new Date(),
};

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
    if ((message.content.startsWith(config.prefix[0]) || message.content.startsWith(config.prefix[1])) && !message.author.bot) {
        if (message.content.includes('protocols')) {
            message.channel.send({ embed : protocols });
        }
        else if (message.content.includes('destroy') || message.content.includes('des') || message.content.includes('d')) {
            const member = message.mentions.members.first();
            ban.description = 'Banned ' + member.displayName;
            if (message.member.hasPermission('BAN_MEMBERS')) {
                message.channel.send({ embed : ban });
                member.ban();
            }
            else {
                message.channel.send({ embed : no_auth });
            }
        }
        else if (message.content.includes('neutralize') || message.content.includes('neut') || message.content.includes('n')) {
            const member = message.mentions.members.first();
            if (message.member.hasPermission('KICK_MEMBERS')) {
                kick.description = 'Kicked ' + member.displayName;
                message.channel.send({ embed : kick });
                member.kick();
            }
            else {
                message.channel.send({ embed : no_auth });
            }
        }
        else {
            message.channel.send({ embed : commands });
        }
    }
});

client.login(config.token);