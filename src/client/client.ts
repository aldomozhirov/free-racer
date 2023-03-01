import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
// @ts-ignore
import pressed from 'pressed';
import { Car } from './cars';
import { MustangCarModelLoader } from './cars/loaders/mustang'
import { FollowSpotLight } from './lights/spot/follow'
import { World } from './world'

const scene = new THREE.Scene();

let light: FollowSpotLight;
let car: Car;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') car.switchLights();
});

const stats = Stats();
document.body.appendChild(stats.dom);
pressed.start();

async function init() {
    const world = new World();
    scene.add(world.scene);

    const loader = new MustangCarModelLoader();
    car = new Car(await loader.load());
    scene.add(car.scene);

    light = new FollowSpotLight(car.scene);
    scene.add(light);
}

async function animate() {
    requestAnimationFrame(animate);
    controls.update();
    stats.update();

    if (!car) return;

    if (pressed('W')) {
        car.moveForward();
    } else if (pressed('S')) {
        car.moveBackwards();
    } else if (pressed('A')) {
        car.turnLeft();
    } else if (pressed('D')) {
        car.turnRight();
    } else {
        car.idle();
    }

    const relativeCameraOffset = new THREE.Vector3(0.0, 2.0, -5.0);
    const cameraOffset = relativeCameraOffset.applyMatrix4(car.scene.matrixWorld);
    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    camera.lookAt(car.scene.position);

    car.animate();
    light.animate();

    render();
}

function render() {
    renderer.render(scene, camera);
}

init()
animate()
