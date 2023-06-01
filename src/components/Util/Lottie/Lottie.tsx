import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationConfigWithData, AnimationDirection, AnimationItem, AnimationSegment } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  path?: string;
  initialSegment?: AnimationSegment;
  renderer?: 'svg' | 'canvas' | 'html';
  width?: string;
  height?: string;
  speed?: number;
  direction?: AnimationDirection;
  isPlaying?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  path,
  initialSegment,
  renderer = 'svg',
  width = '100%',
  height = '100%',
  speed = 1,
  direction = 1,
  isPlaying = true,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<AnimationItem | null>(null);

  useEffect(() => {
    if (container.current) {
      const config: AnimationConfigWithData = {
        container: container.current,
        renderer: renderer,
        loop: true,
        autoplay: isPlaying,
        animationData: animationData,
        path: path,
        initialSegment: initialSegment,
      };

      const anim = lottie.loadAnimation(config);
      setAnimation(anim);
    }

    return () => {
      if (animation) {
        animation.destroy();
      }
    };
  }, [container, animationData, path, initialSegment, renderer]);

  useEffect(() => {
    if (animation) {
      isPlaying ? animation.play() : animation.stop();
    }
  }, [isPlaying, animation]);

  return <div ref={container} style={{ width: width, height: height }}></div>;
};


export default LottieAnimation;
