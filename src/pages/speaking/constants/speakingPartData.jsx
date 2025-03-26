const speakingPartData = {
  1: {
    title: "Part 1",
    description: (
      <>
        In this part, you am going to ask you three short questions. You will
        have <strong>30 seconds</strong> to reply to each question.
      </>
    ),
    caution:
      "You have 5 seconds to read each question then the system will start recording.",
    nextRoute: "/session/speaking/test/1/question/1",
  },
  2: {
    title: "Part 2",
    description: (
      <>
        In this part, I’m going to ask you to describe a picture. Then I will
        ask you two questions about it. You will have{" "}
        <strong>45 seconds</strong> for each response.
      </>
    ),
    caution:
      "You have 5 seconds to read each question, then the system will start recording. ",
    nextRoute: "/session/speaking/test/2/question/1",
  },
  3: {
    title: "Part 3",
    description: (
      <>
        In this part, I’m going to ask you to compare two pictures. Then I will
        ask you two questions about them. You will have{" "}
        <strong>45 seconds</strong> for each response.
      </>
    ),
    caution:
      "You have 5 seconds to read each question, then the system will start recording. ",
    nextRoute: "/session/speaking/test/3/question/1",
  },
  4: {
    title: "Part 4",
    description: (
      <>
        In this part, I’m going to show a picture and ask you three questions.
        You will have <strong>1 minute</strong> to think about your answers
        before you start speaking. You will have <strong>2 minutes</strong> to
        answer all three questions.
      </>
    ),
    nextRoute: "/session/speaking/test/4/question/1",
  },
};

export default speakingPartData;
