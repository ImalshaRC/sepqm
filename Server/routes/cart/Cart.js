const router = require("express").Router();
let Cart = require("../../models/cart/Cart.js");
const { User } = require("../../models/User/User.js");

router.route("/add").post((req,res) => {

    const email = req.body.email;
    const name = req.body.name;
    const showTime = req.body.showTime;
    const theatre = req.body.theatre;

    const cart = new Cart({

        email, name, theatre,  showTime

    })

    cart.save().then(() => {
        res.json("cart added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req, res) => {
    Cart.find().then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => {
    let cartID = req.params.id;

    await Cart.findById(cartID).then((cart) => {
        res.json(cart);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched cart", error: error.message});
    })
})

router.route("/update/:id").put(async (req, res) => {
    let cartID = req.params.id;
    const {email, name, showTime, theatre } = req.body;

    const updateCart = {
        email, name,  showTime, theatre
    }

    const update = await Cart.findByIdAndUpdate(cartID, updateCart).then(() => {

        res.status(200).send({status: "Cart updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: error.message});
    })

    
})


router.route("/delete/:id").delete(async (req, res) => {
    let cartID = req.params.id;

    await Cart.findByIdAndDelete(cartID).then(() => {
            res.status(200).send({ status: "Cart deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Cart", error: err.message });
        });
});

module.exports = router;