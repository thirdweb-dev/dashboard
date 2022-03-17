import { useWeb3 } from "@3rdweb/hooks";
import { Container, Flex, Stack } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { AppLayout } from "components/app-layouts/app";
import { Resources } from "components/ftux/Resources";
import { FTUXChooseNetworkStep } from "components/ftux/steps/choose-network";
import { FTUXConnectWalletStep } from "components/ftux/steps/connect-wallet";
import { FTUXCreateProject } from "components/ftux/steps/create-project";
import { FTUXWelcomeStep } from "components/ftux/steps/welcome";
import { Logo } from "components/logo";
import { useTrack } from "hooks/analytics/useTrack";
import { useConnectedWalletAndUserHasProjectAlreadyRedirectsPastOnboardingFlowToOverviewProjectPage } from "hooks/useConnectedWalletAndUserHasProjectAlreadyRedirectsPastOnboardingFlowToOverviewProjectPage";
import React, { useEffect, useMemo } from "react";
import { ConsolePage } from "../_app";

export interface FTUXStepProps {
  onNext?: () => void;
  onPrev?: () => void;
}

const StartPage: ConsolePage = () => {
  // Author: Adam Majmudar - Hello anyone seeing my beautiful creation
  useConnectedWalletAndUserHasProjectAlreadyRedirectsPastOnboardingFlowToOverviewProjectPage();
  const { Track } = useTrack({ page: "start" });
  const { address } = useWeb3();

  const steps: Array<{ label: string; content: React.FC<FTUXStepProps> }> =
    useMemo(
      () => [
        { label: "Welcome", content: FTUXWelcomeStep },
        { label: "Connect Wallet", content: FTUXConnectWalletStep },
        { label: "Choose Network", content: FTUXChooseNetworkStep },
        { label: "Create Project", content: FTUXCreateProject },
      ],
      [],
    );
  const { nextStep, setStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    if (address && activeStep === 0) {
      setStep(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Track>
      <Container
        maxW="container.page"
        py={10}
        display="flex"
        flexDir="column"
        minHeight="100vh"
      >
        <Flex
          align="center"
          direction="column"
          justify="space-between"
          height="100%"
          flexGrow={1}
        >
          <Stack align="center" spacing={10}>
            <Logo />
            <Steps responsive={false} activeStep={activeStep}>
              {steps.map((step) => (
                <Step key={step.label}>
                  {step.content({ onNext: nextStep, onPrev: prevStep })}
                </Step>
              ))}
            </Steps>
          </Stack>
          <Resources />
        </Flex>
      </Container>
    </Track>
  );
};

StartPage.Layout = AppLayout;

export default StartPage;
