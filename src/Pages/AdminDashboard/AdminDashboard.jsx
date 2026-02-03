import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import {
  FaUsers,
  FaHome,
  FaBell,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const societyId = user?.societyId;


  // ===============================
  // Pending Approvals Count
  // ===============================
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    api
      .get(`/api/admin/pending/count?societyId=${societyId}`)
      .then((res) => setPendingApprovals(res.data))
      .catch(() => setPendingApprovals(0));
  }, []);

  // ===============================
  // Flat Dashboard Stats
  // ===============================
  const [flatStats, setFlatStats] = useState({
    totalFlats: 0,
    occupiedFlats: 0,
    vacantFlats: 0,
  });
  useEffect(() => {
    api
      .get(`/api/admin/flats/count?societyId=${societyId}`)
      .then((res) => setFlatStats(res.data))
      .catch(() =>
        setFlatStats({
          totalFlats: 0,
          occupiedFlats: 0,
          vacantFlats: 0,
        })
      );
  }, []);

  // Notice Bucket
  const [noticeCount, setNoticeCount] = useState(0);
  useEffect(() => {
    api.get(`/api/admin/notices/count`)
      .then(res => setNoticeCount(res.data))
      .catch(() => setNoticeCount(0));
  }, []);


  //Pending Complaints Count
  const [pendingComplaintCount, setPendingComplaintCount] = useState(0);

  useEffect(() => {
    api
      .get(`/complaints/pending/count`)
      .then((res) => setPendingComplaintCount(res.data.count))
      .catch(() => setPendingComplaintCount(0));
  }, []);



  return (
    <DashboardLayout>
      <div className="member-dashboard animate-fade-in">
        <div className="welcome-section">
          <h1 className="welcome-title">Society Admin</h1>
          <p className="welcome-subtitle">
            Manage your society's operations and residents with ease.
          </p>
        </div>

        <div className="stats-grid">
          <Card
            className="stat-card complaints-card"
            onClick={() => navigate("/admin/approve-users")}
          >
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <p className="stat-label">Member Requests</p>
              <h3 className="stat-value">{pendingApprovals}</h3>
              <p className="stat-subtext">Awaiting approval</p>
            </div>
          </Card>

          <Card
            className="stat-card maintenance-card"
            onClick={() => navigate("/admin/manage-flats")}
          >
            <div className="stat-icon">
              <FaHome />
            </div>
            <div className="stat-content">
              <p className="stat-label">Inventory</p>
              <h3 className="stat-value">{flatStats.totalFlats}</h3>
              <p className="stat-subtext">
                {flatStats.occupiedFlats} Active · {flatStats.vacantFlats} Vacant
              </p>
            </div>
          </Card>

          <Card
            className="stat-card notices-card"
            onClick={() => navigate("/notices")}
          >
            <div className="stat-icon">
              <FaBell />
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Notices</p>
              <h3 className="stat-value">{noticeCount}</h3>
              <p className="stat-subtext">Community updates</p>
            </div>
          </Card>

          <Card
            className="stat-card events-card"
            onClick={() => navigate("/complaints")}
          >
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="stat-content">
              <p className="stat-label">Open Issues</p>
              <h3 className="stat-value">{pendingComplaintCount}</h3>
              <p className="stat-subtext">Pending resolution</p>
            </div>
          </Card>
        </div>

        <div className="content-row">
          <div className="events-card-list">
            <h2 className="section-title">Quick Management Hub</h2>
            <div className="events-list">
              <button
                className="admin-action-btn"
                onClick={() => navigate("/admin/approve-users")}
              >
                <FaUsers /> Review Approvals
              </button>
              <button
                className="admin-action-btn"
                onClick={() => navigate("/admin/manage-flats?add=true")}
              >
                <FaHome /> Register Property
              </button>
              <button
                className="admin-action-btn"
                onClick={() => navigate("/notices/add")}
              >
                <FaBell /> Post Update
              </button>
              <button
                className="admin-action-btn"
                onClick={() => navigate("/complaints")}
              >
                <FaExclamationTriangle /> Support Desk
              </button>
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}
