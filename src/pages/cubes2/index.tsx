import React, { useMemo, useCallback, useRef, PropsWithChildren, useEffect } from 'react'
import { Color, Mesh, Group } from 'three'
import { Canvas, CanvasContext, useFrame } from 'react-three-fiber'
import { TimelineMax } from 'gsap'
import { ThreeArray } from 'src/interfaces'

const LIGHT_COLOR = new Color(0xffc5d0)
const LIGHT1_POSITION: ThreeArray = [0, 0, 0]
const LIGHT2_POSITION: ThreeArray = [0, 0, 25]
const X = [-6, -4, -2, 0, 2, 4, 6]
const Y = [-3, -1, 1, 3]

export function Cubes2Page() {
  const ctx = useRef<CanvasContext>()

  const items = useMemo(() => {
    const _items = []
    for (let i = 0; i < X.length; i++) {
      for (let j = 0; j < Y.length; j++) {
        _items.push(<Box key={`${i}${j}`} position={[X[i], Y[j], -2]} />)
      }
    }
    return _items
  }, [])
  const handleCreate = useCallback(
    (_ctx: CanvasContext) => {
      _ctx.gl.setClearColor('#222222')
      ctx.current = _ctx
    },
    [ctx]
  )

  return (
    <Canvas onCreated={handleCreate}>
      <pointLight color={LIGHT_COLOR} position={LIGHT1_POSITION} intensity={1} distance={1000} />
      <pointLight color={LIGHT_COLOR} position={LIGHT2_POSITION} intensity={2} distance={1000} />
      <GroupWrapper>{items}</GroupWrapper>
    </Canvas>
  )
}

function GroupWrapper({ children }: PropsWithChildren<{}>) {
  const group = useRef<Group>()
  useEffect(() => {
    if (!group.current) return
    const tl = new TimelineMax()
    tl.to(group.current.scale, 2, { z: -1, repeat: -1, yoyo: true })
  }, [])
  return <group ref={group}>{children}</group>
}

const GEOMETRY_ARGS: ThreeArray = [1, 1, 1]
const MESH_COLOR = new Color(0x74b7ac)

function Box({ position }: { position: ThreeArray }) {
  const mesh = useRef<Mesh>()
  useFrame(() => {
    const { rotation } = mesh.current!
    rotation.x += 0.01
    rotation.y += 0.01
    rotation.z += 0.01
  })
  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry attach="geometry" args={GEOMETRY_ARGS} />
      <meshLambertMaterial attach="material" color={MESH_COLOR} />
    </mesh>
  )
}
