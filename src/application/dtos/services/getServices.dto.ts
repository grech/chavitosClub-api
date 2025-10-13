

export class ServicesDto {
     constructor(
          public eventDate: Date
     ){}

     static getServices(object: {[ket: string]: any}): [string?, ServicesDto?]{
          const {eventDate} = object;
          const eventDateN = new Date(eventDate);
          if(!eventDate || isNaN(eventDateN.getTime())) return ['la fecha es invalida']
          

          return [undefined, new ServicesDto(eventDateN)]
     }
}