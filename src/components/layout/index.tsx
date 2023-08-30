import { ReactNode } from "react";

const Layout = ({ children }: ILayout) => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      {children}
    </div>
  );
};

interface ILayout {
  children: ReactNode;
}

export default Layout;
