import { Router, request } from "express";
const router = Router();
const companys = require("../model/company");
const intern = require("../model/intern");
const Question = require("../model/Questions");
const adminapply = require("../model/adminapplication");
const application = require("../model/apply");
import crypto from "crypto";
import nodemailer from "nodemailer";

import { Request, Response, NextFunction } from "express";
import { SendMailOptions } from "nodemailer";
const {
  validate,
  registervalidation,
  loginvalidation,
  internvalidation,
} = require("../validations/company");

//company register process
router.post(
  "/register",
  validate(registervalidation),
  async (req: Request, res: Response, next: NextFunction) => {
    const { companyname, role, email, password } = req.body;

    try {
      // Check if the email already exists
      const checkEmail = await companys.findOne({ email });

      if (checkEmail) {
        // If email exists, return a response immediately
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      // If email doesn't exist, proceed to create a new user
      const company = await companys.create({
        companyname,
        role,
        email,
        password,
      });

      if (company) {
        res.status(201).json({
          success: true,
          message: "Successfully created",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// Temporary store for OTP (use a database in production)
let otpStore: { [email: string]: string } = {};

// Set up email transporter (use your own SMTP service provider like Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 587 if using TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: "cse.takeoff@gmail.com",
    pass: "digkagfgyxcjltup", // Replace with the App Password
  },
});

// Generate OTP function
function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 6-digit OTP
  return otp.toString();
}

// Login route
router.post(
  "/login",
  validate(loginvalidation),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      // Use findOne method to find a user by email
      const checkUser = await companys.findOne({ email });

      // Check if a user with the provided email exists
      if (!checkUser) {
        res.status(400).json({
          success: false,
          message: "Invalid email",
        });
      } else {
        // Check if the provided password is valid (use your existing password validation method)
        const isPasswordValid = await checkPassword(
          password,
          checkUser.password
        );

        if (isPasswordValid) {
          // Generate OTP and store it temporarily
          const otp = generateOTP();
          otpStore[email] = otp; // Store OTP temporarily (use DB in production)
          console.log(otp);
          

          // Send OTP via email
          const mailOptions = {
            from: '"Company" <cse.takeoff@gmail.com>', // Ensure it's the authenticated email
            to: email,
            subject: "Your OTP Code for Login",
            text: `Your OTP code is: ${otp}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "Failed to send OTP",
                error,
              });
            }

            // Inform user to check email for OTP
            return res.status(200).json({
              success: true,
              message:
                "Login successful. OTP sent to your email for verification.",
              checkUser,
            });
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Invalid password",
          });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// OTP verification route
router.post(
  "/verify-otp",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    try {
      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required",
        });
      }

      const storedOtp = otpStore[email];

      if (storedOtp === otp) {
        // OTP is correct, login successful
        delete otpStore[email]; // Clear OTP after successful verification
        res.status(200).json({
          success: true,
          message: "OTP verified successfully. Login complete.",
        });
      } else {
        // OTP is incorrect
        res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

router.get(
  "/profile/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const company = await companys.findById(id);

      if (company) {
        res.status(200).json({
          success: true,
          company,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "something wrong try after some time",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

router.put(
  "/profile/:id",
  validate(registervalidation),
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const { name, email, password, phone, address } = req.body;

    try {
      const company = await companys.findById(id);

      if (company) {
        res.status(200).json({
          success: true,
          company,
        });
      }

      const { companyname, role, email, password } = req.body;

      const update = await companys.findByIdAndUpdate(
        id,
        {
          companyname,
          role,
          email,
          password,
        },
        { new: true }
      );
      if (update) {
        res.status(200).json({
          success: true,
          update,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "something wrong try after some time",
        });
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

//company forgot password
router.put(
  "/forgot",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const checkemail = await companys.findOne({ email: email });
      if (!checkemail) {
        res.status(404).json({
          success: false,
          message: "email is not found",
        });
      } else {
        await companys.findByIdAndUpdate(checkemail._id, {
          password,
        });
        res.status(200).json({
          success: true,

          message: "update succefully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//post the internship with company id
// router.post(
//   "/intern/:id",
//   validate(internvalidation),
//   async (req: Request, res: Response, next: NextFunction) => {
//     const companyid = req.params.id;

//     try {
//       const checkcompany = await companys.findById(companyid);
//       if (!checkcompany) {
//         res.status(404).json({
//           success: true,
//           message: "id not found",
//         });
//       }
//       const {
//         title,
//         companyname,
//         experience,
//         salary,
//         location,
//         time,
//         opening,
//         description,
//         Shifts,
//         role,
//         Industry_Type,
//         Department,
//         Employment_Type,
//         Education,
//         Key_Skills,
//         Address,
//       } = req.body;
//       const newintern = await intern.create({
//         title,
//         companyname,
//         experience,
//         salary,
//         location,
//         time,
//         opening,
//         description,
//         Shifts,
//         role,
//         Industry_Type,
//         Department,
//         Employment_Type,
//         Education,
//         Key_Skills,
//         Address,
//         company: companyid,
//       });

//       if (newintern) {
//         res.status(201).json({
//           success: true,
//           newintern,
//         });
//       } else {
//         res.status(400).json({
//           success: false,
//           message: "invalid credentials",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         sccess: false,
//         message: "internal server error",
//       });
//     }
//   }
// );
// Post the internship with company ID
router.post(
  "/intern/:id",
  validate(internvalidation),
  async (req: Request, res: Response, next: NextFunction) => {
    const companyid = req.params.id;

    try {
      const checkcompany = await companys.findById(companyid);
      if (!checkcompany) {
        res.status(404).json({
          success: true,
          message: "id not found",
        });
      }
      const {
        title,
        companyname,
        experience,
        salary,
        location,
        time,
        opening,
        description,
        Shifts,
        status,
        role,
        Industry_Type,
        Department,
        Employment_Type,
        Education,
        Key_Skills,
        Address,
        jobtype, // Add jobtype here
      } = req.body;

      const newintern = await intern.create({
        title,
        companyname,
        experience,
        salary,
        location,
        time,
        opening,
        description,
        Shifts,
        role,
        Industry_Type,
        Department,
        Employment_Type,
        status,
        Education,
        Key_Skills,
        Address,
        jobtype, // Add jobtype to the created intern
        company: companyid,
      });

      if (newintern) {
        res.status(201).json({
          success: true,
          newintern,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "invalid credentials",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//get the total internship with company id
router.get(
  "/intern/:companyid",
  async (req: Request, res: Response, NextFunction: NextFunction) => {
    const companyid = req.params.companyid;
    try {
      const company = await companys.findById(companyid);
      if (!company) {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }
      const userprofile = await intern.find({ company: companyid });
      if (userprofile) {
        res.status(200).json({
          success: true,
          job: userprofile,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//
router.get(
  "/intern/:companyid/:internid",
  async (req: Request, res: Response, NextFunction: NextFunction) => {
    const { companyid, internid } = req.params;
    try {
      const company = await companys.findById(companyid);
      if (!company) {
        res.status(404).json({
          sucess: false,
          message: "no company find in this id",
        });
      }
      const interns = await intern.findById(internid);
      if (interns) {
        res.status(200).json({
          sucess: true,
          interns,
        });
      } else {
        res.status(404).json({
          sucess: false,
          message: "no intern find in this id",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//update the internship
router.put(
  "/intern/:companyid/:internid",
  async (req: Request, res: Response, NextFunction: NextFunction) => {
    const { companyid, internid } = req.params;
    try {
      const company = await companys.findById(companyid);
      if (!company) {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }

      const {
        title,
        companyname,
        experience,
        salary,
        location,
        time,
        opening,
        description,
        Shifts,
        role,
        Industry_Type,
        Department,
        Employment_Type,
        Education,
        Key_Skills,
        Address,
      } = req.body;
      const userprofile = await intern.findByIdAndUpdate(internid, {
        title,
        companyname,
        experience,
        salary,
        location,
        time,
        opening,
        description,
        Shifts,
        role,
        Industry_Type,
        Department,
        Employment_Type,
        Education,
        Key_Skills,
        Address,
      });
      if (userprofile) {
        res.status(200).json({
          success: true,
          job: userprofile,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//delete interndhi by company id
router.delete(
  "/intern/:companyid/:internid",
  async (req: Request, res: Response, NextFunction: NextFunction) => {
    const { companyid, internid } = req.params;
    try {
      const company = await companys.findById(companyid);
      if (!company) {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }

      const userprofile = await intern.findByIdAndDelete(internid);
      if (userprofile) {
        res.status(200).json({
          success: true,
          message: "successfully deleted",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//curd operation for the internship

//get the all intership

router.put(
  "/intern/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const job = await intern.findById(id);
      if (job) {
        const {
          title,
          companyname,
          experience,
          salary,
          location,
          time,
          opening,
          description,
          Shifts,
          role,
          Industry_Type,
          Department,
          Employment_Type,
          Education,
          Key_Skills,
          Address,
        } = req.body;
        const upjob = await intern.findByIdAndUpdate(id, {
          title,
          companyname,
          experience,
          salary,
          location,
          time,
          opening,
          description,
          Shifts,
          role,
          Industry_Type,
          Department,
          Employment_Type,
          Education,
          Key_Skills,
          Address,
        });
        if (upjob) {
          res.status(201).json({
            success: true,
            message: "update sucessfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "bad request",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "intern not found in this id",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

router.delete(
  "/intern/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const job = await intern.findByIdAndDelete(id);
      if (job) {
        res.status(200).json({
          success: true,
          message: "delete successfully",
        });
      } else {
        res.status(404).json({
          sucess: false,
          message: "intern not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

//section-D

//company get the our apply internship
router.get(
  "/application/:companyid",
  async (req: Request, res: Response, next: NextFunction) => {
    const companyid = req.params.companyid;
    try {
      const company = await companys.findById(companyid);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "No company found with this ID",
        });
      }

      const interns = await intern.find({ company: companyid });

      const internIds = interns.map((item: any) => item._id);

      const internships = await application.find({
        intern: { $in: internIds },
      }); // Use $in to query for multiple intern IDs

      if (internships && internships.length > 0) {
        const filteredInternships = internships.filter(
          (item: any) => item.status === true
        );

        if (filteredInternships.length > 0) {
          return res.status(200).json({
            success: true,
            internship: filteredInternships,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "No active internships found for this company",
          });
        }
      } else {
        return res.status(200).json({
          success: false,
          message: "No internships found for this company",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

router.get(
  "/student/:companyid/:internid",
  async (req: Request, res: Response, next: NextFunction) => {
    const { companyid, internid } = req.params;
    try {
      const company = await companys.findById(companyid);
      if (!company) {
        res.status(400).json({
          success: false,
          message: "no company in this id",
        });
      }
      const internship = await application.find({ intern: internid });
      if (internship && internship.length > 0) {
        const applications = await internship.filter(
          (item: any) => item.status === true
        );
        if (applications) {
          res.status(200).json({
            success: true,
            internship,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "No Application found",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "No Application found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }
  }
);

router.post(
  "/gmail/:companyid/:applicationId",
  async (req: Request, res: Response) => {
    const { companyid, applicationId } = req.params;

    const company = await companys.findById(companyid);
    if (!company) {
      res.status(400).json({
        success: false,
        message: "no company in this id",
      });
    }
    const applications = await application.findById(applicationId);
    const email = await application.email;

    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // replace with your Gmail email
        pass: "", // replace with your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: "", // replace with your Gmail email
      to: email,
      subject: "",
      text: "",
    };

    // Sending the email
    try {
      // Sending the email using async/await
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      res.status(200).json({
        success: true,
        message: "Mail sent successfully",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }
  }
);

// Recruiter can add Questions
router.post("/addQuestions/:id", async (req: Request, res: Response) => {
  const internId = req.params.id;
  const { questions } = req.body;

  try {
    // Check if the internship exists
    const internship = await intern.findById(internId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Check if questions already exist for this internship
    let questionSet = await Question.findOne({ internId });

    if (questionSet) {
      // // If questions exist, update them
      // questionSet.questions = questions;
      // await questionSet.save();
      return res.status(400).json({
        success: false,
        message: "Questions already exist for this internship",
      });
    } else {
      // If no questions exist, create a new set
      questionSet = new Question({
        internId,
        questions,
      });
      await questionSet.save();
    }

    res.status(200).json({
      success: true,
      message: "Questions added successfully",
      data: questionSet,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add questions",
      error: error.message,
    });
  }
});

async function checkPassword(
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> {
  // Replace this with your actual password checking logic, for example, using bcrypt
  return enteredPassword === savedPassword;
}

module.exports = router;
