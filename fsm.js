module.exports = {
    start: "Closed",
    transitions: [
        { name: 'doOpen',  from: 'Closed', to: 'Opened',   dot: { color: 'blue' } },
        { name: 'doClose', from: 'Opened',   to: 'Closed', dot: { color: 'red' } }
    ],
    statedefs: [ 
        { name: 'Opened',   dot: { color: 'blue' } },
        { name: 'Closed', dot: { color: 'red' } }
    ],
}
 