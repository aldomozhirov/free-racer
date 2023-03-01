import * as THREE from 'three'

export interface CarModelData {
    scene: THREE.Group;
    wheel1: THREE.Mesh;
    wheel2: THREE.Mesh;
    wheel3: THREE.Mesh;
    wheel4: THREE.Mesh;
    frontLights: THREE.Mesh;
    backLights: THREE.Mesh;
}
