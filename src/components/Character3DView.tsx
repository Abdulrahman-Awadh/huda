'use client'

import { useEffect, useRef, Suspense, useState, lazy } from 'react'

interface CharacterModelProps {
  isAnimating: boolean
  modelUrl: string
}

interface Character3DViewProps {
  isAnimating: boolean
  modelUrl?: string
}

// Fallback component
const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <div className="loading-spinner mb-4"></div>
      <p className="text-gray-600">جاري تحميل النموذج ثلاثي الأبعاد...</p>
    </div>
  </div>
)

// Error component
const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center p-4">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-gray-600 mb-2">حدث خطأ في تحميل النموذج ثلاثي الأبعاد</p>
      <p className="text-sm text-gray-500">{error}</p>
    </div>
  </div>
)

// Create a separate component for the 3D content
const ThreeCanvas = lazy(() => 
  import('@react-three/fiber').then(module => ({
    default: ({ isAnimating, modelUrl }: { isAnimating: boolean; modelUrl: string }) => {
      const { Canvas, useFrame } = module
      const [dreiModule, setDreiModule] = useState<any>(null)
      const [threeModule, setThreeModule] = useState<any>(null)

      useEffect(() => {
        Promise.all([
          import('@react-three/drei'),
          import('three')
        ]).then(([drei, three]) => {
          setDreiModule(drei)
          setThreeModule(three)
        })
      }, [])

      if (!dreiModule || !threeModule) {
        return <Fallback />
      }

      const { OrbitControls, useGLTF, Stage } = dreiModule

      // Character Model Component
      const CharacterModel = ({ isAnimating, modelUrl }: CharacterModelProps) => {
        try {
          const { scene, animations } = useGLTF(modelUrl)
          const mixerRef = useRef<any>()
          const actionsRef = useRef<any[]>([])
          
          useEffect(() => {
            if (scene && threeModule) {
              mixerRef.current = new threeModule.AnimationMixer(scene)
              
              if (animations && animations.length > 0) {
                actionsRef.current = animations.map((clip: any) => {
                  const action = mixerRef.current!.clipAction(clip)
                  return action
                })
              }
            }
            
            return () => {
              actionsRef.current.forEach(action => action.stop())
            }
          }, [scene, animations])

          useEffect(() => {
            if (actionsRef.current.length > 0) {
              if (isAnimating) {
                actionsRef.current[0].play()
              } else {
                actionsRef.current[0].stop()
              }
            }
          }, [isAnimating])

          useFrame((state: any, delta: number) => {
            if (mixerRef.current && isAnimating) {
              mixerRef.current.update(delta)
            }
          })
          
          return <primitive object={scene} scale={1} />
        } catch (err) {
          console.error('Error in CharacterModel:', err)
          return null
        }
      }

      // Preload the model
      useEffect(() => {
        if (useGLTF && modelUrl) {
          try {
            useGLTF.preload(modelUrl)
          } catch (err) {
            console.error('Failed to preload model:', err)
          }
        }
      }, [modelUrl])

      return (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <Stage environment="city" intensity={0.6}>
            <CharacterModel isAnimating={isAnimating} modelUrl={modelUrl} />
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
  }))
)

export default function Character3DView({ isAnimating, modelUrl = '/charecter.glb' }: Character3DViewProps) {
  const [error, setError] = useState<string | null>(null)

  return (
    <Suspense fallback={<Fallback />}>
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <ThreeCanvas isAnimating={isAnimating} modelUrl={modelUrl} />
      )}
    </Suspense>
  )
}