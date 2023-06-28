
let scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  rocket,
  HEIGHT,
  WIDTH;
  
  //texture
const texture = new THREE.TextureLoader().load('https://w7.pngwing.com/pngs/546/684/png-transparent-red-and-gray-rocket-rocket-personal-statement-icon-rocket-service-spacecraft-rocket-launch.png')


const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0x5d0361, 10, 1500);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.z = 500;
  camera.position.y = -10;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;

  container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", handleWindowResize, false);
  //cube
//   const geometry = new THREE.BoxGeometry( 100, 300,200 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const cloudGeometry = new THREE.BoxGeometry(100, 300,200)
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    transparent: true,
    opacity: 1.8
})

const rocket = new THREE.Mesh(cloudGeometry,cloudMaterial)
scene.add(rocket)
//   let loader = new THREE.GLTFLoader();
//   loader.load( "https://www.stivaliserna.com/assets/rocket/rocket.gltf",
//     (gltf) => {
//       rocket = gltf.scene;
//       rocket.position.y = 50;
//       scene.add(rocket);
//     }
//   );
 };

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};

const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);

  const directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
  directionalLight.position.set(-300, 0, 600);

  const pointLight = new THREE.PointLight(0xa11148, 2, 1000, 2);
  pointLight.position.set(200, -100, 50);

  scene.add(ambientLight, directionalLight, pointLight);
};

const targetRocketPosition = 40;
const animationDuration = 2000;

const loop = () => {
  const t = (Date.now() % animationDuration) / animationDuration;

  renderer.render(scene, camera);

  const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
  if (rocket) {
    rocket.rotation.y += 0.1;
    rocket.position.y = delta;
  }

  requestAnimationFrame(loop);
};

const main = () => {
  createScene();
  createLights();

  renderer.render(scene, camera);
  loop();
};

main();
