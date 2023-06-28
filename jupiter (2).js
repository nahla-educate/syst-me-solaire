const canvas = document.querySelector('#c')

//scene
const scene = new THREE.Scene()
//Sizes
const sizes = {
    width: 00,
    height: 750
}
//camera
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight,0.2,1000)
camera.position.z = 2;
camera.position.x = -1;
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,})
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x00000, 0.0)
const texture = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/jupitermapthumb.jpg')
const texturee = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/jupitermapthumb.jpg')
  
//earth
//create the earth
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness : 1,
    metalness:0,
    map: texture,
  //  bumpMap: texturee,
    bumpScale: 0.3
})

const earthMesh = new THREE.Mesh(earthGeometry,earthMaterial)
 
scene.add(earthMesh)

//ambiantLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)
 
//pointLight
const pointerlight = new THREE.PointLight(0xffffff,0.9)

//light position
pointerlight.position.set(5,3,5)
scene.add(pointerlight)

//texture Cloud
const textureCloud = new THREE.TextureLoader().load('http://planetpixelemporium.com/images/mappreviews/jupitermapthumb.jpg')
// cloud
const cloudGeometry = new THREE.SphereGeometry(0.63,32,32)
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: textureCloud,
    transparent: true,
    opacity: 1.8
})

const cloudMesh = new THREE.Mesh(cloudGeometry,cloudMaterial)
scene.add(cloudMesh)
//star particles texture
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



/*
///
//texture star
const textureStar = new THREE.TextureLoader().load('')
//https://ak.picdn.net/shutterstock/videos/6934219/thumb/1.jpg
// star
const starGeometry = new THREE.SphereGeometry(0.3,50,5)
const starMaterial = new THREE.MeshBasicMaterial({
    map: textureStar,
    side: THREE.BackSide
})

const starMesh = new THREE.Mesh(starGeometry,starMaterial)
scene.add(starMesh)
*/
//group (earth + cloud)
const group = new THREE.Group()
group.add(earthMesh)
group.add(cloudMesh)
scene.add(group)

const mouse = {
    x:undefined,
    y: undefined
}
const animate = () =>{
    requestAnimationFrame(animate)
    earthMesh.rotation.y -= 0.0015
    cloudMesh.rotation.y += 0.0015
   // starMesh.rotation.y += 0.0002
    group.rotation.y = mouse.x * 0.5
    stars.rotation.y += 0.0002

    render()
}
const render = ()=>{
    renderer.render(scene,camera)
}
animate()


window.addEventListener('mousemove', (event)=>{
    mouse.x = (event.clientX / innerWidth) * 2 -1
    mouse.y = (event.clientY / innerHeight) * 200 + 1
   // console.log(mouse)
})
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