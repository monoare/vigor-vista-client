import { useParams } from "react-router-dom";
import { ContactUs } from "../../shared/ContactUs";

const SendEmail = () => {
  const { email, name } = useParams();
  return (
    <div>
      <p className="text-3xl text-center font-semibold my-10">
        Email Notification
      </p>
      <p className="text-xl text-center my-10">
        Please write down the reason of rejection
      </p>
      <ContactUs email={email} name={name} />
    </div>
  );
};

export default SendEmail;
