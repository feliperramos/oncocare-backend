import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

interface MailTrapTransporter {
  host: string;
}

dotenv.config();

const host: string = process.env.NODEMAILER_HOST!;
const port: string = process.env.NODEMAILER_PORT!;
const user: string = process.env.NODEMAILER_USERNAME!;
const pass: string = process.env.NODEMAILER_PASSWORD!;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
} as MailTrapTransporter);

export default transport;
