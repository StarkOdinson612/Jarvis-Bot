module.exports = {
    name: 'barn door protocol',
    aliases: ['commence_barn_door_protocol', 'barn_door_protocol', 'bdp', 'cbdp'],
    description: 'Lock down a channel',
    usage: '<channel> <duration>',
    guildOnly: true,
    cooldown: 3,
    execute(message, args) {

        const no_auth = {
            color: 0x0099ff,
            description: 'You are not authorized to use this command',
            timestamp: new Date(),
        };

        const conf = {
            color: 0x0099ff,
            description: 'Commencing server-wide lockdown',
            timestamp: new Date(),
        };

        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply({ embed : no_auth });
        }

        const role = message.guild.roles.cache.get('781551675143618560');
        const err = {
            color: 0x0099ff,
            description: 'That is not a number.',
            timestamp: new Date(),
        };

        if (args.length < 2) {
            const amount = parseInt(args[0]);

            if (isNaN(amount)) {return message.reply(err);}

            message.channel.updateOverwrite(role, { SEND_MESSAGES: false });

            conf.description = `Locking down ${message.channel.toString()} for ${amount} seconds`;
            message.reply({ embed : conf });

            setTimeout(function() {
                message.channel.updateOverwrite(role, { SEND_MESSAGES: true });
                conf.description = `Unlocked ${message.channel.toString()}`;
                message.reply({ embed : conf });
            }, amount * 1000);
        }
        else {
            const amount = parseInt(args[1]);
            const channel = message.mentions.channels.first();

            conf.description = `Locking down ${channel.toString()} for ${amount} seconds`;
            message.reply({ embed : conf });

            if (isNaN(amount)) {return message.reply(err);}

            channel.updateOverwrite(role, { SEND_MESSAGES: false });

            setTimeout(function() {
                channel.updateOverwrite(role, { SEND_MESSAGES: null });
                conf.description = `Unlocked ${message.channel.toString()}`;
                message.reply({ embed : conf });
            }, amount * 1000);
        }
    },
};