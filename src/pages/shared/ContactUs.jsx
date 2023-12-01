import { useRef } from "react";
import emailjs from "@emailjs/browser";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

export const ContactUs = ({ email, name }) => {
  const { user } = useAuth();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e.target.fromvalue);
    emailjs
      .sendForm(
        import.meta.env.VITE_Service_ID,
        import.meta.env.VITE_Template_ID,
        form.current,
        import.meta.env.VITE_Public_key
      )
      .then(
        (result) => {
          console.log(result.text);
          if (result.text) {
            Swal.fire({
              title: "Good job!",
              text: "Email has been send!",
              icon: "success",
            });
          }
        },
        (error) => {
          if (error.text) {
            Swal.fire({
              title: "Something wrong!",
              text: `${error.text}`,
              icon: "success",
            });
          }
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sender Name:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          type="text"
          defaultValue={user.displayName}
          name="from_name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Receiver Name:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          defaultValue={name}
          type="text"
          name="to_name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email To:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          type="email"
          defaultValue={email}
          name="user_email"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea className="border rounded w-full py-2 px-3" name="message" />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};
