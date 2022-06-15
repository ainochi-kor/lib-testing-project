import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Modeler3D = () => {
  const scene = new THREE.Scene();

  const loader = new GLTFLoader();
  const camera = new THREE.PerspectiveCamera(30, 1); // 원근법이 적용된 카메라

  scene.background = new THREE.Color('black'); // 배경색

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas') ?? undefined,
      antialias: true, // 계단 현상 제거
    });
    renderer.outputEncoding = THREE.sRGBEncoding; // 내츄럴한 색으로 변경
    const controls = new OrbitControls(camera, renderer.domElement); // 마우스 컨트롤 가능
    camera.position.set(0, 0, 5); // 카메라 위치
    controls.update();
    loader.load('./Images/Modler3D/scene.gltf', function (gltf: any) {
      const glt = gltf;
      scene.add(glt.scene);
      animate();
      // renderer.render(scene, camera);
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
    });
  }, []);

  return (
    <Wrapper>
      <h1>돌아라 강아지야</h1>
      <p>마우스 컨트롤 가능하게 만들어놨음</p>
      <canvas id='canvas' width='300' height='300' />
    </Wrapper>
  );
};

export default Modeler3D;

const Wrapper = styled.div`
  width: 100%;
`;
