import * as THREE from 'three'

export class World {
    private readonly worldScene: THREE.Group;

    constructor() {
        this.worldScene = new THREE.Group();
        const planeMaterial = new THREE.MeshStandardMaterial();
        const planeGeometry = new THREE.PlaneGeometry(100, 100);
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotateX(-Math.PI / 2);
        planeMesh.receiveShadow = true;
        this.worldScene.add(planeMesh);
    }

    public get scene() {
        return this.worldScene;
    }
}
