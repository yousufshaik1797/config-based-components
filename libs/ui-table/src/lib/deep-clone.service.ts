import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DeepCloneService {

    clone<T>(obj: T): T {
        let copy: any;
        if (null == obj || "object" != typeof obj) return obj;

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if ((<any>obj).hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}