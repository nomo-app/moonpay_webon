const nomoCliConfig = {
    deployTargets: {
        production: {
            rawSSH: {
                sshHost: process.env.SSH_TARGET,
                sshBaseDir: "/var/www/production_webons/moonpay/",
                publicBaseUrl: "https://w.nomo.app/moonpay",
                hybrid: true,
            },
        },
    },
};

module.exports = nomoCliConfig;