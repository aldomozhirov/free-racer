import * as THREE from 'three'
export class FollowSpotLight extends THREE.SpotLight {
    constructor(target: THREE.Object3D) {
        super();
        this.target = target;
        this.position.copy(target.position);
        this.angle = Math.PI / 2;
        this.penumbra = 0.5;
        this.castShadow = true;
        this.shadow.mapSize.width = 1024;
        this.shadow.mapSize.height = 1024;
        this.shadow.camera.near = 0.5;
        this.shadow.camera.far = 20;
    }
    public animate() {
        this.position.copy(this.target.position);
        this.position.y = 3;
    }
}
