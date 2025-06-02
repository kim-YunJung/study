const randomStringGenerator = () => {
    const randomSting = Array.from(Array(10), () => 
        Math.floor(Math.random() * 36).toString(36)
    ).join("");

    return randomSting;
}

module.exports = {randomStringGenerator};