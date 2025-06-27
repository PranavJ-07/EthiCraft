import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const IDCard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const cardRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${userData?.name || "IDCard"}.pdf`);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <div ref={cardRef} style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <img
            src="/path-to-uploaded-logo/images.png"
            alt="Ethicraft Logo"
            style={styles.logo}
          />
        </div>

        {/* Name and ID */}
        <div style={styles.details}>
          <h2 style={styles.name}>{userData.name}</h2>
          <p>ID Number: {userData.ethicCraftId}</p>
          <p>Type: {userData.studentType}</p>
          <p>Valid Thru: {userData.validity}</p>
        </div>

        {/* QR Code */}
        <div style={styles.qrCode}>
          <QRCodeCanvas value={userData.rollNo} size={100} />
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Download ID Card
      </button>
    </div>
  );
};

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: "20px",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },
  details: {
    marginBottom: "20px",
  },
  name: {
    fontSize: "20px",
    margin: "0",
  },
  qrCode: {
    marginTop: "10px",
  },
};

export default IDCard;

// Usage example:
// <IDCard userId="123456" />
