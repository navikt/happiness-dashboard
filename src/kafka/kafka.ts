import { Kafka, logLevel as LogLevel } from 'kafkajs'
import { logger } from '@navikt/next-logger'

logger.info('Creating Kafka client')

export const HappinessConsumer = new Kafka({
    clientId: 'happiness-dashboard',
    brokers: process.env.KAFKA_BROKERS!.split(','),
    ssl: {
        rejectUnauthorized: true,
        ca: [process.env.KAFKA_CA!],
        key: process.env.KAFKA_PRIVATE_KEY!,
        cert: process.env.KAFKA_CERTIFICATE!,
    },
    logCreator: (logLevel) => (entry) => {
        switch (logLevel) {
            case LogLevel.NOTHING:
                return
            case LogLevel.ERROR:
                logger.error(entry)
                break
            case LogLevel.WARN:
                logger.warn(entry)
                break
            case LogLevel.INFO:
                logger.info(entry)
                break
            case LogLevel.DEBUG:
                logger.debug(entry)
                break
        }
    },
})
