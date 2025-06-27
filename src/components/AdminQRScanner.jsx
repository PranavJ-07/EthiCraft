import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const AdminQRScanner = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [scannedToken, setScannedToken] = useState('');
  const [scanError, setScanError] = useState('');
  const [message, setMessage] = useState('');
  const isProcessing = useRef(false);
  const html5QrCodeRef = useRef(null);
  const qrContainerRef = useRef(null);
  const soundRef = useRef(null);

  const handleScan = async (decodedText) => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    try {
      setScanError('');
      setMessage('');
      setStudentInfo(null);

      const response = await fetch(`http://localhost:3000/admin/student-info?token=${decodedText}`);
      if (response.ok) {
        const data = await response.json();
        setStudentInfo(data);
        setScannedToken(decodedText);

        // ✅ Play beep sound
        if (soundRef.current) soundRef.current.play();

        // ⛔ Stop scanner after scan
        if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
          await html5QrCodeRef.current.stop();
          await html5QrCodeRef.current.clear();
        }
      } else {
        setScanError('Invalid QR code or student not found.');
        isProcessing.current = false;
      }
    } catch (error) {
      console.error(error);
      setScanError('Error while fetching student information.');
      isProcessing.current = false;
    }
  };

  const handleMarkAttendance = async () => {
    if (!scannedToken) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/scan-mark?token=${scannedToken}`, { method: 'POST' });
      const result = await res.text();
      setMessage(result);

      setStudentInfo(null);
      setScannedToken('');
      isProcessing.current = false;

      await startScanner();
    } catch (err) {
      console.error('Attendance marking failed', err);
      setMessage('Failed to mark attendance.');
    }
  };

  const startScanner = async () => {
    try {
      if (html5QrCodeRef.current) {
        await html5QrCodeRef.current.stop().catch(() => {});
        await html5QrCodeRef.current.clear().catch(() => {});
      }

      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = '';
      }

      html5QrCodeRef.current = new Html5Qrcode("qr-reader");

      await html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScan,
        (errMsg) => console.warn("QR Scan error:", errMsg)
      );
    } catch (err) {
      console.error("Failed to start scanner", err);
      setTimeout(() => {
        setScanError("Camera access denied or scanner error.");
      }, 300);
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
        html5QrCodeRef.current.stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch(err => console.warn("Stop scanner error:", err));
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin QR Attendance Scanner</h2>

      <audio ref={soundRef} src="https://www.soundjay.com/buttons/sounds/beep-07.mp3" preload="auto" />

      <div ref={qrContainerRef} id="qr-reader" style={styles.qrBox}></div>

      {scanError && <p style={styles.error}>{scanError}</p>}
      {message && <p style={styles.message}>{message}</p>}

      {studentInfo && (
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Student Info</h4>
          <p><strong>Name:</strong> {studentInfo.name}</p>
          <p><strong>Mobile:</strong> {studentInfo.mobile}</p>
          <button style={styles.button} onClick={handleMarkAttendance}>
            ✅ Confirm & Mark Attendance
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f5f7fa',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
  },
  qrBox: {
    width: '100%',
    height: 'auto',
    marginBottom: '20px'
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  message: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'left',
    marginTop: '20px'
  },
  cardTitle: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    marginBottom: '10px'
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
  }
};

export default AdminQRScanner;
