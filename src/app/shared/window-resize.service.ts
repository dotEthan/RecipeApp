import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WindowResizeService {
    windowHeight = new BehaviorSubject(0);
    windowWidth = new BehaviorSubject(0);
}