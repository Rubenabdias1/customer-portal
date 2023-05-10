import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getSupabase } from "../utils/supabase";
import Link from "next/link";
import { useState } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface IndexProps {
  user: UserProfile;
  serverTodos: any[];
}

const Index = ({ user, serverTodos }: IndexProps) => {
  const [todos] = useState(serverTodos);

  return (
    <div>
      <p>
        Welcome {user?.name}! <Link href="/api/auth/logout">Logout</Link>
      </p>
      {todos?.length > 0
        ? todos.map((todo) => <p key={todo.id}>{`${todo.title}`}</p>)
        : "No Todos available"}
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const data = await getSession(req, res);

    if (data) {
      const {
        user: { accessToken },
      } = data;
      const supabase = getSupabase(accessToken);

      const { data: serverTodos } = await supabase.from("todo").select("*");

      return {
        props: { serverTodos },
      };
    }

    return {
      props: { serverTodos: [] },
    };
  },
});

export default Index;
