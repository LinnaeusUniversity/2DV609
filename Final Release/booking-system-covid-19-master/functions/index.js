const functions = require('firebase-functions');

const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const express = require('express');
const admin = require("firebase-admin");

admin.initializeApp();
const app = express();
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


exports.sendEmailNotification = functions.firestore
  .document('booking/{userId}')
  .onCreate((snap, context) => {
    let data=snap.data();
    
    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "firebaseg4@gmail.com",
        pass: "VIP123456"
      }
    });

    transporter
      .sendMail({
        from:"admin.admin@gmail.com",
        to: `${data.email}`,
        subject: "booked Time",
        html: `
        <p>You have a new booking Time</p>
        <h3>Details</h3>
        <ul>  
          <li>Subject: ${data.subject}</li>
          <li>Time: ${data.time}</li>
          <li>Date: ${data.dat}</li>
          
        </ul>
        <h3>Message</h3>
        <p>Medical Appointement center</p>
      `
      })
      .then(res => console.log("sucessfully Sent!"))
      .catch(error => console.log(error));
  });