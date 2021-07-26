

let startTime = null;



export const startTimer = () => {
    startTime = Date.now();
}

export const logTimer = () => {
    const currentTime = Date.now() - startTime;
 
    console.log("--------------------")
    console.log("Measured time: " + currentTime);
    console.log("---------------------")
}