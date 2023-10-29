import { Html, Head, Main, NextScript } from 'next/document'
import { useTheme } from '@mui/material/styles';

export default function Document() {
  const theme = useTheme();
  return (
    <Html lang="en">
      <Head />
      <body style={{background: theme?.palette?.primary?.dark || "#161718"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
