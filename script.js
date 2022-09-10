let container;
let camera;
let renderer;
let scene;
let car;
let isClicked = false;
let mouseX = 0, mouseY = 0;

function init() {
    container = document.querySelector('.scene');
    scene = new THREE.Scene();

    /* Camera setup */
    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 500);
    camera.position.set(0,0,3)  
    
    /* Light setup */
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight)

    const light = new THREE.DirectionalLight(0xffffff,3);
    light.position.set(15,15,15)
    scene.add(light);

    // Axis Helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    /* Renderer */
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth , container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Orbit control
    // const controls = new OrbitControls( camera, renderer.domElement );

    let loader = new THREE.GLTFLoader();
    loader.load('./3D-model/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        car = gltf.scene.children[0];
        car.rotation.z = 1.5;
    })

    // controls.update();
}

function animate() {
    requestAnimationFrame(animate);
    // car.rotation.z += 0.0006; 
    // controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

function mouseMove(e) {
    if (!isClicked) 
        return;
    
    
    console.log(e.clientX + "  " + e.clientY);
    e.preventDefault();
    dX = e.clientX - mouseX;
    dY = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    car.rotation.z += dX/200;
    car.rotation.x += dY/200;
}

function mouseDown(e) {
    e.preventDefault();
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    isClicked = true;
} 

function mouseUp(e) {
    e.preventDefault();
    isClicked = false
}

window.addEventListener('mousedown', e => mouseDown(e));
window.addEventListener('mousemove', e => mouseMove(e));
window.addEventListener('mouseup', e => mouseUp(e));

window.addEventListener('keydown', e => {
    if(e.key === 'w') {
        car.translateY(-0.1);
        console.log("pressed");
    }
    if(e.key === 's') {
        car.translateY(0.1);
        console.log("pressed");
    }
});

window.addEventListener('keydown', e => {
    if(e.key === 'd') {
        car.rotation.z -= 0.1;
        console.log("pressed");
    }
    if(e.key === 'a') {
        car.rotation.z += 0.1;
        console.log("pressed");
    }
    
})

// document.addEventListener('keypress', (event) => {
//     var name = event.key;
//     var code = event.code;
//     // Alert the key name and key code on keydown
//     alert(`Key pressed ${name} \r\n Key code value: ${code}`);
//   }, false);
  

init();
animate();
