import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { AlertProvider } from "~/contexts/AlertProvider";

Amplify.configure({
  Auth: {
    region: "eu-central-1", // TODO make this configurable
    userPoolId: "eu-central-1_pYusvM5KP",
    userPoolWebClientId: "6rtceplgsg7hjghgiupikq6lr2",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // TODO: Container here
    <div>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </div>
  );
}

export default MyApp;
