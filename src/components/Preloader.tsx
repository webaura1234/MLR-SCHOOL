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
            <div className="preloader-shine" />
          </motion.div>

          <motion.div
            className="preloader-emblem"
            aria-hidden={!showLogo}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="preloader-ring" />
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  className="preloader-logo-container"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="preloader-logo-wrap">
                    <Image
                      src="/logo.png"
                      alt="School Logo"
                      className="preloader-logo"
                      width={200}
                      height={174}
                      placeholder="blur"
                      blurDataURL={CARD_BLUR}
                      priority
                      unoptimized
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
