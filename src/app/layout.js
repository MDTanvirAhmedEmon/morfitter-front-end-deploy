import { ConfigProvider } from "antd";
import "./globals.css";
import { mainTheme } from "@/theme/ant-theme";
import ReduxProviders from "@/utils/ReduxProviders";


export const metadata = {
  title: "Morfitter - Fit Your Life, Fit Your Schedule",
  description: "Morfitter - Fit Your Life, Fit Your Schedule",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8VE0G70XQF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8VE0G70XQF');
            `,
          }}
        />
      </head>
      <ConfigProvider theme={mainTheme}>
        <body>
          <ReduxProviders>
            {children}
          </ReduxProviders>
        </body>
      </ConfigProvider>
    </html>
  );
}
