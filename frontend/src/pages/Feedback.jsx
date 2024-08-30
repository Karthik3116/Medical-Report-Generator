import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loading from "./Loading";
import "../styles/feedback.scss"

const Feedback = () => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [feedbacktext, setfeedbacktext] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("feedback", feedbacktext);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/webfeedback",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setemail("");
      setname("");
      setfeedbacktext("");
      toast.success("Feedback sent successfully");
      console.log("Response from server:", response.data);
    } catch (error) {
      toast.error("Error sending Feedback");
      console.error("Error sending Feedback:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateName = (e) => {
    setname(e.target.value);
    console.log(e.target.value);
  };
  const updateemail = (e) => {
    setemail(e.target.value);
    console.log(e.target.value);
  };
  const updatefeedback = (e) => {
    setfeedbacktext(e.target.value);
    console.log(e.target.value);
  };
//   if (loading) {
//     return <Loading />
//   }
  return (
    <>
      <div className="Feedback">
        <main>
          <h1 id="feedbacktitle">Feedback</h1>
          <h6 id="feedbacktext">
            We value your feedback! Your insights help us improve our services
            and make your experience on Telangana's highways Safer
          </h6>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name"
                value={name}
                onChange={updateName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="name@example.com"
                value={email}
                onChange={updateemail}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Feedback
              </label>
              <textarea
                className="form-control"
                placeholder="enter you query here..."
                id="exampleFormControlTextarea1"
                rows="3"
                value={feedbacktext}
                onChange={updatefeedback}
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default Feedback;