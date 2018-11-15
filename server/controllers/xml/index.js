const parseString = require('xml2js-parser').parseString;


let fileController = {};

fileController.upload = (req, res) => {

    const xml = req.body.xml

    parseString(xml, (err, results) => {

        if (!err) {
            console.log(results.nfeProc.NFe[0].infNFe[0].det[0].prod);

            res.send({
                result: results.nfeProc.NFe[0].infNFe[0].det[3]
            })
        } else {
            res.send({
                e: err
            })
        }

    });

}

module.exports = fileController;