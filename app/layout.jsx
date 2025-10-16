import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "prompter",
  description: "Discover & Share AI Prompte",
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
