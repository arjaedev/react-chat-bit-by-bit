const log = require('../f-logs/log');

const logError = async (err) => {
    try {
        const currentDateTime = new Date();

        await log.create({
            message: `${currentDateTime} - ${err.message}`,
            stack: err.stack
        });
    } catch (loggingError) {
        console.error("Failed to log error to database:", loggingError);
    }
};

module.exports = logError;

