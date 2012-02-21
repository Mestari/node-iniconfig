/**
 * Ini config reader
 *
 * @author appr
 */

var iniparser = require('iniparser'),
    path = require('path')
;

module.exports = {

    /**
     * Read config
     *
     * @param configPath
     */
    readConfig: function(configPath) {
        var config = iniparser.parseSync(configPath + '.ini'),
            localConfig = null
        ;

        if (path.existsSync(configPath + '.local.ini')) {
            localConfig = iniparser.parseSync(configPath + '.local.ini');
            var i;
            Object.keys(localConfig).forEach(function(i) {
                if (!config[i]) {
                    config[i] = localConfig[i];
                } else {
                    if (typeof localConfig[i] == 'object') {
                        Object.keys(localConfig[i]).forEach(function(j) {
                            if (!config[i]) {
                                config[i] = {};
                            }
                            config[i][j] = localConfig[i][j];
                        });
                    }
                }
            });
        }

        return config;
    }
};
