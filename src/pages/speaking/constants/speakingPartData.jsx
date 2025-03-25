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
    nextRoute: "/speaking/part/1/question/1",
  },
  2: {
    title: "Part 2",
    description: (
      <>
        In this part, I’m going to ask you to describe a picture. Then I will
        ask you two questions about it. You will have 45 seconds for each
        response.
      </>
    ),
    caution:
      "You have 5 seconds to read each question, then the system will start recording. ",
    nextRoute: "/speaking/part/2/question/1",
  },
  3: {
    title: "Part 3",
    description:
      "You will answer questions related to the topic in Part 2 and discuss them in more detail.",
    nextRoute: "/speaking/part/3/question/1",
  },
  4: {
    title: "Part 4",
    description:
      "This is the last question of the speaking test. Give your best answer!",
    nextRoute: "/speaking/part/4/question/1",
  },
};

export default speakingPartData;
