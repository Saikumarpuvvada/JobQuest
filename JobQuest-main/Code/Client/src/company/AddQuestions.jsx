import React, { useState } from "react";
import CompanyNav from "./CompanyNav";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";

const AddQuestions = () => {
  const [questions, setQuestions] = useState([
    { questionText: "", answer: "", marks: "" },
  ]);
  const compId = sessionStorage.getItem("compId");

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", answer: "", marks: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosapi.get(`/company/application/${compId}`);
      console.log(res.data?.internship, "ress");
      console.log(questions);

      questions?.forEach((item) => {
        item.marks = parseInt(item.marks);
      });

      if (res.data?.internship?.length === 0) {
        alert("No applications received yet");
        return;
      }

      for (let i of res.data?.internship) {
        const data = { questions };
        console.log(i._id);
        const response = await axiosapi.post(
          `company/addQuestions/${i.intern}`,
          data
        );
        console.log(response, "questions added");
      }
      toast.success("Questions added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="pt-20 container mx-auto px-4">
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
          <h3 className="text-xl font-semibold">Add Questions</h3>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {questions.map((item, index) => (
            <div key={index} className="space-y-4 border-b pb-4">
              <div>
                <label htmlFor={`question-${index}`} className="block text-gray-700 font-medium mb-1">
                  Question
                </label>
                <input
                  type="text"
                  id={`question-${index}`}
                  name="questionText"
                  value={item.questionText}
                  placeholder="Enter question"
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor={`answer-${index}`} className="block text-gray-700 font-medium mb-1">
                  Answer
                </label>
                <input
                  type="text"
                  id={`answer-${index}`}
                  name="answer"
                  value={item.answer}
                  placeholder="Enter answer"
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor={`marks-${index}`} className="block text-gray-700 font-medium mb-1">
                  Marks
                </label>
                <input
                  type="number"
                  id={`marks-${index}`}
                  name="marks"
                  value={item.marks}
                  placeholder="Enter marks"
                  onChange={(event) => handleChange(index, event)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          ))}
          <hr className="my-6" />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;