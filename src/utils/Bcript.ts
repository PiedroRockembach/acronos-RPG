import bcript from "bcrypt"

function Encript(password: string) {
    let hash;
    bcript.hash(password, 10, (_err, h) => hash = h)
    return hash;
}

function Decript(password: string, hash: string) {
    let isEqual;
    bcript.compare(password, hash, (_err, result) => {
        isEqual = result
    });
    return isEqual;
}