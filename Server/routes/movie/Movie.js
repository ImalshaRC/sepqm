const router = require("express").Router();
let Movie = require("../../models/movie/Movie.js");
const { User } = require("../../models/User/User.js");

router.route("/add").post((req,res) => {

    const name = req.body.name;
    const description = req.body.description;
    const cast = req.body.cast;
    const showTime = req.body.showTime;

    const movie = new Movie({

        name, description, cast, showTime

    })

    movie.save().then(() => {
        res.json("movie added succesfully..");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req, res) => {
    Movie.find().then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res) => {
    let movieID = req.params.id;

    await Movie.findById(movieID).then((movie) => {
        res.json(movie);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched movie", error: error.message});
    })
})

router.route("/update/:id").put(async (req, res) => {
    let movieID = req.params.id;
    const {name, description, cast, showTime} = req.body;

    const updateMovie = {
        name, description, cast, showTime
    }

    const update = await Movie.findByIdAndUpdate(movieID, updateMovie).then(() => {

        res.status(200).send({status: "Movie updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: error.message});
    })

    
})


router.route("/delete/:id").delete(async (req, res) => {
    let movieID = req.params.id;

    await Movie.findByIdAndDelete(movieID).then(() => {
            res.status(200).send({ status: "Movie deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Movie", error: err.message });
        });
});

module.exports = router;