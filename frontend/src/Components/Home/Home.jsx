import React, { useEffect } from 'react'
import * as THREE from "three";
import './Home.css'
import moonImage from '../../Images/moon.jpg'
import venusImage from '../../Images/venus.jpg'
import spaceImage from '../../Images/space.jpg'

import { Link, Typography } from "@mui/material";
import TimeLine from "../TimeLine/TimeLine";

import {
  SiCplusplus,
  SiReact,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiCss3,
  SiHtml5,
  SiThreedotjs,
} from "react-icons/si";

import YoutubeCard from '../YoutubeCard/YoutubeCard';
import { MouseOutlined } from '@mui/icons-material';

const Home = ({ timelines, youtubes, skills }) => {

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const moonTexture = textureLoader.load(moonImage);
    const venusTexture = textureLoader.load(venusImage);
    const spaceTexture = textureLoader.load(spaceImage)

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 4, 8);
    // camera.position.set(1, -1, 10);

    const canvas = document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    // const geomatry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const mesh = new THREE.Mesh(geomatry, material);
    // scene.add(mesh);
    // camera.position.z = 8;


    // const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    // const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venus.position.set(8, 5, 5);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.set(8, 5, 5);
    pointLight2.position.set(-8, -5, -5);

    // pointLight.position.z = 10;

    // only for example how its work
    // const lightHlper = new THREE.PointLightHelper(pointLight)
    // const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(moon);
    scene.add(venus);
    scene.background = spaceTexture;
    scene.add(pointLight);
    scene.add(pointLight2);
    // scene.add(lightHlper);

    // camera.position.z = 10;

    // cursor pointer onujai moon ghurbe
    const constSpeed = 0.01;
    window.addEventListener("mousemove", (e) => {
      if (e.clientX <= window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }

      if (e.clientX > window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }

      if (e.clientY > window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }

      if (e.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      // mesh.rotation.z += 0.001;

      moon.rotation.y += 0.001;
      venus.rotation.y += 0.001;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    animate();

    return window.addEventListener("scroll", () => {
      camera.rotation.z = window.scrollY * 0.001;
      camera.rotation.y = window.scrollY * 0.003;

      const skillBox = document.getElementById("homeskillsBox");

      if (window.scrollY > 1000) {
        skillBox.style.animationName = "homeskillsBoxAnimationOn"
      }
      else {
        skillBox.style.animationName = "homeskillsBoxAnimationOff"
      }
    });

    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.render(scene, camera);

  }, []);

  return (
    <div className='home'>
      <canvas className='homeCanvas'></canvas>

      <div className='homeCanvasContainer'>
        <Typography variant='h1'>
          <p>Z</p>
          <p>A</p>
          <p>H</p>
          <p>I</p>
          <p>D</p>
        </Typography>

        <div className="homeCanvasBox">
          <Typography variant="h2">DESIGNER</Typography>
          <Typography variant="h2">DEVELOPER</Typography>
          <Typography variant="h2">PROBLEM SOLVER</Typography>
          <Typography variant="h2">CONTENT CREATOR</Typography>
        </div>

        <Link to="/projects">VIEW WORK</Link>
      </div>

      <div className="homeScrollBtn">
        <MouseOutlined />
      </div>

      <div className="homeContainer">
        <Typography variant="h3">TIMELINE</Typography>
        <TimeLine timelines={timelines} />
        {/* <TimeLine timelines={[1, 2, 3, 4]} /> */}
      </div>
      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>
        <div className="homeCubeSkills">

          <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
            <img src={skills.image1?.url} alt="Face1" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            <img src={skills.image2?.url} alt="Face2" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img src={skills.image3?.url} alt="Face3" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img src={skills.image4?.url} alt="Face4" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img src={skills.image5?.url} alt="Face5" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img src={skills.image6?.url} alt="Face5" />
          </div>
        </div>

        <div className="cubeShadow"></div>

        <div className="homeskillsBox" id="homeskillsBox">
          <SiCplusplus />
          <SiHtml5 />
          <SiCss3 />
          <SiJavascript />
          <SiMongodb />
          <SiExpress />
          <SiReact />
          <SiNodedotjs />
          <SiThreedotjs />
        </div>

      </div>

      <div className="homeYoutube">
        <Typography variant="h3"> YOUTUBE VIDEOS</Typography>

        <div className="homeYoutubeWrapper">

          {youtubes.map((item) => (
            <YoutubeCard
              image={item.image?.url}
              title={item.title}
              url={item.url}
              id={item._id}
              key={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
