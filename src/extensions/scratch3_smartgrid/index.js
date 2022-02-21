const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const socket = new WebSocket('ws://localhost:8083');


const blockIconURI = 'data:image/jpeg;base64,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';
result = '0';
//payload = '0';
//timer = '0';
//pout = '0';
//pin = '0';
//pm1 = '0';
//pm2 = '0';

let payload = {};
let done = false;

//socket.onmessage = ({data}) => {
//
//    console.log(data);
//    if (data !== undefined) {
//        console.log(JSON.parse(data));
//        payload = JSON.parse(data);
//        timer = payload.Time;
//    }
//
//};

const PowerMeterMes = {
    POWER: 'POWER',
    VOLTAGE: 'VOLTAGE',
    CURRENT: 'CURRENT',
};

const PowerMeterChannel = {
    A: 'A',
    B: 'B',
};

const PowerStationFE = {
    FE1: 'FE1',
    FE2: 'FE2',
};

const SwitchBoard = {
    A1: 'A1',
    A2: 'A2',
    A3: 'A3',
    A4: 'A4',
    B1: 'B1',
    B2: 'B2',
    B3: 'B3',
    B4: 'B4',
    ALL: 'All',
};

const Simulation = {
    RUN: 'Run',
    STOP: 'Stop'
}

class Scratch3NewBlocks {
    get SIMULATION_STATE () {
        return [
            {
                text: 'Run',
                value:Simulation.RUN
            },
            {
                text: 'Stop',
                value: Simulation.STOP
            }
        ]
    }
    get SWITCH_BOARD_IN () {
        return [
            {
                text: 'A1',
                value: SwitchBoard.A1
            },
            {
                text: 'A2',
                value: SwitchBoard.A2
            },
            {
                text: 'A3',
                value: SwitchBoard.A3
            },
            {
                text: 'A4',
                value: SwitchBoard.A4
            },
            {
                text: 'All',
                value: SwitchBoard.ALL
            }
        ];
    };
    get SWITCH_BOARD_OUT () {
        return [
            {
                text: 'B1',
                value: SwitchBoard.B1
            },
            {
                text: 'B2',
                value: SwitchBoard.B2
            },
            {
                text: 'B3',
                value: SwitchBoard.B3
            },
            {
                text: 'B4',
                value: SwitchBoard.B4
            },
            {
                text: 'All',
                value: SwitchBoard.ALL
            }
        ];
    };
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
                value: PowerMeterMes.CURRENT
            }
        ];
    };

    get POWER_CHANNEL_MENU_IO () {
        return [
            {
                text: 'A1',
                value: SwitchBoard.A1
            },
            {
                text: 'A2',
                value: SwitchBoard.A2
            },
            {
                text: 'A3',
                value: SwitchBoard.A3
            },
            {
                text: 'A4',
                value: SwitchBoard.A4
            },
            {
                text: 'B1',
                value: SwitchBoard.B1
            },
            {
                text: 'B2',
                value: SwitchBoard.B2
            },
            {
                text: 'B3',
                value: SwitchBoard.B3
            },
            {
                text: 'B4',
                value: SwitchBoard.B4
            }
        ];
    };

    get POWER_CHANNEL_MENU_1 () {
        return [
            {
                text: 'A',
                value: PowerMeterChannel.A
            },
            {
                text: 'B',
                value: PowerMeterChannel.B
            }
        ];
    };

    get POWER_STATION_FE () {
        return [
            {
                text: 'FE1',
                value: PowerStationFE.FE1
            },
            {
                text: 'FE2',
                value: PowerStationFE.FE2
            }
        ];
    };

    constructor (runtime) {
        this.runtime = runtime;
    }



    getInfo () {
        return {
            id: 'smartgrid',
            blockIconURI: blockIconURI,
            name: formatMessage({
                id: 'smartgridcategoryName',
                default: 'SmartGrid',
                description: 'Label for the SmartGrid extension category'
            }),
            blocks: [
                {
                    opcode: 'simulation',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'simulation',
                        default: 'Simulation [IN]',
                        description: 'Set simulation state'
                    }),
                    arguments: {
                        IN: {
                            type: ArgumentType.STRING,
                            defaultValue: Simulation.RUN,
                            menu: 'simulation_state',
                        }
                    }
                },
                {
                    opcode: 'switchboardcon',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'switchboardcon',
                        default: 'Connect [IN] to [OUT]',
                        description: 'Set a connection between source and destination of the Connection Board'
                    }),
                    arguments: {
                        IN: {
                            type: ArgumentType.STRING,
                            defaultValue: SwitchBoard.C1,
                            menu: 'switch_board_in',
                        },
                        OUT:  {
                            type: ArgumentType.STRING,
                            defaultValue: SwitchBoard.C1,
                            menu: 'switch_board_out',
                        }
                    }
                },
                {
                    opcode: 'switchboard_disconn',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'switchboard_disconn',
                        default: 'Disconnect [IN] from [OUT]',
                        description: 'Disconnect connection between source and destination of the Connection Board'
                    }),
                    arguments: {
                        IN: {
                            type: ArgumentType.STRING,
                            defaultValue: SwitchBoard.C1,
                            menu: 'switch_board_in',
                        },
                        OUT:  {
                            type: ArgumentType.STRING,
                            defaultValue: SwitchBoard.C1,
                            menu: 'switch_board_out',
                        }
                    }
                },
                {
                    opcode: 'powerstation',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'powerstation',
                        default: 'Fossil Energy [FE] Current limit [CL]',
                        description: 'Set current limit for FE1 or FE2'
                    }),
                    arguments: {
                        FE: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerStationFE.VOLTAGE,
                            menu: 'power_st_fe',
                        },
                        CL:  {
                            type: ArgumentType.STRING,
                            defaultValue: '0',
                        }
                    }
                },
                {
                    opcode: 'power_meter_cb',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'power_meter_cb',
                        default: 'Power Meter CB [PM] Channel [PCH]',
                        description: 'Get the measurement result from connection board measuring selected channel'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: SwitchBoard.A1,
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
                        description: 'Get Measurement results from power meter 1'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterChannel.A,
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
                        description: 'Get Measurement results from power meter 2'
                    }),
                    arguments: {
                        PM: {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterMes.VOLTAGE,
                            menu: 'power_mes',
                        },
                        PCH:  {
                            type: ArgumentType.STRING,
                            defaultValue: PowerMeterChannel.A,
                            menu: 'power_ch_1',
                        }
                    }
                }
            ],
            menus: {
                simulation_state: {
                  acceptReporters: true,
                  items: this.SIMULATION_STATE
                },
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
                power_st_fe: {
                    acceptReporters: true,
                    items: this.POWER_STATION_FE,
                },
                switch_board_in: {
                    acceptReporters: true,
                    items: this.SWITCH_BOARD_IN,
                },
                switch_board_out: {
                    acceptReporters: true,
                    items: this.SWITCH_BOARD_OUT
                }
            },
            translation_map: {
                'it': {
                    'name': 'asdasdasd',
                }
            }
        };
    }


    switchboardcon (args) {
        return payload;
    };

    switchboard_disconn (args) {
        return payload;
    };

    powerstation (args) {
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
        let cmd = 'Fossil Energy';
        let payload = {'FE_Selector': args.FE, 'Current_Limit': args.CL};
        let request = {'CMD': cmd, 'Payload': payload};

        //socket.send(request);
        console.log(request);

        socket.send(JSON.stringify(request));

        function done_loop(){
            sleep(0)
            {
                socket.onmessage = ({data} = 0) => {

                    console.log(JSON.parse(data));

                    if (data !== undefined) {
                        try {
                            let response = JSON.parse(data);
                            if (response.Done) {
                                result = response.Payload;
                                console.log(result);
                                done = true;

                            }
                        } catch (e) {
                            console.log('no data')
                        }
                    }
                };

                if (!done) {
                    socket.onmessage();
                }
            }
        }

        done_loop();
        console.log(result);
        done = false;
        return result;
    };

    power_meter_cb (args) {
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
                let cmd = 'Power Meter CB';
                let payload = {'Channel': args.PCH, 'Mode': args.PM};
                let payloadjson = JSON.stringify(payload)
                let request = {'CMD': cmd, 'Payload': payloadjson};

                //socket.send(request);
                console.log(request);

                socket.send(JSON.stringify(request));

                function done_loop(){
                    sleep(0)
                    {
                        socket.onmessage = ({data} = 0) => {

                            console.log(JSON.parse(data));

                            if (data !== undefined) {
                                try {
                                let response = JSON.parse(data);
                                if (response.Done) {
                                    result = JSON.parse(response.Payload);
                                    result = result.Result;
                                    console.log(result);
                                    done = true;

                                }
                                } catch (e) {
                                    console.log('no data')
                                }
                            }
                        };

                        if (!done) {
                            socket.onmessage();
                        }
                    }
                }

                done_loop();
                console.log(result);
                done = false;
                return result;
    };


    powermet1 (args) {
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
        let cmd = 'Power Meter 1';
        let payload = {'Channel': args.PCH, 'Mode': args.PM};
        let request = {'CMD': cmd, 'Payload': payload};

        //socket.send(request);
        console.log(request);

        socket.send(JSON.stringify(request));

        function done_loop(){
            sleep(0)
            {
                socket.onmessage = ({data} = 0) => {

                    console.log(JSON.parse(data));

                    if (data !== undefined) {
                        try {
                            let response = JSON.parse(data);
                            if (response.Done) {
                                result = JSON.parse(response.Payload);
                                result = result.Result;
                                console.log(result);
                                done = true;

                            }
                        } catch (e) {
                            console.log('no data')
                        }
                    }
                };

                if (!done) {
                    socket.onmessage();
                }
            }
        }

        done_loop();
        console.log(result);
        done = false;
        return result;
    };

    powermet2 (args) {
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
        let cmd = 'Power Meter 2';
        let payload = {'Channel': args.PCH, 'Mode': args.PM};
        let request = {'CMD': cmd, 'Payload': payload};

        //socket.send(request);
        console.log(request);

        socket.send(JSON.stringify(request));

        function done_loop(){
            sleep(0)
            {
                socket.onmessage = ({data} = 0) => {

                    console.log(JSON.parse(data));

                    if (data !== undefined) {
                        try {
                            let response = JSON.parse(data);
                            if (response.Done) {
                                result = JSON.parse(response.Payload);
                                result = result.Result;
                                console.log(result);
                                done = true;

                            }
                        } catch (e) {
                            console.log('no data')
                        }
                    }
                };

                if (!done) {
                    socket.onmessage();
                }
            }
        }

        done_loop();
        console.log(result);
        done = false;
        return result;
    };

    simulation (args) {
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
        let cmd = 'Simulation';
        let payload = {'Mode': args.IN};
        let request = {'CMD': cmd, 'Payload': payload};

        //socket.send(request);
        console.log(request);

        socket.send(JSON.stringify(request));

        function done_loop(){
            sleep(0)
            {
                socket.onmessage = ({data} = 0) => {

                    console.log(JSON.parse(data));

                    if (data !== undefined) {
                        try {
                            let response = JSON.parse(data);
                            if (response.Done) {
                                result = response.Payload;
                                console.log(result);
                                done = true;

                            }
                        } catch (e) {
                            console.log('no data')
                        }
                    }
                };

                if (!done) {
                    socket.onmessage();
                }
            }
        }

        done_loop();
        console.log(result);
        done = false;
        return result;
    }
}

module.exports = Scratch3NewBlocks;
