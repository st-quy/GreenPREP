import { Card } from "antd";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
const Instruction = () => {
    return (
        <Card className="mb-2 shadow-sm p-0">
        <h2 className="text-base font-medium text-blue-600 mb-1">Instruction</h2>

        <p className="text-sm mb-1 leading-loose">
            You will answer some questions about yourself and then do three short speaking tasks. <br />
            Listen to the instructions and speak clearly into your microphone when you hear the signal. <br />
            Each part of the test will appear automatically. <br />
            The test will take about 12 minutes.
        </p>
        <p className="text-sm mb-1 pt-20">When you click on the 'Next' button, the test will begin.</p>

        <div className="flex justify-end mt-6 pb-5">
            <Button type="primary" size="middle" className="bg-blue-600 hover:bg-blue-700 flex items-center">
                 Begin the Test <ArrowRightOutlined className="ml-1" />
            </Button>
        </div>
      </Card>
    );
  };
  
  export default Instruction;
