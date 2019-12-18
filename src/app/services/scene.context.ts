import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Color3, Color4, Scene } from '@babylonjs/core';
import '@babylonjs/inspector';
import { ReplaySubject } from 'rxjs';
import { CameraContext } from './camera.context';
import { EngineContext } from './engine.context';

@Injectable({
    providedIn: 'root',
})
export class SceneContext {
    scene: Scene;
    sceneCreated$ = new ReplaySubject<Scene>(1);

    constructor(
        private engineCtx: EngineContext,
        private readonly camera: CameraContext,
        private readonly ngZone: NgZone,
    ) {
    }

    createMyScene(canvas: ElementRef<HTMLCanvasElement>): Scene {
        this.engineCtx.canvas = canvas;
        this.scene = new Scene(this.engineCtx.engine);
        this.sceneCreated$.next(this.scene);

        this.camera.setup(this.scene, canvas.nativeElement);
        this.scene.clearColor = Color4.FromColor3(new Color3(0, 0, 0));

        // Prevent scrolling etc. when touching the canvas
        this.disableCanvasEvents(canvas);

        return this.scene;
    }

    startMyScene() {
        this.engineCtx.start(this.scene);
    }

    enableOrientationCamera(
        enable: boolean,
        canvas: ElementRef<HTMLCanvasElement>,
    ) {
        if (!enable) {
            this.runOutsideZone(() => this.scene.debugLayer.show({ overlay: true, embedMode: true }));
        } else {
            this.runOutsideZone(() => this.camera.useOrientationCamera());
        }

        return true;
    }

    displayDebugLayer() {
        if (!this.scene.debugLayer.isVisible()) {
            this.runOutsideZone(() => this.scene.debugLayer.show({ overlay: true, embedMode: true }));
        } else {
            this.runOutsideZone(() => this.scene.debugLayer.hide());
        }
    }

    runOutsideZone(cb: () => any) {
        this.ngZone.runOutsideAngular(() => cb());
    }

    dispose() {
        this.runOutsideZone(() => {
            this.scene.dispose();
            this.scene = null;
        });
    }

    private disableCanvasEvents(canvas: ElementRef<HTMLCanvasElement>) {
        this.ngZone.runOutsideAngular(() => {
            document.body.addEventListener(
                'touchstart',
                (e) => this.preventDefault(e, canvas),
                { passive: false },
            );
            document.body.addEventListener(
                'touchend',
                (e) => this.preventDefault(e, canvas),
                { passive: false },
            );
            document.body.addEventListener(
                'touchmove',
                (e) => this.preventDefault(e, canvas),
                { passive: false },
            );
        });
    }

    private preventDefault(e: Event, ref: ElementRef) {
        if (e.target === ref.nativeElement) {
            e.preventDefault();
        }
    }
}
