const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const twilio = require('twilio'); 

// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
})

const accountSid = process.env.ACCSID;
const authToken = process.env.AUTTOK;
const frontend = twilio(accountSid, authToken);

exports.userregister = async (req, res) => {
    const { fname, email, number, password} = req.body;
    if (!fname || !email || !number || !password) {
        res.status(400).json({ error: "Please Enter All Input Data" });
        return;
    }

    try {
        const existingUser = await users.findOne({ email: email });
        
        if (existingUser) {
            res.status(400).json({ error: "This User Allready exist in our db" })
        } else {
            const userregister = new users({
                fname, email, number, password,
            });

            const storeData = await userregister.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }

};

// user send otp
exports.userOtpSend = async (req, res) => {
    try{
        console.log("got request for otp");
    const {email} = req.body;
    const user= await users.findOne({email})
    
    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }
    else{
        try {
            const presuer = await users.findOne({ email: email });
            if (presuer) {
                const OTP = Math.floor(100000 + Math.random() * 900000);

                const existEmail = await userotp.findOne({ email: email });


                if (existEmail) {
                    const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                        otp: OTP
                    }, { new: true }
                    );
                    await updateData.save();

                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Sending Email For Otp Validation",
                        text: `OTP:${OTP}`
                    }


                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log("error", error);
                            res.status(400).json({ error: "email not send" })
                        } else {
                            console.log("Email sent", info.response);
                            res.status(200).json({ message: "Email sent Successfully" })
                        }
                    })
                    await frontend.messages.create({
                        body: `Your OTP is: ${OTP}`,
                        to:"+919063492573",
                        from: process.env.TWINUM,
                    });

                } else {

                    const saveOtpData = new userotp({
                        email, otp: OTP
                    });

                    await saveOtpData.save();
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Sending Email For Otp Validation",
                        text: `OTP:- ${OTP}`,
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log("error at 115 ", error);
                            res.status(400).json({ error: "email not sent" })
                        } else {
                            console.log("Email sent", info.response);
                            res.status(200).json({ message: "Email sent Successfully" })
                        }
                    })
                }
            } else {
                res.status(400).json({ error: "This User Does Not Exist" })
            }
        } catch (error) {
            res.status(400).json({ error: "Invalid Details", error })
        }
    
    }
}catch(err){
    console.log("err", err);
}

};


exports.userLogin = async(req,res)=>{
    const { email, otp} = req.body;

    if(!otp || !(email )){
        res.status(400).json({ error: "Please Enter Your OTP and email and phone number" });
        return;
    }

    try {
        let otpverification;
        if (email) {
            otpverification = await userotp.findOne({ email: email });         
        } 

        if(otpverification && otpverification.otp === otp){
            let preuser;
            if (email) {
                preuser = await users.findOne({ email: email });
            } 
            // token generate
            const token = await preuser.generateAuthtoken();
           res.status(200).json({message:"User Login Succesfully Done",userToken:token});

        }else{
            res.status(400).json({error:"Invalid Otp"});
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error });
    }
};