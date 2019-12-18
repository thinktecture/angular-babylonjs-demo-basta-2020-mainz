// import { DecoratorService } from './decorator.service';
//
//
//
// function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     let originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         console.log("wrapped function: before invoking " + propertyKey);
//         const result = originalMethod.apply(this, args);
//         console.log("wrapped function: after invoking " + propertyKey);
//         return result;
//     }
// }
//
//
// export const inZone = (argPassed: any) => {
//
//     const zone = DecoratorService.getNgZone();
//
//
//
//
//     return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//
//         // save a reference to the original method this way we keep the values currently in the
//         // descriptor and don't overwrite what another decorator might have done to the descriptor.
//         if(descriptor === undefined) {
//             descriptor = Object.getOwnPropertyDescriptor(target, key);
//         }
//         const originalMethod = descriptor.value;
//
//
//         const originalMethod = descriptor.value;
//         console.log("ARGPASSED: ");
//         console.log(argPassed);
//         // anonymous function, not arrow
//         descriptor.value = function (...args: any[]) {
//             const result = originalMethod.apply(this, args);
//             return result;
//         };
//     };
// };
