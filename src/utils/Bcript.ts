import bcript from "bcrypt"

function Encript(password) {
    let hash;
    bcript.hash(password, 10, (_err, h) => hash = h)
    return hash;
}

function Decript(password, hash) {
    let isEqual;
    bcript.compare(password, hash, (_err, result) => {
        isEqual = result
    });
    return isEqual;
}