// Scene size
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Camera attributes.
const VIEW_ANGLE = 30;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// DOM element scene attach to
const container =
    document.querySelector('#scene');

// Setup WebGL renderer    
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

// Place renderer
container.appendChild(renderer.domElement);

// Scene
// ------------------------------------------
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

// Camera
// ------------------------------------------
// Setup
var camera = 
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
camera.position.z = 3;

// Attach
scene.add(camera);


// Light
// ------------------------------------------
// Setup
const pointLight =
  new THREE.PointLight(0xffffff);

// Position
pointLight.position.x = 1;
pointLight.position.y = 3;
pointLight.position.z = 3;

// Attach
scene.add(pointLight);

// Mesh
// ------------------------------------------
// ASCII file
var loader = new THREE.STLLoader();
loader.load( '../stl/cub.STL', function ( geometry ) {
    // var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    var material = 
    new THREE.MeshBasicMaterial({
        color: 0xaaaaaa, 
        wireframe: true, 
    });
    var mesh = new THREE.Mesh( geometry, material );
    // mesh.position.set( 0, - 0.25, 0.6 );
    // mesh.rotation.set( 0, - Math.PI / 2, 0 );
    mesh.scale.set( 0.05, 0.05, 0.05 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.z = -10;
    mesh.position.x = -1;
    mesh.position.y = -3;

    // Attach
    //scene.add( mesh );
});
// var obj1 = scene.getObjectByName('mesh');
// console.log(obj1);

// Mesh
// ------------------------------------------
// Create cube
var geometry = 
    new THREE.BoxGeometry(1, 0.9, 1, 1, 1); 

// Define material
var material = 
    new THREE.MeshBasicMaterial({
        color: 0xd0d0d0, 
        wireframe: true, 
    });

// Apply
var cube = new THREE.Mesh(geometry, material);
cube.rotation.x = 0.3;
cube.position.z = 1;
cube.scale.set( 1.2, 1.2, 1.2 );

// Attach
scene.add(cube);

// Loop
// ------------------------------------------
function update() {
    // Draw
    renderer.render(scene, camera);

    cube.rotation.y += 0.001;

    // Schedule the next frame
    requestAnimationFrame(update);
};

// Run!
renderer.render(scene, camera);
requestAnimationFrame(update);