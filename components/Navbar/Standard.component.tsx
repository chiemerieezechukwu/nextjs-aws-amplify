import tw from "twin.macro";
import { Disclosure } from "@headlessui/react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import { ElementType } from "react";
import { WithChildren, WithProps } from "~/types";

type StyledDisclosureProps = WithChildren &
  WithProps<typeof Disclosure> & {
    theme?: Theme | undefined;
    as?: ElementType<any> | undefined;
  };

const StyledDisclosure = styled(Disclosure)<
  Pick<StyledDisclosureProps, "as" | "children" | "theme">
>(tw`
  fixed top-0 left-0 w-full z-10
`);

const Container = styled.div(tw`
	mx-auto px-2 
`);

const Content = styled.div(tw`
	relative flex items-center justify-between h-16
`);

export function Standard() {
  return (
    <StyledDisclosure as="nav">
      <Container>
        <Content>Standard Navbar</Content>
      </Container>
    </StyledDisclosure>
  );
}
