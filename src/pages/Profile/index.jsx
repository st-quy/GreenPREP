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

const Profile = () => {
  const [openKey, setOpenKey] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading } = useGetProfile();

  const data1 = [
    {
      sessionName: "SPRING_P1_2025",
      grammar: 43,
      listening: "50|B",
      reading: 46,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "C",
    },
    {
      sessionName: "FALL_P3_2024",
      grammar: 44,
      listening: "23",
      reading: 5,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B2",
    },
    {
      sessionName: "FALL_P2_2024",
      grammar: 46,
      listening: "23",
      reading: 3,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B2",
    },
    {
      sessionName: "FALL_P1_2024",
      grammar: 31,
      listening: "24",
      reading: 3,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B1",
    },
    {
      sessionName: "SUMMER_P3_2023",
      grammar: 35,
      listening: "28",
      reading: 8,
      speaking: 4,
      writing: 4,
      total: 4,
      level: "B1",
    },
    {
      sessionName: "SUMMER_P2_2023",
      grammar: 50,
      listening: "40",
      reading: 10,
      speaking: 5,
      writing: 5,
      total: 5,
      level: "A2",
    },
    {
      sessionName: "SUMMER_P1_2023",
      grammar: 48,
      listening: "39",
      reading: 9,
      speaking: 4,
      writing: 4,
      total: 4,
      level: "A2",
    },
    {
      sessionName: "SPRING_P3_2023",
      grammar: 37,
      listening: "30",
      reading: 6,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B1",
    },
    {
      sessionName: "SPRING_P2_2023",
      grammar: 41,
      listening: "35",
      reading: 7,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B1",
    },
    {
      sessionName: "SPRING_P1_2023",
      grammar: 29,
      listening: "20",
      reading: 2,
      speaking: 2,
      writing: 2,
      total: 2,
      level: "B2",
    },
    {
      sessionName: "WINTER_P3_2022",
      grammar: 36,
      listening: "26",
      reading: 7,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B1",
    },
    {
      sessionName: "WINTER_P2_2022",
      grammar: 40,
      listening: "33",
      reading: 9,
      speaking: 4,
      writing: 4,
      total: 4,
      level: "A2",
    },
    {
      sessionName: "WINTER_P1_2022",
      grammar: 50,
      listening: "45",
      reading: 12,
      speaking: 5,
      writing: 5,
      total: 5,
      level: "A1",
    },
    {
      sessionName: "FALL_P3_2022",
      grammar: 45,
      listening: "37",
      reading: 10,
      speaking: 4,
      writing: 4,
      total: 4,
      level: "A2",
    },
    {
      sessionName: "FALL_P2_2022",
      grammar: 38,
      listening: "29",
      reading: 6,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B1",
    },
    {
      sessionName: "FALL_P1_2022",
      grammar: 42,
      listening: "34",
      reading: 8,
      speaking: 4,
      writing: 4,
      total: 4,
      level: "A2",
    },
    {
      sessionName: "SUMMER_P3_2022",
      grammar: 39,
      listening: "32",
      reading: 5,
      speaking: 3,
      writing: 3,
      total: 3,
      level: "B1",
    },
    {
      sessionName: "SUMMER_P2_2022",
      grammar: 46,
      listening: "36",
      reading: 11,
      speaking: 4,
      writing: 4,
      total: 4,
      level: "A2",
    },
    {
      sessionName: "SUMMER_P1_2022",
      grammar: 30,
      listening: "21",
      reading: 3,
      speaking: 2,
      writing: 2,
      total: 2,
      level: "B2",
    },
  ];

  const columns = [
    {
      title: "SESSION NAME",
      dataIndex: "sessionName",
      key: "sessionName",
    },
    {
      title: "GRAMMAR & VOCABULARY",
      dataIndex: "grammar",
      key: "grammar",
    },
    {
      title: "LISTENING",
      dataIndex: "listening",
      key: "listening",
      render: (text) => (text.includes("|") ? text.replace("|", " | ") : text),
    },
    {
      title: "READING",
      dataIndex: "reading",
      key: "reading",
    },
    {
      title: "SPEAKING",
      dataIndex: "speaking",
      key: "speaking",
      //   render: (text) => <Link>{text}</Link>,
    },
    {
      title: "WRITING",
      dataIndex: "writing",
      key: "writing",
      //   render: (text) => <Link>{text}</Link>,
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",
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
      <TableSearch data={data1} columns={columns} />
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
