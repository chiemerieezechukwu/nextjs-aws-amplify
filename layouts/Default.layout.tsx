import styled from "@emotion/styled";
import tw from "twin.macro";
import { Navbar } from "~/components";
import { WithChildren } from "~/types";

const Main = styled.main(
  tw`flex flex-col items-center justify-center px-8 min-h-screen`
);

export function DefaultLayout({ children }: WithChildren) {
  return (
    <>
      <Navbar.Standard />
      <Main>{children}</Main>
    </>
  );
}
