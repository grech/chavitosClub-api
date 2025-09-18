export class CustomError extends Error {
     public statusCode: number;
     public readonly details?: any;

     constructor(message: string, statusCode: number, details?: any) {
          super(message);
          this.statusCode = statusCode;
          this.details = details;
          Object.setPrototypeOf(this, CustomError.prototype);
     }

     static badRequest(message: string, details?: any){
          return new CustomError(message, 400, details);
     }

      static unauthorized(message: string, details?: any) : CustomError{
          return new CustomError(message, 401, details);
     }

     static notFound(message: string, details?: any) :CustomError{
          return new CustomError(message,404, details);
     }

     static internalServer(message: string, details: any): CustomError {
          return new CustomError(message, 500, details);
     }
}