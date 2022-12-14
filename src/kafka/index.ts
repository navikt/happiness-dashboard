import { HappinessConsumer } from './kafka'

declare global {
    // eslint-disable-next-line no-var
    var _kafkaConsumer: typeof HappinessConsumer
}

/**
 * Whenever next.js hot-reloads, a new mock DB instance was created, meaning
 * that mutations were not persisted. Putting the MockDB on the global object
 * fixes this, but that only needs to be done when we are developing locally.
 */
global._kafkaConsumer = global._kafkaConsumer || HappinessConsumer

const getHappinessConsumer = (): typeof HappinessConsumer => {
    // global._kafkaConsumer = new FakeMockDB();
    return global._kafkaConsumer
}

export default getHappinessConsumer
