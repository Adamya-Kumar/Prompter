import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "prompter",
  description: "Discover & Share AI Prompte",
  icons: {
    icon: "/assets/images/logo.svg",
    apple: "/assets/images/logo.svg",
  },
  openGraph: {
    title: "Prompter - AI Prompts",
    description: "Discover & Share AI Prompts",
    images: [{
      url: "/assets/images/logo.svg",
    }],
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      
        <body>
      <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
      </Provider>
        </body>
    </html>
  );
};

export default RootLayout;
