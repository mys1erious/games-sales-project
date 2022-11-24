import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";


function init() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1, 1000
    );
    camera.position.setZ(30);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return [scene, camera, renderer];
}


function addStar(scene) {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(
        () => THREE.MathUtils.randFloatSpread(100)
    );

    star.position.set(x, y, z);
    scene.add(star);
}


function moveCamera(moon, jeff, camera) {
    const t = document.body.getBoundingClientRect().top;

    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}


function main() {
    const [scene, camera, renderer] = init();

    // Light
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // scene.add(lightHelper);
    //
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(gridHelper);
    //
    // const controls = new OrbitControls(camera, renderer.domElement);

    // Torus
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Stars
    Array(200).fill().forEach(() => addStar(scene));

    // Background
    scene.background = new THREE.TextureLoader().load('space.jpg');

    // Jeff
    const jeffTexture = new THREE.TextureLoader().load('jeff.png');
    const jeff = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshBasicMaterial({map: jeffTexture})
    );
    scene.add(jeff);
    jeff.position.z = -5;
    jeff.position.x = 2;

    // Moon
    const moonTexture = new THREE.TextureLoader().load('moon.jpg');
    const normalTexture = new THREE.TextureLoader().load('normal.jpg');

    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
            map: moonTexture,
            normalMap: normalTexture
        })
    );
    scene.add(moon);
    moon.position.z = 30;
    moon.position.setX(-10);

    // Game loop
    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;

        moon.rotation.x += 0.005;

        // controls.update();

        renderer.render(scene, camera);
    }

    document.body.onscroll = () => moveCamera(moon, jeff, camera);
    moveCamera(moon, jeff, camera);
    animate();
}

main();
