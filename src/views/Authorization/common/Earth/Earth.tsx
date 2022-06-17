import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  // DirectionalLight,
  LinearToneMapping,
  Texture,
  Group,
  SphereGeometry,
  Mesh,
  MeshPhongMaterial,
  BackSide,
  AdditiveBlending,
  ShaderMaterial,
  SphereBufferGeometry,
  AmbientLight,
  Quaternion,
  Euler,
  // TextureLoader
//   Clock
  //   Mesh
} from 'three'
import * as d3 from 'd3'
import { useCallback, useEffect, useRef } from 'react'
import shaders from './glsl';
import earth_json from './earth_json'
import * as topojson from 'topojson'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Earth.module.less'

const { innerWidth, innerHeight } = window

const aspect = innerWidth / innerHeight

const Earth = (): JSX.Element => {
  const canvasIns = useRef<HTMLCanvasElement | null>(null)
  const canvas_wrap = useRef<HTMLDivElement | null>(null)

  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    75, aspect, 1, 1200
  ))
  const scene = useRef<THREE.Scene>(new Scene())

  // const d_light = useRef<THREE.DirectionalLight>(new DirectionalLight())

  const geometryMesh = useRef<THREE.Mesh>()

  const initRender = useCallback(() => {
    if (canvas_wrap.current) {
      glRender.current = new WebGLRenderer(
        {
          antialias: true,
          canvas: canvasIns.current as HTMLCanvasElement,
          alpha: true
        }
      )
      glRender.current.toneMapping = LinearToneMapping;
      glRender.current.setPixelRatio(window.devicePixelRatio)
      glRender.current.setSize(canvas_wrap.current.offsetWidth, canvas_wrap.current.offsetHeight)
    }

    // glRender.current.setClearAlpha(0)
  }, [])

  const initCameraPos = useCallback(() => {
    camera.current.position.setZ(170)

    camera.current.lookAt(0, 0, 0)
    if (canvas_wrap.current) {
      console.log(canvas_wrap.current.offsetWidth / canvas_wrap.current.offsetHeight)
      camera.current.aspect = canvas_wrap.current.offsetWidth / canvas_wrap.current.offsetHeight
      camera.current.updateProjectionMatrix()
    }
  }, [])

  const addLight = useCallback(
    () => {
      // d_light.current = new DirectionalLight(new Color('white'), 2);
      // d_light.current.position.set(-3, 2, -4).normalize();
      // scene.current.add(d_light.current);

      // const light_2 = new DirectionalLight(new Color('white'), 1);
      // light_2.position.set(0, 0, 2).normalize();
      // scene.current.add(light_2);

      const light = new AmbientLight(new Color('white'), 1.5); // soft white light
      scene.current.add(light);
    }, []
  )

  useEffect(() => {
    if (glRender.current) {
      return
    }
    if (canvasIns.current) {
      // const texture = new TextureLoader().load('/login_background.png');
      scene.current.background = null;

      // init render
      initRender()

      initCameraPos()
      addLight()
    }
  }, [initRender, initCameraPos, addLight])

  useEffect(() => {
    window.addEventListener('resize', function () {
      const width = window.innerWidth;
      const height = window.innerHeight;
      glRender.current?.setSize(width, height);
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
    });
  }, [])

  useEffect(() => {
    const projection = d3.geoEquirectangular().translate([1024, 512]).scale(326);

    const json: any = earth_json
    const countries = topojson.feature(json, json.objects.countries);

    const canvas = d3
      .select('body')
      .append('canvas')
      .style('display', 'none')
      .attr('width', '2048px')
      .attr('height', '1024px');

    const context = canvas.node()?.getContext('2d');

    if (context) {
      const path = d3.geoPath().projection(projection).context(context);
      context.beginPath();
      context.fillStyle = 'rgba(11, 21, 31, 0.3)';
      context.fillRect(0, 0, 2048, 1024)
      context.closePath()
      context.beginPath();
      context.strokeStyle = 'rgba(34, 145, 224, 1)';
      context.lineWidth = 1;
      context.fillStyle = 'rgba(34, 145, 224, 0.1)';
      path(countries);

      context.fill();
      context.stroke();
      context.closePath()

      const mapTexture = new Texture(canvas.node() as any);
      mapTexture.needsUpdate = true;

      const group = new Group();

      group.rotateX(Math.PI / 6);

      const RADIUS = 50;

      const sphereGeometry = new SphereGeometry(RADIUS, 60, 60);
      const sphereMaterial = new MeshPhongMaterial({
        map: mapTexture,
        transparent: false,
        opacity: 1,
        // wireframe: true
        // color: new Color('red')
      });

      geometryMesh.current = new Mesh(sphereGeometry, sphereMaterial);
      geometryMesh.current.name = 'earth';

      group.add(geometryMesh.current);
      scene.current.add(group);

      const customMaterial = new ShaderMaterial({
        uniforms: {},
        vertexShader: shaders.vertex.default,
        fragmentShader: shaders.fragment.default,
        side: BackSide,
        blending: AdditiveBlending,
        transparent: true
      });

      const ballGeometry = new SphereBufferGeometry(60, 64, 64)
      const ball = new Mesh(ballGeometry, customMaterial);

      scene.current.add(ball);
    }
  }, [])

  const flashGL = useCallback(() => {
    const controls = new OrbitControls(camera.current, canvasIns.current as HTMLCanvasElement);
    controls.enableZoom = false
    // const controls = new FlyControls(camera.current, glRender.current?.domElement);
    // const clock = new Clock();

    // controls.movementSpeed = 1000;
    // controls.domElement = glRender.current?.domElement as HTMLCanvasElement;
    // controls.rollSpeed = Math.PI / 24;
    // controls.autoForward = false;
    // controls.dragToLook = false;
    const quaternion = new Quaternion();
    // const axias = new THREE.Vector3(0, 1, 0)
    const euler = new Euler(0, -0.005, 0, 'XYZ');
    quaternion.setFromEuler(euler);

    const renderCvs = () => {
      controls.update();
      //   const delta = clock.getDelta();
      //   controls.update(delta);
      geometryMesh.current?.applyQuaternion(quaternion)

      glRender.current?.render(scene.current, camera.current)
      requestAnimationFrame(renderCvs)
    }

    renderCvs()
  }, [])

  useEffect(() => {
    flashGL()
  }, [flashGL])
  return (
    <div styleName='Earth' ref={canvas_wrap}>
      <canvas ref={canvasIns} className='canvas' />
    </div>
  )
}

export default Earth
