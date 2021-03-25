

export const generateRandomBinaryString = (length=10) => {
    let binaryString = "";
    for(let i = 0; i < length; i++){
        binaryString += Math.round(Math.random())
    }
    return binaryString;
}

export const generatRandomBinaryStrings = (stringCount=1, length=10) => {
    let binaryStrings = []
    for(let i = 0; i < stringCount; i++){
        binaryStrings.push(generateRandomBinaryString(length))
    }
    return binaryStrings
}
