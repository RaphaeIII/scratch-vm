const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const socket = new WebSocket('ws://localhost:8083');

payload = '0';
socket.onmessage = ({data}) => {

    console.log(data);
    if (data !== undefined) {
        console.log(data);
        payload= data;
    }

};

const PowerMeter = {
    P1: '1',
    P2: '2',
    P3: '3',
    P4: '4',
};

class Scratch3NewBlocks {
    get BUTTONS_MENU () {
        return [
            {
                text: 'P1',
                value: PowerMeter.P1
            },
            {
                text: 'P2',
                value: PowerMeter.P2
            },
            {
                text: 'P3',
                value: PowerMeter.P3
            },
            {
                text: 'P4',
                value: PowerMeter.P4
            }
        ];
    }

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
                    opcode: 'payload',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'powermeter',
                        default: 'Power Meter [PM] Power [W] Voltage [V] Amperage [I]',
                        description: 'when a keyboard key is pressed'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: "NaN",
                            menu: 'buttons',
                        },
                        W:  {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        V:  {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        I:  {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                }
            ],
            menus: {
                buttons: {
                    acceptReporters: true,
                    items: this.BUTTONS_MENU
                },
            },
            translation_map: {
                it: {
                    'name': 'asdasdasd',
                }
            }
        };
    }

    payload (args) {
        return payload;
    }
}

module.exports = Scratch3NewBlocks;
