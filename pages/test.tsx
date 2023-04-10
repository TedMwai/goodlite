import React from "react";
import { GetServerSideProps } from "next";
import { getSession, Session } from "@auth0/nextjs-auth0";
import Modal from "@/components/checkout/modal/Modal";

type TestProps = {
  session: Session | null;
};

const Test = ({ session }: TestProps) => {
  console.log(session);
  return (
    <div>
      <div>
        <Modal />
      </div>
    </div>
  );
};

export default Test;

export const getServerSideProps: GetServerSideProps<TestProps> = async (
  context
) => {
  const session = await getSession(context.req, context.res);
  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }
  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
};
