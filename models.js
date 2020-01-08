const db = [];

function all() {
    return [    // return a new array
        ...db   // with the contents of `db`sprinkled inside
    ];
};

function create(name, joyVal) {
    // if I wanted to store 'on' or 'off'
    // instead of 'on' or undefinded
    // let givesJoy = joyVal || 'off';

    // I want to test if 'joyVal' is truthy
    // if it is, I want 'true'
    // else, I want 'false'

    // let givesJoy = false;
    // if (joyVal) {
    //     givesJoy = true;
    // }
    
    // this is the ternary operator:
    let givesJoy = joyVal? true: false;
    // let givesJoy = joyVal? '🍺' : '🏄🏼‍♂️';


    // it tests a value for truthy-ness
    // if the value is truthy, resolves to the thing on the left of the colon
    // if the value is false, resolves to the right thing of the colin

    const newItem = {
        name, 
        givesJoy
    };
    db.push(newItem);
};

const stuff = {
    all,
    create
};

// const users = {
//     allUsers,
//     signUp,
//     login
// };

module.exports = {
    stuff,
    //users
};