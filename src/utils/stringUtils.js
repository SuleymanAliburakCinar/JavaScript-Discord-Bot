const isEqual = (a , b) => {
    if (a?.toLocaleLowerCase("tr-TR") === b?.toLocaleLowerCase("tr-TR"))
        return true;
    return false;
};


module.exports = { isEqual };