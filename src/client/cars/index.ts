import * as THREE from 'three'
import { CarModelData } from './types'

export class Car {
    private carModelData: CarModelData;
    private lightsOn: boolean = false;

    private acceleration = 0.0005;
    private degree = 0.5;
    private currentDistance = 0;

    public get scene() {
        return this.carModelData.scene;
    }

    public turnOnLights = () => {
        (this.carModelData.frontLights.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;
        this.lightsOn = true;
    }

    public turnOffLights = () => {
        (this.carModelData.frontLights.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        this.lightsOn = false;
    }

    public switchLights = () => {
        if (this.lightsOn) this.turnOffLights();
        else this.turnOnLights();
    }

    public animate = () => {
        const direction = new THREE.Vector3();
        this.carModelData.scene.getWorldDirection(direction);
        if (this.currentDistance > 0) {
            this.carModelData.scene.position.add(direction.multiplyScalar(this.currentDistance));
            this.currentDistance -= this.acceleration / 4;
        } else if (this.currentDistance > -this.acceleration) {
            this.currentDistance = 0;
        } else {
            this.carModelData.scene.position.add(direction.multiplyScalar(this.currentDistance));
            this.currentDistance += this.acceleration / 4;
        }
        const sign = this.currentDistance > 0 ? 1 : -1;
        const angle = 0.01 * sign;
        this.carModelData.wheel1.rotateY(angle);
        this.carModelData.wheel2.rotateY(angle);
        this.carModelData.wheel3.rotateY(angle);
        this.carModelData.wheel4.rotateY(angle);
    }

    public idle = () => {
        (this.carModelData.backLights.material as THREE.MeshStandardMaterial).emissiveIntensity = this.lightsOn ? 0.5 : 0;
    }

    public moveForward = () => {
        this.currentDistance += this.acceleration;
    }

    public moveBackwards = () => {
        if (this.currentDistance === 0) this.currentDistance = -this.acceleration;
        this.currentDistance -= this.acceleration;
        (this.carModelData.backLights.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;
    }

    public turnLeft = () => {
        if (this.currentDistance) {
            this.carModelData.scene.rotateY(THREE.MathUtils.degToRad(this.degree));
        }
    }

    public turnRight = () => {
        if (this.currentDistance) {
            this.carModelData.scene.rotateY(THREE.MathUtils.degToRad(-this.degree));
        }
    }

    constructor(carModelData: CarModelData) {
        this.carModelData = carModelData;
    }
}
