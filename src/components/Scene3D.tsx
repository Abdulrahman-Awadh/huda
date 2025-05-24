'use client'

import React from 'react'

// We need to ensure React is available globally for react-reconciler
if (typeof window !== 'undefined' && !window.React) {
  window.React = React
}

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import * as THREE from 'three'

interface Scene3DProps {
  isAnimating: boolean
  modelUrl: string
}

interface CharacterModelProps {
  isAnimating: boolean
  modelUrl: string
}

// Character Model Component
function CharacterModel({ isAnimating, modelUrl }: CharacterModelProps) {
  try {
    const { scene, animations } = useGLTF(modelUrl)
    const mixerRef = useRef<THREE.AnimationMixer | null>(null)
    const actionsRef = useRef<THREE.AnimationAction[]>([])
    
    useEffect(() => {
      if (scene) {
        mixerRef.current = new THREE.AnimationMixer(scene)
        
        if (animations && animations.length > 0) {
          actionsRef.current = animations.map(clip => {
            const action = mixerRef.current!.clipAction(clip)
            return action
          })
        }
      }
      
      return () => {
        if (actionsRef.current) {
          actionsRef.current.forEach(action => action?.stop())
        }
      }
    }, [scene, animations])

    useEffect(() => {
      if (actionsRef.current && actionsRef.current.length > 0) {
        if (isAnimating) {
          actionsRef.current[0]?.play()
        } else {
          actionsRef.current[0]?.stop()
        }
      }
    }, [isAnimating])

    useFrame((_state, delta) => {
      if (mixerRef.current && isAnimating) {
        mixerRef.current.update(delta)
      }
    })
    
    return <primitive object={scene} scale={1} />
  } catch (error) {
    console.error('Error loading model:', error)
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e4592d" />
      </mesh>
    )
  }
}

export default function Scene3D({ isAnimating, modelUrl }: Scene3DProps) {
  // Ensure we're on client side
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ 
        preserveDrawingBuffer: true, 
        antialias: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Stage environment="city" intensity={0.6}>
        <React.Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#669bbc" />
          </mesh>
        }>
          <CharacterModel isAnimating={isAnimating} modelUrl={modelUrl} />
        </React.Suspense>
      </Stage>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  )
}