const nomoCliConfig = {
    deployTargets: {
        production: {
            rawSSH: {
                sshHost: process.env.SSH_TARGET,
                sshBaseDir: "/var/www/moonpay/",
                publicBaseUrl: "https://moonpay.nomo.zone",
                targz: false,
            },
        },
    },
};

module.exports = nomoCliConfig;