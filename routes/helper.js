var h = {};

h.filterRequestBody = function (body, allowedParams) {
    // delete extra params from req.body
    for (var k in body) {
        if (allowedParams.indexOf(k) === -1) {
            delete body[k]; // if key is not allowed params then delete key from request object
        }
    }
    return body;
}

h.createDbUdateString = function (body) {
    var str = '';
    var dataArray = [];
    // prepare database querystring and update params 
    for (var k in body) {
        // create querystring for all params except id
        if (k !== 'id') {
            str += '`' + k + '` = ?, ';
            dataArray.push(body[k]);  // add value to update query params
        }
    }

    dataArray.push(body.id);
    str = str.replace(/(, $)/g, ""); // replace last comma

    return {
        updateString: str,
        dataArray: dataArray
    };

};

module.exports = h;