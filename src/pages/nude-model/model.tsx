import React, { useEffect, useRef } from 'react'
import { useLoader, useThree, extend, useFrame } from 'react-three-fiber'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Box3, Vector3, PerspectiveCamera } from 'three'

extend({ OrbitControls })

export function NudeModel() {
  const controlsRef = useRef<OrbitControls>()
  const { camera, gl } = useThree()
  const { scene } = useLoader(ColladaLoader, '/nude-model/0.dae')

  useEffect(() => {
    const controls = controlsRef.current!
    const box = new Box3()
    box.expandByObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * (camera as PerspectiveCamera).fov) / 360))
    const fitWidthDistance = fitHeightDistance / (camera as PerspectiveCamera).aspect
    const distance = 1.2 * Math.max(fitHeightDistance, fitWidthDistance)
    const direction = controls.target.clone().sub(camera.position).normalize().multiplyScalar(distance)
    controls.maxDistance = distance * 10
    controls.target.copy(center)
    camera.near = distance / 100
    camera.far = distance * 100
    camera.updateProjectionMatrix()
    camera.position.copy(controls.target).sub(direction)
    controls.update()
  }, [camera, scene])

  useFrame(() => controlsRef.current!.update())

  return (
    <>
      <orbitControls
        ref={controlsRef}
        enableZoom
        enablePan
        enableDamping
        dampingFactor={0.2}
        autoRotate
        rotateSpeed={-0.5}
        args={[camera, gl.domElement]}
      />
      <group>
        <primitive object={scene} dispose={null} />
      </group>
    </>
  )
}
