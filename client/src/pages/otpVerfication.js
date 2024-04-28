// import React, { useState } from "react";
// import { message } from "antd";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./EmailVerification.css";
// import { useNavigate } from "react-router-dom";

// const EmailVerification = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");

//   const setOtpValue = (e) => {
//     setOtp(e.target.value);
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     // console.log(otp);

//     if (otp === "") {
//       toast.error("OTP is required!", {
//         position: "top-center",
//       });
//     } else if (otp == localStorage.getItem("OTP")) {
//       const res = await fetch("/api/v1/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: localStorage.getItem("registereduser"),
//       });

//       const data = await res.json();
//       // console.log(data);

//       if (data.success == true) {
//         localStorage.removeItem("OTP");
//         localStorage.removeItem("registereduser");
//         navigate("/login");
//         setMessage("EMAIL verified successfully!");
//         // message.success("EMAIL verified successfully!");
//       } else {
//         toast.error("Invalid OTP", {
//           position: "top-center",
//         });
//       }
//     }
//   };

//   return (
//     <>
//       <section>
//         <div className="form_data">
//           <div className="form_heading">
//             <h1>Enter OTP to Verify Email</h1>
//           </div>

//           {message ? (
//             <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
//           ) : (
//             ""
//           )}
//           <form>
//             <div className="form_input">
//               <label htmlFor="otp">OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={setOtpValue}
//                 name="otp"
//                 id="otp"
//                 placeholder="Enter OTP"
//               />
//             </div>

//             <button className="btn" onClick={verifyOtp}>
//               Verify
//             </button>
//           </form>
//           <ToastContainer />
//         </div>
//       </section>
//     </>
//   );
// };

// export default EmailVerification;

// chatgpt code
// import React, { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./EmailVerification.css";
// import { useNavigate } from "react-router-dom";

// const EmailVerification = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState({
//     otp1: "",
//     otp2: "",
//     otp3: "",
//     otp4: "",
//     otp5: "",
//     otp6: "",
//   });
//   const [message, setMessage] = useState("");
//   const refs = {
//     otp1: useRef(null),
//     otp2: useRef(null),
//     otp3: useRef(null),
//     otp4: useRef(null),
//     otp5: useRef(null),
//     otp6: useRef(null),
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOtp({
//       ...otp,
//       [name]: value,
//     });
//   };

//   const handleBackspace = (e, currentRef, prevRef) => {
//     if (e.keyCode === 8 && !currentRef.current.value) {
//       prevRef.current.focus();
//     }
//   };

//   useEffect(() => {
//     const focusNextInput = (currentRef, nextRef) => {
//       if (currentRef.current.value && currentRef.current.value.length === 1) {
//         nextRef.current.focus();
//       }
//     };

//     focusNextInput(refs.otp1, refs.otp2);
//     focusNextInput(refs.otp2, refs.otp3);
//     focusNextInput(refs.otp3, refs.otp4);
//     focusNextInput(refs.otp4, refs.otp5);
//     focusNextInput(refs.otp5, refs.otp6);
//   }, [otp]);

//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     const fullOtp = `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}${otp.otp5}${otp.otp6}`;

//     if (fullOtp === "") {
//       toast.error("OTP is required!", {
//         position: "top-center",
//       });
//     } else if (fullOtp === localStorage.getItem("OTP")) {
//       const res = await fetch("/api/v1/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: localStorage.getItem("registereduser"),
//       });

//       const data = await res.json();

//       if (data.success === true) {
//         localStorage.removeItem("OTP");
//         localStorage.removeItem("registereduser");
//         navigate("/login");
//         setMessage("EMAIL verified successfully!");
//       } else {
//         toast.error("Invalid OTP", {
//           position: "top-center",
//         });
//       }
//     }
//   };

//   return (
//     <>
//       <section>
//         <div className="form_data">
//           <div className="form_heading">
//             <h1>Enter OTP to Verify Email</h1>
//           </div>

//           {message ? <p className="success-message">{message}</p> : ""}

//           <form>
//             <div className="form_input otp-input-container">
//               <label htmlFor="otp">OTP</label>
//               <div className="otp-input-group">
//                 <input
//                   ref={refs.otp1}
//                   type="text"
//                   value={otp.otp1}
//                   onChange={handleChange}
//                   onKeyDown={(e) => handleBackspace(e, refs.otp1, refs.otp1)}
//                   name="otp1"
//                   maxLength={1}
//                   className="otp-input"
//                 />
//                 <input
//                   ref={refs.otp2}
//                   type="text"
//                   value={otp.otp2}
//                   onChange={handleChange}
//                   onKeyDown={(e) => handleBackspace(e, refs.otp2, refs.otp1)}
//                   name="otp2"
//                   maxLength={1}
//                   className="otp-input"
//                 />
//                 <input
//                   ref={refs.otp3}
//                   type="text"
//                   value={otp.otp3}
//                   onChange={handleChange}
//                   onKeyDown={(e) => handleBackspace(e, refs.otp3, refs.otp2)}
//                   name="otp3"
//                   maxLength={1}
//                   className="otp-input"
//                 />
//                 <input
//                   ref={refs.otp4}
//                   type="text"
//                   value={otp.otp4}
//                   onChange={handleChange}
//                   onKeyDown={(e) => handleBackspace(e, refs.otp4, refs.otp3)}
//                   name="otp4"
//                   maxLength={1}
//                   className="otp-input"
//                 />
//                 <input
//                   ref={refs.otp5}
//                   type="text"
//                   value={otp.otp5}
//                   onChange={handleChange}
//                   onKeyDown={(e) => handleBackspace(e, refs.otp5, refs.otp4)}
//                   name="otp5"
//                   maxLength={1}
//                   className="otp-input"
//                 />
//                 <input
//                   ref={refs.otp6}
//                   type="text"
//                   value={otp.otp6}
//                   onChange={handleChange}
//                   onKeyDown={(e) => handleBackspace(e, refs.otp6, refs.otp5)}
//                   name="otp6"
//                   maxLength={1}
//                   className="otp-input"
//                 />
//               </div>
//             </div>

//             <button className="btn" onClick={verifyOtp}>
//               Verify
//             </button>
//           </form>
//           <ToastContainer />
//         </div>
//       </section>
//     </>
//   );
// };

// export default EmailVerification;

import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EmailVerification.css";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const refs = {
    otp1: useRef(null),
    otp2: useRef(null),
    otp3: useRef(null),
    otp4: useRef(null),
    otp5: useRef(null),
    otp6: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      setOtp({
        ...otp,
        [name]: value,
      });
      setError("");
    } else {
      setError("Please enter digits only");
    }
  };

  const handleBackspace = (e, currentRef, prevRef) => {
    if (e.keyCode === 8 && !currentRef.current.value) {
      prevRef.current.focus();
    }
  };

  useEffect(() => {
    const focusNextInput = (currentRef, nextRef) => {
      if (currentRef.current.value && currentRef.current.value.length === 1) {
        nextRef.current.focus();
      }
    };

    focusNextInput(refs.otp1, refs.otp2);
    focusNextInput(refs.otp2, refs.otp3);
    focusNextInput(refs.otp3, refs.otp4);
    focusNextInput(refs.otp4, refs.otp5);
    focusNextInput(refs.otp5, refs.otp6);
  }, [otp]);

  const verifyOtp = async (e) => {
    e.preventDefault();

    const fullOtp = `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}${otp.otp5}${otp.otp6}`;

    if (fullOtp === "") {
      toast.error("OTP is required!", {
        position: "top-center",
      });
    } else if (fullOtp === localStorage.getItem("OTP")) {
      const res = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: localStorage.getItem("registereduser"),
      });

      const data = await res.json();

      if (data.success === true) {
        localStorage.removeItem("OTP");
        localStorage.removeItem("registereduser");
        navigate("/login");
        toast.success("Email verification successful!", {
          position: "top-center",
        });
        // setMessage("EMAIL verified successfully!");
      } else {
        toast.error("Invalid OTP", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter OTP to Verify Email</h1>
          </div>

          {message ? <p className="success-message">{message}</p> : ""}
          {error && <p className="error-message">{error}</p>}

          <form>
            <div className="form_input otp-input-container">
              <label htmlFor="otp">OTP</label>
              <div className="otp-input-group">
                <input
                  ref={refs.otp1}
                  type="text"
                  value={otp.otp1}
                  onChange={handleChange}
                  onKeyDown={(e) => handleBackspace(e, refs.otp1, refs.otp1)}
                  name="otp1"
                  maxLength={1}
                  pattern="\d"
                  className="otp-input"
                />
                <input
                  ref={refs.otp2}
                  type="text"
                  value={otp.otp2}
                  onChange={handleChange}
                  onKeyDown={(e) => handleBackspace(e, refs.otp2, refs.otp1)}
                  name="otp2"
                  maxLength={1}
                  pattern="\d"
                  className="otp-input"
                />
                <input
                  ref={refs.otp3}
                  type="text"
                  value={otp.otp3}
                  onChange={handleChange}
                  onKeyDown={(e) => handleBackspace(e, refs.otp3, refs.otp2)}
                  name="otp3"
                  maxLength={1}
                  pattern="\d"
                  className="otp-input"
                />
                <input
                  ref={refs.otp4}
                  type="text"
                  value={otp.otp4}
                  onChange={handleChange}
                  onKeyDown={(e) => handleBackspace(e, refs.otp4, refs.otp3)}
                  name="otp4"
                  maxLength={1}
                  pattern="\d"
                  className="otp-input"
                />
                <input
                  ref={refs.otp5}
                  type="text"
                  value={otp.otp5}
                  onChange={handleChange}
                  onKeyDown={(e) => handleBackspace(e, refs.otp5, refs.otp4)}
                  name="otp5"
                  maxLength={1}
                  pattern="\d"
                  className="otp-input"
                />
                <input
                  ref={refs.otp6}
                  type="text"
                  value={otp.otp6}
                  onChange={handleChange}
                  onKeyDown={(e) => handleBackspace(e, refs.otp6, refs.otp5)}
                  name="otp6"
                  maxLength={1}
                  pattern="\d"
                  className="otp-input"
                />
              </div>
            </div>

            <button className="btn" onClick={verifyOtp}>
              Verify
            </button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default EmailVerification;
