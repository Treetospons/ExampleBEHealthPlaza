class BaseError extends Error {
    status: number;
    constructor(message: string, status: number, stack?: string) {
        super(message || "Internal Server Error")
        this.status = status || 500
        this.stack = stack
        Object.setPrototypeOf(this, BaseError.prototype)
    }
}

class BadRequestError extends BaseError {
    constructor(message?: string, stack?: string) {
        super(message || "Bad Request", 400, stack)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}

export { BaseError, BadRequestError }