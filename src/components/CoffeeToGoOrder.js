import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CoffeeToGoOrder = ({ setMessage }) => {
  const initialValues = {
    coffeeCode: "",
  };

  const validationSchema = Yup.object().shape({
    coffeeCode: Yup.number()
      .typeError("Enter a number")
      .min(1, "Enter number larger than zero")
      .integer("Enter whole number")
      .required("You must enter the value"),
  });

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8080/barman/coffee-to-go/${data.coffeeCode}`)
      .then((response) => setMessage(response.data))
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  return (
    <div className="mt-3">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col w-52">
          <label>Order coffee to go:</label>
          <ErrorMessage
            name="coffeeCode"
            component="span"
            className="text-red-500 italic text-sm ml-1 pb-1"
          />
          <Field
            name="coffeeCode"
            placeholder="Enter coffee code"
            className="rounded-md px-2 py-2 bg-[#f9f9f9] shadow-md"
          />

          <button
            type="submit"
            className="bg-orange-900/70 hover:bg-orange-900/80 rounded-md p-2 text-white mt-2 w-1/2 self-center"
          >
            Place order
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CoffeeToGoOrder;
