const command = 'navigate';
const config = {
    //'slots': {},
    // 'utterances': [
    //     'open projects',
    //     'open my projects',
    //     'show projects',
    //     'show my projects',
    //     'go to projects',
    //     'go to my projects',
    //     'browse projects',
    //     'browse my projects',
    //     'navigate to projects',
    //     'navigate to my projects'
    // ]
};

module.exports = {
    command,
    config,
    handler,

    use: ({ expressApp, alexaApp, expressWs }) => {
        alexaApp.intent(command, config, (req, res) => handler({ req, res, expressApp, alexaApp, expressWs }));
    }
};

function handler({ req, res, expressApp, alexaApp, expressWs }) {
    res.say('Ok');

    const pathSlot = res.slots('path');

    console.log('path slot', pathSlot);

    if (pathSlot.value === 'index') {
        pathSlot.value = '';
    }

    expressWs.getWss('/commands').clients
        .forEach((client) => {
            client.send(JSON.stringify({command: 'navigate', path: `/${pathSlot.value}`}));
        });
}
