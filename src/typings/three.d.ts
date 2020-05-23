declare namespace JSX {
  interface IntrinsicElements {
    orbitControls: import('react-three-fiber').ReactThreeFiber.Object3DNode<
      import('three/examples/jsm/controls/OrbitControls').OrbitControls,
      typeof import('three/examples/jsm/controls/OrbitControls').OrbitControls
    >
  }
}
