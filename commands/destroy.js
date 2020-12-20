module.exports = {
    name: 'destroy',
    aliases: ['des', 'd'],
    description: 'Ban Member',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    execute(message, args) {

        const no_auth = {
            color: 0x0099ff,
            description: 'You are not authorized to use this command',
            timestamp: new Date(),
        };

        const staff_err = {
            color: 0x0099ff,
            description: 'This member is a member of the staff',
            timestamp: new Date(),
        };

        const ban = {
            color: 0x0099ff,
            description: 'Banned member',
            timestamp: new Date(),
        };

        const taggedUser = message.mentions.members.first();

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.reply({ embed : no_auth });
            return;
        }

        if (taggedUser.hasPermission('BAN_MEMBERS')) {
            staff_err.description = taggedUser.toString() + ' is a member of the staff';
            message.reply({ embed : staff_err });
            return;
        }

        if (args.length < 2) {
            message.reply('Please provide a reason for the ban!');
            return;
        }
        else {
            const find = args.length;
            const reason = args.slice(1, find).join(' ');
            ban.description = 'Banned ' + taggedUser.toString() + '\nReason: ' + reason;
        }
        message.reply({ embed : ban });
    },
};