import { AppShell, Header, MantineProvider, Title } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        header={
          <Header height={70} p="sm">
            <Title>Message Boards</Title>
          </Header>
        }
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}
