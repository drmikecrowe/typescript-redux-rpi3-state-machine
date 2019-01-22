module.exports = {
    start: "Closed",
    transitions: [
        { name: 'doOpen',  from: 'Closed', to: 'Opened',   dot: { color: 'blue', headport: 'n', tailport: 'n' } },
        { name: 'doClose', from: 'Opened',   to: 'Closed', dot: { color: 'red',   headport: 's', tailport: 's' } }
    ],
    statedefs: [ 
        { name: 'Opened',   dot: { color: 'blue', headport: 'n', tailport: 'n' } },
        { name: 'Closed', dot: { color: 'red',   headport: 's', tailport: 's' } }
    ],
}
 