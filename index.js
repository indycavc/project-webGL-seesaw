import * as THREE from './three.js-master/build/three.module.js'

var scene, camera, renderer

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1, 
        50000
    )
    camera.position.set(-50, 35, 20)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true
}

const useTexture = (image) => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(image)

    return texture
}

const createPlaneGeometry = () => {
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
    const texture = useTexture('./assets/grass.jpg')
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: texture
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

    planeMesh.receiveShadow = true
    return planeMesh
}

const createCylinderGeometry = () => {
    const cylinderGeometry = new THREE.CylinderGeometry(
        5, 5, 10, 3
    )
    const cylinderMaterial = new THREE.MeshPhongMaterial({
        color: 0xa15c2a
    })
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)

    cylinderMesh.castShadow = true
    cylinderMesh.receiveShadow = true
    return cylinderMesh
}

const createBoxGeometry = () => {
    const boxGeometry = new THREE.BoxGeometry(
        10, 1, 50
    )
    const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xcc9c7c
    })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

    boxMesh.castShadow = true
    boxMesh.receiveShadow = true
    return boxMesh
}

const createSphereGeometry = () => {
    const sphereGeometry = new THREE.SphereGeometry(
        5, 32, 16
    )
    const texture = useTexture('./assets/soccer-ball.jpg')
    const sphereMaterial = new THREE.MeshPhongMaterial({
        map: texture
    })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

    sphereMesh.castShadow = true
    sphereMesh.receiveShadow = true
    return sphereMesh
}

const createTorusGeometry = () => {
    const torusGeometry = new THREE.TorusGeometry(
        6, 2, 16, 100
    )
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x3e444c
    })
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)

    torusMesh.castShadow = true
    torusMesh.receiveShadow = true
    return torusMesh
}

const createSpotLight = () => {
    const spotLight = new THREE.SpotLight(0xffcd80, 0.3)

    spotLight.castShadow = true
    return spotLight
}

const createDirectionalLight = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)

    directionalLight.castShadow = true
    return directionalLight
}

window.onload = () => {
    init()

    let planeGeometry = createPlaneGeometry()
    planeGeometry.rotateX(-Math.PI/2)

    let cylinderGeometry = createCylinderGeometry()
    cylinderGeometry.rotateX(Math.PI/6)
    cylinderGeometry.rotateZ(Math.PI/2)

    let boxGeometry = createBoxGeometry()
    boxGeometry.position.y = 5.5
    boxGeometry.rotateX(Math.PI/16)
    
    let sphereGeometry = createSphereGeometry()
    sphereGeometry.position.y = 6.5
    sphereGeometry.position.z = 23
    sphereGeometry.rotateY(Math.PI)

    let torusGeometry = createTorusGeometry()
    torusGeometry.position.y = 2
    torusGeometry.position.z = -20
    torusGeometry.rotateX(-Math.PI/2)
    torusGeometry.rotateZ(Math.PI/3)

    let spotLight = createSpotLight()
    spotLight.position.y = 50

    let directionalLight = createDirectionalLight()
    directionalLight.position.x = -100
    directionalLight.position.y = 30
    directionalLight.position.z = 200

    scene.add(planeGeometry)
    scene.add(cylinderGeometry)
    scene.add(boxGeometry)
    scene.add(sphereGeometry)
    scene.add(torusGeometry)
    scene.add(spotLight)
    scene.add(directionalLight)

    const render = () => {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
}
