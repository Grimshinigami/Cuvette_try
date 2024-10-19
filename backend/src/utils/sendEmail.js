import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS
    }
})

transporter.verify((error, success)=>{
    if(error){
        console.log("Error in verifying SMTP",error);
    } else {
        console.log("Ready for messages: ",success)
    }
})

const sendMail = async(mailoptions) => {
    try {
        await transporter.sendMail(mailoptions);
    } catch (error) {
        console.log("Error in sending mail",error);
    }
}

export {
    sendMail
}