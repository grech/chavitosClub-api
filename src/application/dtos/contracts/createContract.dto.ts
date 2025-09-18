

export class CreateContractDto {

     constructor(
          public name: string,
          public phone: string,
          public email: string,
          public rfc: string,
          public eventDate: string,
          public address: string,
          public hours: number,
          public services: string[]
     ){}

     static create(object: {[key: string]: any}): [string?, CreateContractDto?]{

          const {name,phone,email,rfc='NA', eventDate, address, hours, services} = object;

          if(!name || name.legth < 3) return ['El nombre es obligatorio']
          if(!phone) return ['el telefono debe ser obligatorio']
          if(!email) return ['el email es obligatorio']
          if(!eventDate) return ['la fecha es obligatoria']
          if(rfc !== 'NA'){
               if(rfc.length < 12) return ['el RFC debe ser valido']
          }
          if(!address) return ['la direccion es obligatoria']
          const hoursN = Number(hours);
          if(!hoursN || isNaN(hoursN) || hoursN < 1) return ['las horas deben ser validas']
          if(!services || !Array.isArray(services)) return ['Debes elegir al menos un servicio']

          return [undefined, new CreateContractDto(name, phone, email, rfc, eventDate, address, hoursN, services)]

     }
}