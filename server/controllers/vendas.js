const mongoose = require("mongoose");

const sellSchema = require("../models/vendas");

const sellModel = mongoose.model("sell");

const moment = require("moment");

let sellController = {};

var fullDate = moment().format("DD/MM/YY");

sellController.allSells = (req, res) => {
    sellModel
        .find({
            'state': "open"
        })
        .then(results => {
            res.json(results);
        })
        .catch(err => res.json(err));
};

sellController.allClosedSells = (req, res) => {
    sellModel
        .find({
            'state': "closed"
        })
        .then(results => {
            res.json(results);
        })
        .catch(err => res.json(err));

};

sellController.allClosedSellsByDate = (req, res) => {

    const date = req.query.date
    const query = date.replace("20", '')
    sellModel
        .find({
            'state': "closed", 
            'date.fullDate': query
        })
        .then(results => {
            //console.log(results);
            res.json(results);
        })
        .catch(err => res.json(err));

};

sellController.someSells = (req, res) => {
    sellModel
        .findById(req.query.id)
        .then(results => res.json(results))
        .catch(err =>
            res.json({
                message: "Venda nao encontrada",
                status: 400,
                err: err
            })
        );
};

// ! IMPORTANT
sellController.newSells = (req, res) => {
    var client = req.body.client;
    var product = req.body.products;
    var pagamento = req.body.pagamento;
    var total = req.body.total;
    if (req.body) {
        //todo
        var sell = new sellModel({
            cliente: {
                name: client.name,
                phone: client.phone,
                id: client._id
            },
            produto: product,
            valor: total,
            pagamento: {
                mode: pagamento
            }
        });
        // console.log(sell);
        sell
            .save()

            .then(() =>
                res.json({
                    success: true,
                    message: "Venda registrada!",
                    status: 201
                })
            )

            .catch(err =>
                res.json({
                    success: false,
                    message: err,
                    status: 500
                })
            );
    } else {
        res.json({
            success: false,
            message: "Nenhum dado fornecido"
        });
    }
};

sellController.updateSells = (req, res) => {
    sellModel.findByIdAndUpdate(
        req.query.id, {
            state: "closed"
        },
        (err, results) => {
            if (err)
                return res.status(500).send({
                    success: false,
                    err
                });
            res.json({
                success: true,
                results
            });
        }
    );
};

sellController.deleteSells = (req, res) => {
    //console.log(req.query.id);
    sellModel.findByIdAndRemove(req.query.id, (err, sell) => {
        if (err) {
            res.json({
                message: "Error",
                status: 400
            });
        } else {
            res.json({
                message: "Venda deletada",
                data: sell,
                status: 201
            });
        }
    });
};

sellController.countOpenSells = (req, res) => {
    sellModel.count({
            state: "open"
        },
        (err, count) => {
            if (!err) {
                res.json({
                    count: count,
                    success: true
                });
            } else {
                res.json({
                    err: err,
                    success: false
                });
            }
        }
    );
};

sellController.countClosedSells = (req, res) => {
    sellModel.count({
            state: "closed"
        },
        (err, count) => {
            if (!err) {
                res.json({
                    count: count,
                    success: true
                });
            } else {
                res.json({
                    err: err,
                    success: false
                });
            }
        }
    );
};
sellController.countDataSells = (req, res) => {
    Array.prototype.sum = function (prop) {
        var total = 0;
        for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop];
        }
        return total;
    };

    sellModel
        .find({
            "date.month": req.query.month,
            state: "closed"
        })
        .then(result => {
            var value = result.sum("valor");
            res.json({
                value: value,
                success: true
            });
        })
        .catch(err => {
            res.json(err);
        });
};

sellController.findSellsByDate = (req, res) => {
    Array.prototype.sum = function (prop) {
        var total = 0;

        for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop];
        }
        return total;
    };

    if (req.query.type === "day") {
        //console.log("Type is Day");

        sellModel
            .find({
                "date.day": req.query.data,
                state: "closed"
            })
            .then(result => {
                const value = result.sum("valor");

                res.json({
                    value: value,
                    success: true,
                    type: "day"
                });
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    }
    if (req.query.type === "month") {
        //console.log("Type is Month");

        sellModel
            .find({
                "date.month": req.query.data,
                state: "closed"
            })
            .then(result => {
                var value = result.sum("valor");
                //console.log(value)

                res.json({
                    value: value,
                    state: result.state,
                    success: true,
                    type: "day"
                });
            })
            .catch(err => {
                //console.log(err);
            });
    }
};


sellController.todaySales = (req, res) => {
    Array.prototype.sum = function (prop) {
        var total = 0;
        for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop];
        }
        return total;
    };

    sellModel
        .find({
            "date.fullDate": fullDate,
            state: "closed"
        })
        .then(result => {
            //console.log(result);
            const value = result.sum("valor");

            res.json({
                value: value,
                success: true,
                type: "day"
            });
        })
        .catch(err => {
            //console.log(err);
            res.json(err)
        });
};

module.exports = sellController;