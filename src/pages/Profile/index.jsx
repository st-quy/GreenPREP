import React, { useState } from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Typography,
  Button,
  Descriptions,
  Divider,
  Spin,
} from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import TableSearch from "@shared/ui/TableSearch";
import { useGetProfile } from "@features/auth/hooks";
import ChangePassword from "@features/profile/ui/Modal/ChangePassword";
import ProfileUpdate from "@features/profile/ui/Modal/ProfileUpdate";
import { useGetAssessmentHistory } from "@features/sessionParticipants/hooks";

const Profile = () => {
  const [openKey, setOpenKey] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading } = useGetProfile();
  const { data: assessmentData, isLoading: isLoadingHistory } =
    useGetAssessmentHistory();

  const columns = [
    {
      title: "SESSION NAME",
      dataIndex: "sessionName",
      key: "sessionName",
      render: (text, record) => record.Session.sessionName,
    },
    {
      title: "GRAMMAR & VOCABULARY",
      dataIndex: "GrammarVocab",
      key: "GrammarVocab",
      render: (text, record) =>
        text ? record.GrammarVocab + "|" + record.GrammarVocabLevel : "No Data",
    },
    {
      title: "SPEAKING",
      dataIndex: "Speaking",
      key: "Speaking",
      render: (text, record) =>
        text ? record.Speaking + "|" + record.SpeakingLevel : "No Data",
    },
    {
      title: "LISTENING",
      dataIndex: "Listening",
      key: "Listening",
      render: (text, record) =>
        text ? record.Listening + "|" + record.ListeningLevel : "No Data",
    },
    {
      title: "READING",
      dataIndex: "Reading",
      key: "Reading",
      render: (text, record) =>
        text ? record.Reading + "|" + record.ReadingLevel : "No Data",
    },
    {
      title: "WRITING",
      dataIndex: "Writing",
      key: "Writing",
      render: (text, record) =>
        text ? record.Writing + "|" + record.WritingLevel : "No Data",
    },
    {
      title: "TOTAL",
      dataIndex: "Total",
      key: "Total",
      render: (text, record) => (text ? record.Total : "No Data"),
    },
    {
      title: "LEVEL",
      dataIndex: "Level",
      key: "Level",
      render: (text, record) => (text ? record.Level : "No Data"),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 mb-6 cursor-pointer w-fit  hover:font-bold"
        onClick={() => navigate("/")}
      >
        <LeftOutlined />
        <Typography.Text className="text-sm inline-block">
          Back to home
        </Typography.Text>
      </div>
      <Card className="bg-[#F9FAFB] rounded-lg text-[#0F3E8F] flex items-center">
        <UserOutlined />
        <span className="ml-2">Profile</span>
      </Card>
      <Row className="mt-4 items-center" gutter={[16, 16]}>
        <Col md={12}>
          <Typography.Title level={3} className="">
            My profile
          </Typography.Title>
          <Typography.Text className="text-[#768490]">
            Summary of personal information.
          </Typography.Text>
        </Col>
        <Col md={12} className="flex justify-end gap-2">
          <Button
            className="border border-[#0F3E8F] text-[#0F3E8F] rounded-full px-4 py-2 hover:bg-[#0F3E8F] hover:text-white"
            onClick={() => setOpenKey("change-password")}
          >
            Change password
          </Button>
          <Button
            className="bg-[#0F3E8F] !text-white rounded-full px-4 py-2 hover:!bg-[#092C6C] !border-0"
            onClick={() => setOpenKey("update-profile")}
          >
            Update profile
          </Button>
        </Col>
      </Row>
      <Row className="mt-6">
        <Card className="w-full !bg-[#F9FAFB] shadow-sm rounded-lg p-4">
          <Descriptions
            column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
            // bordered
            labelStyle={{ fontWeight: "bold", color: "#6B7280" }}
            contentStyle={{ color: "#111827", fontWeight: "bold" }}
          >
            <Descriptions.Item label="Student name">
              {data?.firstName + " " + data?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
            <Descriptions.Item label="Student ID">
              {data?.studentCode}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">{data?.phone}</Descriptions.Item>
            <Descriptions.Item label="Class name">
              {data?.class}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Row>
      <Divider />
      <Row className="mt-4 items-center" gutter={[16, 16]}>
        <Col md={24}>
          <Typography.Title level={3} className="">
            Assessment History
          </Typography.Title>
          <Typography.Text className="text-[#768490]">
            Overview of Past Performance.
          </Typography.Text>
        </Col>
      </Row>

      <TableSearch
        data={assessmentData}
        columns={columns}
        isLoading={isLoadingHistory}
      />
      {openKey === "change-password" && (
        <ChangePassword openKey={openKey} setOpenKey={setOpenKey} />
      )}
      {openKey === "update-profile" && (
        <ProfileUpdate openKey={openKey} setOpenKey={setOpenKey} />
      )}
    </div>
  );
};

export default Profile;
