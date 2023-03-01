import { AbstractCarModelLoader } from './abstract'
import { CarModelData } from '../types'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export class MustangCarModelLoader extends AbstractCarModelLoader {
    private parseGLTF = (gltf: GLTF): CarModelData => {
        const { scene } = gltf;

        let backLights;
        let frontLights;
        let wheel1;
        let wheel2;
        let wheel3;
        let wheel4;

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const m = (child as THREE.Mesh)
                m.receiveShadow = true
                m.castShadow = true

                if (m.name === 'Circle001_1') wheel1 = m;
                if (m.name === 'Circle028_1') wheel2 = m;
                if (m.name === 'Circle029_1') wheel3 = m;
                if (m.name === 'Circle026_1') wheel4 = m;

                if (m.name === 'Plane003_3') {
                    backLights = m;
                    (backLights.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('red');
                    (backLights.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
                }
                if (m.name === 'Plane003_4') {
                    frontLights = m;
                    (frontLights.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('white');
                    (frontLights.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
                }
            }
        })

        scene.position.y = 0.47;

        if (!frontLights) throw Error('Front lights not found!');
        if (!backLights) throw Error('Back lights not found!');
        if (!wheel1) throw Error('Wheel 1 not found!');
        if (!wheel2) throw Error('Wheel 2 not found!');
        if (!wheel3) throw Error('Wheel 3 not found!');
        if (!wheel4) throw Error('Wheel 4 not found!');

        return {
            backLights,
            frontLights,
            wheel1,
            wheel2,
            wheel3,
            wheel4,
            scene
        };
    };

    public async load(): Promise<CarModelData> {
        const loader = new GLTFLoader()
        return new Promise((resolve, reject) => {
            loader.load(
                'models/mustang.glb',
                (gltf) => {
                    const data = this.parseGLTF(gltf);
                    resolve(data);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                    console.log(error);
                    reject();
                }
            )
        })
    }

}
