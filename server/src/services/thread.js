import Topic from "../models/topic.js";

async function createNewTopic({ title, content, createdBy }) {
  const data = new Topic({ title, content, createdBy });
  // console.log(data);
  return await data.save();
}

async function getAllTopic() {
  const data = await Topic.find({}).populate({
    path: "createdBy",
    select: "-password -createdAt -updatedAt -__v -role",
  });
  console.log(data);
  return data;
}

export default { createNewTopic, getAllTopic };
