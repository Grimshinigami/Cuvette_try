import twilio from 'twilio'

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

const sendMssg = async(obj) =>{
    try {
        const message = await client.messages.create({
            body: obj.message,
            from: "+18606154055",
            to: obj.number,
          });
        console.log(message);
        
    } catch (error) {
        console.log("Error in sending message: ",error)
    }
}

export {
    sendMssg
}