import { useState } from "react";

const EMAIL_API =
  "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services/send-guide-email";

export default function useSendGuideEmail() {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const sendGuideEmail = async ({
    email,
    downloadUrl,
    referenceNo,
    serviceName,
    residentName,
  }) => {
    try {
      setSendingEmail(true);
      setEmailError("");
      setEmailSent(false);

      const res = await fetch(EMAIL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          downloadUrl,
          referenceNo,
          serviceName,
          residentName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to send email");
      }

      setEmailSent(true);
      return data;
    } catch (err) {
      console.error(err);
      setEmailError(err.message);
      return null;
    } finally {
      setSendingEmail(false);
    }
  };

  return {
    sendingEmail,
    emailError,
    emailSent,
    sendGuideEmail,
  };
}