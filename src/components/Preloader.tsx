'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import { CARD_BLUR } from '@/lib/blurPlaceholder';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 520);

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 700);
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <motion.div
            className="preloader-scene"
            aria-hidden
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="preloader-gradient" />
            <div className="preloader-mesh" />
            <div className="preloader-orb preloader-orb--a" />
            <div className="preloader-orb preloader-orb--b" />
            <div className="preloader-ring" />
            <div className="preloader-shine" />
          </motion.div>

          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="preloader-logo-container"
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Image
                  src="/logo.png"
                  alt="School Logo"
                  className="preloader-logo"
                  width={180}
                  height={180}
                  placeholder="blur"
                  blurDataURL={CARD_BLUR}
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                  unoptimized
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
