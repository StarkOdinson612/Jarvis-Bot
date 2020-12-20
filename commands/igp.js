module.exports = {
    name: 'infinity gauntlet protocol',
    aliases: ['cigp', 'igp', 'commence_infinity_gauntlet_protocol', 'infinity_gauntlet_protocol'],
    description: 'Lock down all channels',
    usage: '<duration>',
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

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply({ embed : no_auth });
        }

        const role = message.guild.roles.cache.get('781551675143618560');
        const role2 = message.guild.roles.cache.get('785944764222406707');

        const err = {
            color: 0x0099ff,
            description: 'That is not a number.',
            timestamp: new Date(),
        };

        const amount = parseInt(args[0]);

        if (isNaN(amount)) {return message.reply(err);}

        const perms = role.permissions.toArray();

        conf.description = `Commencing server-wide lockdown of ${message.guild} for ${amount} seconds.`;

        message.reply({ embed : conf });

        role2.setPermissions(['VIEW_CHANNEL']);
        role.setPermissions(['VIEW_CHANNEL']);

        setTimeout(function() {
            role.setPermissions(perms);
            role2.setPermissions(perms);

            conf.description = `Commencing unlocking of ${message.guild}.`;

            message.reply({ embed : conf });
        }, amount * 1000);
    },
};