import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { FaTimes } from 'react-icons/fa';

const QrCodeScanner = () => {
  const [qrCodeResult, setQrCodeResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(success, error);

      function success(result) {
        setQrCodeResult(result);
        setIsScanning(false);
        scanner.clear();
      }

      function error(err) {
        console.warn(`Error scanning QR Code: ${err}`);
      }

      scannerRef.current = scanner;

      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear();
          scannerRef.current = null;
        }
      };
    }
  }, [isScanning]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const closeScanner = () => {
    setIsScanning(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          value={qrCodeResult}
          onChange={(e) => setQrCodeResult(e.target.value)}
          placeholder="Scanned QR Code will appear here"
        />
        <button onClick={startScanning}>Scan QR Code</button>
      </div>
      {isScanning && (
        <div style={{ position: 'relative', width: '300px', marginTop: '10px' }}>
          <div id="reader" style={{ width: '100%' }}></div>
          <button
            onClick={closeScanner}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
