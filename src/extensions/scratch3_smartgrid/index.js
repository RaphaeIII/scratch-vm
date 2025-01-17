require("regenerator-runtime/runtime");

const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDIuMzMgMzAyLjMzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzFkYTRkZDt9LmNscy0ye2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPklRIEJsdWU8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTU4Mi40OSwyMTkuMTZjMS42NCwzMC4xMy4yMiwxMDEuODksMCwxMTIuNjhsLTEuMzEuNzItMjYtMjcuNTNWMjk0LjM1YzAtMjAuMTcsMC00MC4zMywwLTYwLjQ5LS4wNy0yOS42OC0yMS40My01Mi41Ni01MC45Mi01My4yNi0zMC4zNS0uNzMtNTIsMjMtNTIuNzcsNDguNnEtMS4xNSw0MC43MSwwLDgxLjQ3YzEuMDgsMzcuNDIsNDQsNjAuOTQsNzYuNTQsNDIuNTNhMy4zNCwzLjM0LDAsMCwwLDEuODYtMkM1MjEsMzQxLjcyLDUxMi4xLDMzMi4xMiw1MDIuNywzMjJsMTYuNDktMTUuNzQsNzAuNTgsNzUuNDRjLTQuODksNS45NS0xMC44OSwxMC4zNS0xNi40MSwxNS44OC03LTcuNC0xMy43LTE0LjUxLTIwLjYxLTIxLjgxLTcuOTEsNS4yMy0xNi4wOSw5LjYzLTI1LjI0LDEwLjcyLTIxLjg4LDIuNi00NCw0LjktNjQuNjctNS40OC0yMi45NS0xMS41NC0zNi44NS0zMC4zMS0zOC40Ni01Ni4xNy0yLjExLTMzLjc2LS43My02Ny42Mi0uNjctMTAxLjQ0LDAtMjIuNzYsOC43OC00MS44MiwyNi45Mi01NiwxMS41OS05LjA4LDI0Ljg1LTE0LjI5LDM5LjY3LTE0LjM2LDExLjgtLjA2LDIzLjczLTEuNDUsMzUuNCwxLDEzLjgyLDIuOTEsMjUuMiw4LjQ4LDM0LjE3LDE2LjYyYTcxLjI4LDcxLjI4LDAsMCwxLDIyLjYyLDQ4LjQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyMi45NSAtMTIzLjk0KSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTU5NC4yMiwyMDkuMzYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMjIuOTUgLTEyMy45NCkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zNjUuMTcsMzg4LjI0di0yMzVoMjd2MjM1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyMi45NSAtMTIzLjk0KSIvPjxyZWN0IGNsYXNzPSJjbHMtMiIgd2lkdGg9IjMwMi4zMyIgaGVpZ2h0PSIzMDIuMzMiLz48L3N2Zz4=';
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDIuMzMgMzAyLjMzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPklRPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01NzQuMTcsMjU0LjU2YzEuNjUsMzAuMTMuMjMsMTAxLjg5LDAsMTEyLjY4bC0xLjMuNzJjLTguNTYtOS4wNy0xNy4xMy0xOC4xMy0yNi0yNy41M1YzMjkuNzVjMC0yMC4xNywwLTQwLjMzLDAtNjAuNS0uMDctMjkuNjctMjEuNDMtNTIuNTUtNTAuOTItNTMuMjUtMzAuMzUtLjczLTUyLDIzLTUyLjc3LDQ4LjU5cS0xLjE1LDQwLjcxLDAsODEuNDhjMS4wOSwzNy40Miw0NCw2MC45NCw3Ni41NSw0Mi41M2EzLjMsMy4zLDAsMCwwLDEuODUtMmwtMjcuMTQtMjkuMTUsMTYuNS0xNS43NSw3MC41OCw3NS40NWMtNC44OSw1Ljk0LTEwLjg5LDEwLjM1LTE2LjQxLDE1Ljg4bC0yMC42MS0yMS44MmMtNy45MSw1LjI0LTE2LjA5LDkuNjQtMjUuMjQsMTAuNzMtMjEuODgsMi42LTQ0LDQuOS02NC42Ny01LjQ4LTIyLjk1LTExLjU0LTM2Ljg2LTMwLjMyLTM4LjQ3LTU2LjE3LTIuMS0zMy43Ni0uNzItNjcuNjItLjY3LTEwMS40NCwwLTIyLjc2LDguNzktNDEuODMsMjYuOTMtNTYsMTEuNTktOS4wNywyNC44NC0xNC4yOCwzOS42Ny0xNC4zNSwxMS44LS4wNiwyMy43My0xLjQ1LDM1LjQsMSwxMy44MiwyLjkxLDI1LjE5LDguNDgsMzQuMTcsMTYuNjJhNzEuMTUsNzEuMTUsMCwwLDEsMjIuNjEsNDguNDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzExLjc3IC0xNjIuMzUpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTg1LjkxLDI0NC43NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMxMS43NyAtMTYyLjM1KSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM1Ni44NSw0MjMuNjR2LTIzNWgyN3YyMzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzExLjc3IC0xNjIuMzUpIi8+PHJlY3QgY2xhc3M9ImNscy0yIiB3aWR0aD0iMzAyLjMzIiBoZWlnaHQ9IjMwMi4zMyIvPjwvc3ZnPg==';
const Promise = require('promise');
var socket = new WebSocket('ws://localhost:8083');

function connect() {
    var socket = new WebSocket('ws://localhost:8083');

    socket.onclose = function(e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    };

    socket.onerror = function(err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        socket.close();
    };
}

connect();
//socket.onerror = OnSocketError;
//
//function OnSocketError() {
//    alert('Please Reload The App');
//}

let result;


//Hide Error
// function debug_done() {
//     window.onerror = function (message, url, lineNumber) {
//         // code to execute on an error
//         return true; // prevents browser error messages
//     };
// }


// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//         if ((new Date().getTime() - start) > milliseconds) {
//             break;
//         }
//     }
// }

const PowerMeterMes = {
    POWER: 'Power',
    VOLTAGE: 'Voltage',
    CURRENT: 'Current',
    ENERGY: 'Energy',
};

const SimulationTime = {
    MINUTE: 'Minute',
    HOUR: 'Hour',
    DAY: 'Day',
    //WEEK: 'Week',
    MONTH: 'Month',
};

const PowerMeterChannel = {
    A: 'A',
    B: 'B'
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
    LINE1: 'Line1',
    LINE2: 'Line2',
    LINE3: 'Line3',
    LINE4: 'Line4',
};

const Simulation = {
    RUN: 'Run',
    STOP: 'Stop'
}

class Scratch3NewBlocks {
    get SIMULATION_STATE() {
        return [
            {
                text: 'Run',
                value: Simulation.RUN
            },
            {
                text: 'Stop',
                value: Simulation.STOP
            }
        ]
    }

    get SWITCH_BOARD_IN() {
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

    get SWITCH_BOARD_OUT() {
        return [
            {
                text: 'Line1',
                value: SwitchBoard.LINE1
            },
            {
                text: 'Line2',
                value: SwitchBoard.LINE2
            },
            {
                text: 'Line3',
                value: SwitchBoard.LINE3
            },
            {
                text: 'Line4',
                value: SwitchBoard.LINE4
            }
        ];
    };

    get POWER_MES_MENU() {
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
                text: 'Current',
                value: PowerMeterMes.CURRENT
            },
            {
                text: 'Energy',
                value: PowerMeterMes.ENERGY
            }
        ];
    };

    get POWER_CHANNEL_MENU_IO() {
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

    get SIMULATION_TIME_MENU() {
        return [
            {
                text: 'Minute',
                value: SimulationTime.MINUTE
            },
            {
                text: 'Hour',
                value: SimulationTime.HOUR
            },
            {
                text: 'Day',
                value: SimulationTime.DAY
            },
            //{
            //    text: 'Week',
            //    value: SimulationTime.WEEK
            //},
            {
                text: 'Month',
                value: SimulationTime.MONTH
            }
        ];
    };

    get POWER_CHANNEL_MENU_1() {
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

    get POWER_STATION_FE() {
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

    constructor(runtime) {
        this.runtime = runtime;
    }


    getInfo() {
        return {
            id: 'smartgrid',
            menuIconURI: menuIconURI,
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
                        OUT: {
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
                        OUT: {
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
                        CL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        }
                    }
                },
                {
                    opcode: 'simulation_time',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'simulation_time',
                        default: 'Simulation Time [SM]',
                        description: 'Get the measurement result from connection board measuring selected channel'
                    }),
                    arguments: {
                        SM: {
                            type: ArgumentType.STRING,
                            defaultValue: SimulationTime.MINUTE,
                            menu: 'simulation_time',
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
                        PCH: {
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
                        PCH: {
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
                        PCH: {
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
                simulation_time: {
                    acceptReporters: true,
                    items: this.SIMULATION_TIME_MENU,
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
                'en': {
                    'smartgridcategoryName': 'asdasdasd',
                }
            }
        };
    }


    switchboardcon(args) {
        let cmd = 'CB Connect';
        let payload = {'Source': args.IN, 'Destination': args.OUT};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};
        let promise;

        socket.send(JSON.stringify(request));

        promise = new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })

        console.log(promise);
    };

    switchboard_disconn(args) {
        let cmd = 'CB Disconnect';
        let payload = {'Source': args.IN, 'Destination': args.OUT};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};
        let promise;

        socket.send(JSON.stringify(request));

        promise = new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })

        console.log(promise);
    };

    powerstation(args) {
        let cmd = 'Fossil Energy';
        let args_CL = parseFloat(args.CL);
        let payload = {'FE_Selector': args.FE, 'Current_Limit': args_CL};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};
        let promise;

        socket.send(JSON.stringify(request));

        promise = new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })

        console.log(promise);
    };


    power_meter_cb(args) {

        let cmd = 'Power Meter CB';
        let payload = {'Channel': args.PCH, 'Mode': args.PM};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};

        socket.send(JSON.stringify(request));

        return new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })
    };


    powermet1(args) {
        let cmd = 'Power Meter 1';
        let payload = {'Channel': args.PCH, 'Mode': args.PM};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};

        socket.send(JSON.stringify(request));

        return new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })
    };

    powermet2(args) {
        let cmd = 'Power Meter 2';
        let payload = {'Channel': args.PCH, 'Mode': args.PM};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};

        socket.send(JSON.stringify(request));

        return new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })
    };

    simulation_time(args) {

        let cmd = 'Simulation Time';
        let payload = {'Mode': args.SM};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};

        socket.send(JSON.stringify(request));

        return new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })
    };


    simulation(args) {
        let cmd = 'Simulation';
        let payload = {'Mode': args.IN};
        let payload_json = JSON.stringify(payload)
        let request = {'CMD': cmd, 'Payload': payload_json};
        let promise;

        socket.send(JSON.stringify(request));

        promise = new Promise((res, rej) => {
            socket.onmessage = function ({data}) {

                try {
                    let response = JSON.parse(data);
                    if (response.Done) {
                        result = JSON.parse(response.Payload);
                        result = result.Result;
                        res(result);
                    }
                } catch (e) {
                    rej('Connection lost or something went wrong')
                }
            }
        })

        console.log(promise);
    }
}

module.exports = Scratch3NewBlocks;



