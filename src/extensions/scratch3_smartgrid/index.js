const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const socket = new WebSocket('ws://localhost:8083');

payload = '0';
timer = '0';
pout = '0';
pin = '0';
pm1 = '0';
pm2 = '0';

socket.onmessage = ({data}) => {

    console.log(data);
    if (data !== undefined) {
        console.log(JSON.parse(data));
        payload = JSON.parse(data);
        timer = payload.Time;
    }

};

const PowerMeterMes = {
    POWER: 'POWER',
    VOLTAGE: 'VOLTAGE',
    AMPERAGE: 'AMPERAGE',
};

const PowerMeterChannel = {
    CH1: 'CH1',
    CH2: 'CH2',
    CH3: 'CH3',
    CH4: 'CH4',
};

class Scratch3NewBlocks {
    get POWER_MES_MENU () {
        return [
            {
                text: 'Power',
                value: PowerMeterMes.POWER
            },
            {
                text: 'Voltage',
                value: PowerMeterMes.VOLTAGE
            },
            {
                text: 'Amperage',
                value: PowerMeterMes.AMPERAGE
            }
        ];
    };

    get POWER_CHANNEL_MENU_IO () {
        return [
            {
                text: 'Ch1',
                value: PowerMeterChannel.CH1
            },
            {
                text: 'Ch2',
                value: PowerMeterChannel.CH2
            },
            {
                text: 'Ch3',
                value: PowerMeterChannel.CH3
            },
            {
                text: 'Ch4',
                value: PowerMeterChannel.CH4
            }
        ];
    };

    get POWER_CHANNEL_MENU_1 () {
        return [
            {
                text: 'Ch1',
                value: PowerMeterChannel.CH1
            },
            {
                text: 'Ch2',
                value: PowerMeterChannel.CH2
            }
        ];
    };

    constructor (runtime) {
        this.runtime = runtime;
    }


    getInfo () {
        return {
            id: 'smartgrid',
            name: formatMessage({
                id: 'smartgridcategoryName',
                default: 'SmartGrid',
                description: 'Label for the SmartGrid extension category'
            }),
            blocks: [
                {
                    opcode: 'powerout',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'powerout',
                        default: 'Power OUT [PM] Channel [PCH]',
                        description: 'Power Measurement and its Channel'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterChannel.CH1,
                            menu: 'power_ch_io',
                        }
                    }
                },
                {
                    opcode: 'powerin',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'powerin',
                        default: 'Power IN [PM] Channel [PCH]',
                        description: 'Power Measurement and its Channel'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterChannel.CH1,
                            menu: 'power_ch_io',
                        }
                    }
                },
                {
                    opcode: 'powermet1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'powermet1',
                        default: 'Power Meter 1 [PM] Channel [PCH]',
                        description: 'Power Measurement and its Channel'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterChannel.CH1,
                            menu: 'power_ch_1',
                        }
                    }
                },
                {
                    opcode: 'powermet2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'powermet2',
                        default: 'Power Meter 2 [PM] Channel [PCH]',
                        description: 'Power Measurement and its Channel'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterChannel.CH1,
                            menu: 'power_ch_1',
                        }
                    }
                },
                {
                    opcode: 'time',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'time',
                        default: 'Time',
                        description: 'when a keyboard key is pressed'
                    }),

                }
            ],
            menus: {
                power_mes: {
                    acceptReporters: true,
                    items: this.POWER_MES_MENU,
                },
                power_ch_io: {
                    acceptReporters: true,
                    items: this.POWER_CHANNEL_MENU_IO,
                },
                power_ch_1: {
                    acceptReporters: true,
                    items: this.POWER_CHANNEL_MENU_1,
                },
            },
            translation_map: {
                'it': {
                    'name': 'asdasdasd',
                }
            }
        };
    }

    powerin (args) {
        return payload;
    };

    powerout (args) {
        return payload;
    };

    powermet1 (args) {
        return payload;
    };

    powermet2 (args) {
        return payload;
    };

    time (args) {
        return timer;
    }
}

module.exports = Scratch3NewBlocks;
