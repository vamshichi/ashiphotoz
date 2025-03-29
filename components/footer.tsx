import Link from "next/link"
import { Camera, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 text-xl font-bold">
              <Camera className="w-6 h-6" />
              <span>Ashi Photoz</span>
            </Link>
            <p className="mb-4 text-gray-400">
              Professional photography services capturing your precious moments with artistic excellence.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Portfolio", "Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                <span>Shivakote, main road, opposite Oxygen gym, Hesaraghatta, Bengaluru, Karnataka 560089</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 shrink-0 text-primary" />
                <span>+91 99642 84475</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <span>Ashi.photoz1@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
            <p className="mb-4 text-gray-400">Subscribe to our newsletter for the latest updates and special offers.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-gray-50 border-gray-700 text-white" />
              <Button className="bg-gray-400">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-12 text-center border-t border-gray-800">
          <p className="text-gray-400">© {new Date().getFullYear()} Ashi Photoz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

