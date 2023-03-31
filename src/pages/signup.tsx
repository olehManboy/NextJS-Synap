import React from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import RegisterForm from "@/components/elements/frontpage/RegisterForm";

const signup: React.FC = () => {
  return (
    <DefaultLayout>
      <FormLayout>
          <RegisterForm/>
      </FormLayout>
    </DefaultLayout>
  );
};

export default signup;
