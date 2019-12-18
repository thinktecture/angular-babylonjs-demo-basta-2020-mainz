import { Injectable, NgZone } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DecoratorService {
    private static ngZone: NgZone | undefined = undefined;

    public constructor(ngZone: NgZone) {
        DecoratorService.ngZone = ngZone;
    }

    public static getNgZone(): NgZone {
        if (!DecoratorService.ngZone) {
            throw new Error('DecoratorService not initialized');
        }
        return DecoratorService.ngZone;
    }
}
