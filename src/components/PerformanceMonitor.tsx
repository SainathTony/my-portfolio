import React, { useEffect, useState } from 'react';
import { usePerformance } from '../hooks/usePerformance';
import { useResponsive } from '../hooks/useResponsive';

interface PerformanceMonitorProps {
  onPerformanceChange?: (metrics: any) => void;
  className?: string;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  onPerformanceChange,
  className = '' 
}) => {
  const performance = usePerformance();
  const responsive = useResponsive();
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    if (onPerformanceChange) {
      onPerformanceChange({ performance, responsive });
    }
  }, [performance, responsive, onPerformanceChange]);

  // Apply performance-based optimizations
  useEffect(() => {
    const body = document.body;
    
    // Add performance classes to body
    body.classList.remove('high-performance', 'medium-performance', 'low-performance');
    body.classList.add(`${performance.deviceType}-performance`);
    
    // Add responsive classes
    body.classList.remove('mobile', 'tablet', 'desktop');
    if (responsive.isMobile) body.classList.add('mobile');
    if (responsive.isTablet) body.classList.add('tablet');
    if (responsive.isDesktop) body.classList.add('desktop');
    
    // Apply reduced motion if needed
    if (performance.prefersReducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }
    
    // Apply touch device optimizations
    if (performance.isTouchDevice) {
      body.classList.add('touch-device');
    } else {
      body.classList.remove('touch-device');
    }
    
    // Mobile-specific blur optimizations
    if (responsive.isMobile && performance.deviceType === 'low') {
      body.classList.add('mobile-no-blur');
    } else {
      body.classList.remove('mobile-no-blur');
    }

    return () => {
      // Cleanup on unmount
      body.classList.remove(
        'high-performance', 'medium-performance', 'low-performance',
        'mobile', 'tablet', 'desktop',
        'reduced-motion', 'touch-device', 'mobile-no-blur'
      );
    };
  }, [performance, responsive]);

  // Monitor memory usage and warn if high
  useEffect(() => {
    if (performance.memoryInfo) {
      const usagePercent = (performance.memoryInfo.usedJSHeapSize / performance.memoryInfo.jsHeapSizeLimit) * 100;
      
      if (usagePercent > 80) {
        console.warn('High memory usage detected:', usagePercent.toFixed(1) + '%');
        
        // Trigger garbage collection if available
        if ((window as any).gc) {
          (window as any).gc();
        }
      }
    }
  }, [performance.memoryInfo]);

  // Development mode performance metrics display
  if (process.env.NODE_ENV === 'development' && showMetrics) {
    return (
      <div className={`fixed top-4 left-4 z-50 p-4 bg-black/80 text-white text-xs rounded-lg max-w-xs ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Performance Metrics</h3>
          <button 
            onClick={() => setShowMetrics(false)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-1">
          <div>Device: {performance.deviceType}</div>
          <div>Screen: {responsive.width}×{responsive.height}</div>
          <div>Breakpoint: {responsive.breakpoint}</div>
          <div>Touch: {performance.isTouchDevice ? 'Yes' : 'No'}</div>
          <div>Reduced Motion: {performance.prefersReducedMotion ? 'Yes' : 'No'}</div>
          
          {performance.memoryInfo && (
            <div>
              Memory: {Math.round(performance.memoryInfo.usedJSHeapSize / 1024 / 1024)}MB
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-400">
            WebGL: {performance.supportedFeatures.webgl ? '✓' : '✗'} |
            IntersectionObserver: {performance.supportedFeatures.intersectionObserver ? '✓' : '✗'}
          </div>
        </div>
      </div>
    );
  }

  // Show metrics toggle in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        onClick={() => setShowMetrics(true)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors"
        title="Show Performance Metrics"
      >
        📊
      </button>
    );
  }

  return null;
};

export default PerformanceMonitor;