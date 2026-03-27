import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "FastTrack - Railway Reservation",
  description: "Modern Railway Ticket Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
