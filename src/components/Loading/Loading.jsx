import React, { useState, useEffect } from "react";
import "./style.css";

export default function Loading({ loading }) {
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOver(true);
      document.body.classList.add("loaded");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`overlay ${loading ? "loaded" : ""}`}>
      <div className="overlayDoor"></div>
      <div className="overlayContent">
        <div className="loader">
          <div className="inner"></div>
        </div>
        {isOver && (
          <div>
            <div className="skip">יכול להיות הסרבר עולה</div>
            <div className="skip">זה יקח דקה בערך</div>
            <div className="skip">תודה על הסבלנות</div>
          </div>
        )}
      </div>
    </div>
  );
}
