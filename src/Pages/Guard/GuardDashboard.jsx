import { useEffect, useState } from "react";
import GuardLayout from "../../layouts/GuardLayout";
import api from "../../api/axios";
import "./GuardDashboard.css";

export default function GuardDashboard() {
  const [insideCount, setInsideCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    api.get("/api/visitors/inside", { withCredentials: true })
      .then(res => setInsideCount(res.data.length))
      .catch(() => setInsideCount(0));

    api.get("/api/visitors/today", { withCredentials: true })
      .then(res => setTodayCount(res.data.length))
      .catch(() => setTodayCount(0));
  }, []);

  return (
    <GuardLayout>
      <div className="guard-dashboard animate-fade-in">
        <h2 className="guard-title">Security Overview</h2>

        <div className="summary-grid">
          <div className="summary-card blue">
            <h3>{insideCount}</h3>
            <p>Visitors Inside</p>
          </div>

          <div className="summary-card green">
            <h3>{todayCount}</h3>
            <p>Total Visitors Today</p>
          </div>

          <div className="summary-card amber">
            <h3>Active</h3>
            <p>System Status</p>
          </div>
        </div>
      </div>
    </GuardLayout>
  );
}

