import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, theme }) => {
  return (
    <div style={styles.phoneContainer}>
      {/* Outer bezel shadow */}
      <div style={{
        ...styles.phoneBezel,
        borderColor: theme === 'dark' ? '#0f172a' : '#1e293b',
        backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
      }}>
        {/* Notch */}
        <div style={styles.phoneNotch}>
          <div style={styles.speaker} />
          <div style={styles.camera} />
        </div>

        {/* Status Bar */}
        <div style={{
          ...styles.statusBar,
          color: theme === 'dark' ? '#f8fafc' : '#0f172a',
        }}>
          <span style={styles.statusTime}>12:34</span>
          <div style={styles.statusIcons}>
            <span>📶</span>
            <span>📶</span>
            <span>🔋 85%</span>
          </div>
        </div>

        {/* Viewport content */}
        <div style={{
          ...styles.viewport,
          backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
        }}>
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div style={styles.homeIndicatorWrapper}>
          <div style={{
            ...styles.homeIndicator,
            backgroundColor: theme === 'dark' ? '#ffffff' : '#000000',
          }} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  phoneContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  phoneBezel: {
    width: '390px',
    height: '844px',
    borderRadius: '50px',
    borderWidth: '12px',
    borderStyle: 'solid' as const,
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  phoneNotch: {
    width: '150px',
    height: '28px',
    backgroundColor: '#000000',
    borderBottomLeftRadius: '18px',
    borderBottomRightRadius: '18px',
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  speaker: {
    width: '40px',
    height: '4px',
    backgroundColor: '#2b2b2b',
    borderRadius: '2px',
  },
  camera: {
    width: '8px',
    height: '8px',
    backgroundColor: '#1a1a1a',
    borderRadius: '50%',
  },
  statusBar: {
    height: '44px',
    paddingHorizontal: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '28px',
    paddingRight: '28px',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 90,
  },
  statusTime: {
    marginTop: '8px',
  },
  statusIcons: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    marginTop: '8px',
  },
  viewport: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
    overflow: 'hidden',
  },
  homeIndicatorWrapper: {
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 95,
  },
  homeIndicator: {
    width: '140px',
    height: '5px',
    borderRadius: '100px',
  },
};

export default MobileFrame;
