const canvas = document.querySelector('#wg')
console.log(THREE)
//scene
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight,0.1,1000)
camera.position.z = 9;
camera.position.x = -1;
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,})
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x00000, 0.0)

///stars
let sprite = new THREE.TextureLoader().load('https://www.freeiconspng.com/thumbs/white-star-icon/white-star-icon-14.png');

//star particles
const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    map: sprite
})

const starVertices = []
for(let i=0; i<10000; i++){
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = -Math.random() * 1000
    starVertices.push(x, y, z)
}
console.log(starVertices)
starVertices.velocity = 0
starVertices.acceleration = 0.02
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
 const stars = new THREE.Points(starGeometry, starMaterial)
 scene.add(stars)

console.log(stars)




/////
const uranusRingTexture = new THREE.TextureLoader().load('https://nguyen.univ-tln.fr/share/OpenGL/preview_sun.jpg?fbclid=IwAR1Y1aEMr5dnLoDoM5l8RAHftxnSr6FULY4-MUlREGBCD3DJqv_-rsb9cbI')
//textures
const earthTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/earthmapthumb.jpg')
const marsTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/mars_thumbnail.jpg')
const jupiterTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/jupitermapthumb.jpg')
const saturnTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/saturnmapthumb.jpg')
const uranusTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/uranusmapthumb.jpg')
const neptuneTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/neptunemapthumb.jpg')
const texture = new THREE.TextureLoader().load('https://nguyen.univ-tln.fr/share/OpenGL/preview_sun.jpg?fbclid=IwAR1Y1aEMr5dnLoDoM5l8RAHftxnSr6FULY4-MUlREGBCD3DJqv_-rsb9cbI')
const mercuryTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/mercurymapthumb.jpg')
const venusTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/venusmapthumb.jpg')
const plutoTexture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/plutomapthumb.jpg')

const starsTexture = new THREE.TextureLoader().load('https://www.freeiconspng.com/thumbs/white-star-icon/white-star-icon-14.png')
//lien stars
//sun
const sunGeo = new THREE.SphereGeometry(1, 30, 30);
const sunMat = new THREE.MeshPhongMaterial({
    map: texture
})
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//fct planete

//planete
function createPlanete(size, texture, position, ring) {
    //object
    const geo = new THREE.SphereGeometry(size, 30, 30);
    //texture
    const mat = new THREE.MeshStandardMaterial({
        map: texture
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    //trajectoire 
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: ring.texture,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

//
//les planetes
const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138);
const uranus = createPlanete(7, uranusTexture, {
    
    innerRadius: 7,
    outerRadius: 12,
    map: uranusRingTexture
} ,176,);
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

//ambiantLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)
 
//pointLight
const pointerlight = new THREE.PointLight(0xffffff,0.9)

//light position
pointerlight.position.set(5,3,5)
scene.add(pointerlight)



const mouse = {
    x:undefined,
    y: undefined
}
const animate = () =>{
    requestAnimationFrame(animate)
    sun.rotation.y = mouse.x * 0.5
    sun.rotation.y -= 0.0015
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    render()
}
const render = ()=>{
    renderer.render(scene,camera)
}
animate()
//move by mouse

window.addEventListener('mousemove', (event)=>{
    mouse.x = (event.clientX / innerWidth) * 2 -1
    mouse.y = (event.clientY / innerHeight) * 200 + 1
   // console.log(mouse)
})


/
addEventListener('dblclick', ()=> {
    const fullscreenElement = document.fullscreenElement || document.webkitRequestFullscreenElement
    if(!document.fullscreenElement){
        //fullscreen
        if(canvas.requestFullscreen){
          
        canvas.requestFullscreen()  
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()

        }
    }
    else
    {
        //leave fullScreen
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webKitExitFullscreen){
            document.webKitExitFullscreen()
        }
    }
})
//fin

