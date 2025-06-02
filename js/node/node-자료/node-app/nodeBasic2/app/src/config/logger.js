const {createLogger, transports, format} = require('winston');
const {combine, colorize, label, printf, timestamp, simple, json} = format;

const printFormat = printf(({timestamp, label, level, message}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file : combine(
        label({
            label : "label"
        })
        , timestamp({
            format : "YYYY-MM-DD HH:mm:dd"
        })
        //, json()
        , printFormat
    )
    , console : combine(
        label({
            label : "label"
        })
        , colorize()
        , simple()
    )
};

const opts = {
    file : new transports.File({//파일로 저장된다.
        filename : "access.log"
        , direname : '../../log/access.log'
        , level:"info"
        , format : printLogFormat.file
    })
    , console : new transports.Console({//콘솔에 찍힌다.
        level:"info"//레벨에 설정에 따라 해당 레벨보다 낮은 부분은 출력되지 않는다.
        , format : printLogFormat.console
    })
}

const logger = createLogger({
    /* 
    transports: [new transports.Console({
    })]
    원하는 형식으로 출력을 위해서는 아래와 같이 설정한다. 
    */
    transports: [opts.file]
});

logger.stream = {
    write : (message) => logger.info(message)
}

//환경에 따라 콘솔에 출력된다.
if(process.env.MODE_ENV !== "production"){
    logger.add(opts.console)
}

module.exports = logger;