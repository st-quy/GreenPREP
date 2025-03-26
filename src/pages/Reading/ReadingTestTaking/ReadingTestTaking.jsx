import RQuestionNavigator from "@features/reading/ui/ReadingNavigator/ReadingNavigator";
import ReadingParts from "@features/reading/ui/ReadingParts/ReadingParts";
import Sidebar from "@features/reading/ui/Sidebar/Sidebar";
import { Col, Row } from "antd";
import React from "react";

const ReadingTestTaking = () => {
  return (
    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
      <Col
        className="gutter-row"
        xs={{ span: 24, order: 2 }}
        md={{ span: 24, order: 2 }}
        lg={{ span: 16, order: 1 }}
        xl={{ span: 18, order: 1 }}
      >
        <ReadingParts />
      </Col>
      <Col
        className="gutter-row"
        xs={{ span: 24, order: 1 }}
        md={{ span: 24, order: 1 }}
        lg={{ span: 8, order: 2 }}
        xl={{ span: 6, order: 2 }}
      >
        <Sidebar />
      </Col>
    </Row>
  );
};

export default ReadingTestTaking;
