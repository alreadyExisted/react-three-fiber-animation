import React, { useRef, useMemo, useCallback, MouseEvent } from 'react'
import { Color } from 'three'
import { Canvas, CanvasContext } from 'react-three-fiber'
import { TimelineMax, Expo } from 'gsap'

type ThreeArray = [number, number, number]

const LIGHT_COLOR = new Color(0xffffff)
const LIGHT1_POSITION: ThreeArray = [0, 0, 0]
const LIGHT2_POSITION: ThreeArray = [0, 0, 25]
const MESH_COLOR = new Color(0xf7f7f7)
const GEOMETRY_ARGS: ThreeArray = [1, 1, 1]

export function App() {
  const mouse = useRef({ x: 0, y: 0 })
  const ctx = useRef<CanvasContext>()
  const items = useMemo(
    () =>
      new Array(25).fill(0).map((_, index) => {
        return (
          <Box
            key={index}
            position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
          />
        )
      }),
    []
  )
  const handleCreate = useCallback(
    (_ctx: CanvasContext) => {
      _ctx.gl.setClearColor('#e5e5e5')
      ctx.current = _ctx
    },
    [ctx]
  )
  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    if (!ctx.current) return
    ctx.current.raycaster.setFromCamera(mouse.current, ctx.current.camera)
    const intersects = ctx.current.raycaster.intersectObjects(ctx.current.scene.children, true)
    intersects.forEach(item => {
      const tl = new TimelineMax()
      tl.to(item.object.scale, 1, { x: 2, ease: Expo.easeOut })
      tl.to(item.object.scale, 0.5, { x: 0.5, ease: Expo.easeOut })
      tl.to(item.object.position, 0.5, { x: 2, ease: Expo.easeOut })
      tl.to(item.object.rotation, 0.5, { y: Math.PI * 0.5, ease: Expo.easeOut }, '=-1.5')
    })
  }, [])

  return (
    <Canvas onCreated={handleCreate} onMouseMove={handleMouseMove}>
      <pointLight color={LIGHT_COLOR} position={LIGHT1_POSITION} intensity={1} distance={1000} />
      <pointLight color={LIGHT_COLOR} position={LIGHT2_POSITION} intensity={2} distance={1000} />
      {items}
    </Canvas>
  )
}

function Box({ position }: { position: ThreeArray }) {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={GEOMETRY_ARGS} />
      <meshLambertMaterial attach="material" color={MESH_COLOR} />
    </mesh>
  )
}
