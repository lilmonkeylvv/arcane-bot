
async function consoleCmds(bot){
    let y = process.openStdin();
    y.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        if(x == 'quit' || x == 'stop'){
            process.exit();
        } else if(x == 'clear'){
            console.clear();
        };
    });
};

module.exports = consoleCmds;