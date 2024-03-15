function lowercaseFirstCharacterOnly(key) {
    if (key.charAt(0) === key.charAt(0).toUpperCase()) {
        return key.charAt(0).toLowerCase() + key.slice(1);
    }
    return key;
}

function toDict(obj) {
    if (Array.isArray(obj)) return obj.map(element => toDict(element));
    else if (typeof obj === 'object' && obj !== null) {
        const lowerCaseObj = {};
        Object.keys(obj).forEach(key => {
            const newKey = lowercaseFirstCharacterOnly(key);
            lowerCaseObj[newKey] = toDict(obj[key]);
        });
        return lowerCaseObj;
    }
    else return obj;
}


export default toDict()
