module.exports = {
    name: 'theta protocol',
    aliases: ['ctp', 'commence_tp', 'commence_theta_protocol', 'theta_protocol', 'tp'],
    description: 'Purge messages in a channel',
    usage: '<number>',
    guildOnly: true,
    cooldown: 1,
    execute(message, args) {

        const no_auth = {
            color: 0x0099ff,
            description: 'You are not authorized to use this command',
            timestamp: new Date(),
        };

        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply({ embed : no_auth });
        }

        const err = {
            color: 0x0099ff,
            description: 'That is not a number.',
            timestamp: new Date(),
        };

        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            err.description = 'That is not a number. Please return to preschool and learn to count.';
            message.reply({ embed : err });
        }
        else if (amount <= 1 || amount > 350) {
            err.description = 'That number isn\'t between 2 and 150. Please return to preschool and learn to count.';
            message.reply({ embed : err });
        }
        else {
            message.channel.bulkDelete(amount).catch(err => {
                console.log(err);
                err.description = 'Pay me more or I\'m going on strike!';
                message.reply({ embed : err });
            });
        }
    },
};