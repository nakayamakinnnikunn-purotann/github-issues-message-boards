import type { AppProps } from 'next/app'
import { AppShell, Header, MantineProvider, Title } from '@mantine/core'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        header={
          <Header height={70} p="sm">
            <Title>掲示板</Title>
          </Header>
        }
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  )
}
