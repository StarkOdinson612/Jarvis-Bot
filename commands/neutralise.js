module.exports = {
    name: 'neutralise',
    aliases: ['neut', 'n', 'neutralize'],
    description: 'Kick Member',
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

        const kick = {
            color: 0x0099ff,
            description: 'Kicked member',
            timestamp: new Date(),
        };

        const taggedUser = message.mentions.members.first();

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply({ embed : no_auth });
            return;
        }

        if (taggedUser.hasPermission('KICK_MEMBERS')) {
            message.reply({ embed : staff_err });
            return;
        }

        if (args.length < 2) {
            const reason = ' for no reason at all, get a life you mod power abuser!';
            kick.description = 'Kicked ' + taggedUser.toString() + reason;
        }
        else {
            const find = args.length;
            const reason = args.slice(1, find).join(' ');
            kick.description = 'Kicked ' + taggedUser.toString() + '\nReason: ' + reason;
        }
        message.reply({ embed : kick });
    },
};