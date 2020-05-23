import React, { useCallback, Suspense } from 'react'
import { Canvas, CanvasContext } from 'react-three-fiber'
import { Color } from 'three'
import { NudeModel } from './model'

const LIGHT_COLOR = new Color(0xcccccc)

export function NudeModelPage() {
  const handleCreate = useCallback((_ctx: CanvasContext) => {
    _ctx.gl.setClearColor('#222222')
  }, [])

  return (
    <Canvas onCreated={handleCreate}>
      <ambientLight color={LIGHT_COLOR} />
      <Suspense fallback={null}>
        <NudeModel />
      </Suspense>
    </Canvas>
  )
}
