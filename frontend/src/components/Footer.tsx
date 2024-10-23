import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="py-8">
            <div className="container mx-auto px-4">
                {/* Footer top - with logo and social links */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold">Lumi Locks</h2>
                    </div>
                    {/* Social media links */}
                    <div className="flex space-x-4">
                        <div className="cursor-pointer">
                            <Facebook size={24} />
                        </div>
                        <div className="cursor-pointer">
                            <Instagram size={24} />
                        </div>
                        <div className="cursor-pointer">
                            <Twitter size={24} />
                        </div>
                    </div>
                </div>

                {/* Footer middle - with links */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <span className="cursor-pointer">About Us</span>
                        <span className="cursor-pointer">Services</span>
                        <span className="cursor-pointer">Contact</span>
                    </div>

                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <span className="cursor-pointer">Privacy Policy</span>
                        <span className="cursor-pointer">Terms of Service</span>
                        <span className="cursor-pointer">FAQ</span>
                    </div>
                </div>

                {/* Footer bottom - with copyright */}
                <div className="text-center mt-8 text-sm">
                    <p>&copy; {new Date().getFullYear()} Lumi Locks. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
