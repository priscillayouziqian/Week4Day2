const houses = require('./db.json');
const globalID = 4;

module.exports = {
    getHouses: (req, res) => {
       res.status(200).send(houses);
    },
    deleteHouse: (req, res) => {
       const id = Number(req.params.id);
       const index = houses.findIndex(elem => elem.id === id);
       houses.splice(index, 1);
       res.status(200).send(houses);
    },
    createHouse: (req, res) => {
       let {address, price, imageURL} = req.body;
       price = Number(price);
       const newHouse = {
        id: globalID,
        address: address,
        price,
        imageURL
       };
       houses.push(newHouse);
       res.status(200).send(houses);
       globalID++;
    },
    updateHouse: (req, res) => {
        // console.log(req.params);
       let {id} = req.params;
       id = Number(id);
       const {type} = req.body;
       const index = houses.findIndex(elem => elem.id === id);

       if(houses[index].price === 0 && type === 'minus'){
        res.status(400).send('cannot go under 0 dollor');
       }else if(type === 'plus'){
        houses[index].price += 10000;
        res.status(200).send(houses);
       }else if(type === 'minus'){
        houses[index].price -= 10000;
        res.status(200).send(houses);
       }else{
        res.sendStatus(400);
       }
    },
}

