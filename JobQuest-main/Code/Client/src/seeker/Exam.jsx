import React, { useEffect, useRef, useState } from "react";
import UserNav from "./UserNav";
import { useNavigate, useParams } from "react-router-dom";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";

const Exam = () => {
  const [questions, setQuestions] = useState([
    { questionId: "", questionText: "" },
  ]);
  const { id } = useParams();
  const Userid = sessionStorage.getItem("user");
  const Id = JSON.parse(Userid)._id;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [showMarks, setShowMarks] = useState(false);

  const fetchAllQuestions = async () => {
    try {
      const res = await axiosapi.get(`/user/get/questions/${id}`);
      setQuestions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleCopyPaste = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = [];
      for (let i of questions) {
        const questionId = i.questionId;
        const submittedAnswer = i.answer;
        data.push({ questionId, submittedAnswer });
      }

      const result = await axiosapi.post(
        `/user/students/answers/${Id}/${id}`,
        { answers: data }
      );
      toast.success("Answers submitted successfully");
      setShowModal(true);
      setQuestions([{ questionId: "", questionText: "", answer: "" }]);
      setShowMarks(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam</h2>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div
                  ref={modalRef}
                  className="bg-ghostwhite rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">
                      Exam Submitted
                    </h1>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mb-4">
                    {showMarks ? (
                      <div>
                        <p className="text-gray-700">
                          You have obtained{" "}
                          <strong className="text-blue-600 font-bold">
                            {showMarks?.totalMarks}
                          </strong>{" "}
                          marks.
                        </p>
                        <p className="text-gray-700">Thank you for participating!</p>
                      </div>
                    ) : (
                      <p className="text-gray-700">Loading...</p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/userhome")}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Questions */}
            {questions.map((item, index) => (
              <div key={index} className="mb-6">
                <h5 className="text-lg font-medium text-gray-800 mb-2">
                  <span className="mr-2">Q {index + 1})</span> {item.questionText}
                </h5>
                <input
                  type="text"
                  id={`answer-${index}`}
                  name="answer"
                  value={item.answer || ""}
                  placeholder="Enter your answer"
                  onChange={(event) => handleChange(index, event)}
                  onCopy={handleCopyPaste}
                  onPaste={handleCopyPaste}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <hr className="my-4" />
              </div>
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Exam;