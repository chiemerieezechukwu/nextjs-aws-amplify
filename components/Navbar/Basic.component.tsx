import tw from "twin.macro";
import { Disclosure } from "@headlessui/react";
import styled, { StyledComponent } from "@emotion/styled";
import { Theme } from "@emotion/react";
import { ElementType, DetailedHTMLProps, HTMLAttributes } from "react";

type StyledDisclosureType = StyledComponent<
  {
    theme?: Theme | undefined;
    as?: ElementType<any> | undefined;
  },
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  {}
>;

const StyledDisclosure: StyledDisclosureType = styled(Disclosure)(tw`
  fixed top-0 left-0 w-full z-10
`);

const Container = styled.div(tw`
	mx-auto px-2 
`);

const Content = styled.div(tw`
	relative flex items-center justify-between h-16
`);

export function Basic() {
  return (
    <StyledDisclosure as="nav">
      <Container>
        <Content>Basic Navbar</Content>
      </Container>
    </StyledDisclosure>
  );
}
