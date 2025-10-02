# Create FREE QR Code for digital business card
print("FREE QR Code Business Card Setup:")
print("=" * 40)

qr_options = [
    "📱 **QR Code Generator** (Free online tools):",
    "   • QR-Code-Generator.com (Free)",
    "   • QRCode-Monkey.com (Free)", 
    "   • Google Charts API (Free)",
    "",
    "🔗 **QR Code Content** (Your portfolio URL):",
    "   https://ashwith1.github.io",
    "",
    "📋 **Digital Business Card Data**:",
    "   BEGIN:VCARD",
    "   VERSION:3.0", 
    "   FN:Ashwith Anand Poojary",
    "   ORG:Merck KGaA",
    "   TITLE:Data Scientist & AI Researcher",
    "   TEL:+49-15566158086",
    "   EMAIL:asha491322@gmail.com",
    "   URL:https://ashwith1.github.io",
    "   NOTE:LinkedIn: linkedin.com/in/ashwith-anand-poojary-b02b85342",
    "   END:VCARD"
]

for item in qr_options:
    print(item)

print("\n\nFREE Alternatives to Apple Wallet:")
print("=" * 40)

alternatives = [
    "1. **QR Code Business Card** - Print on business cards",
    "2. **PWA (Progressive Web App)** - Install like an app", 
    "3. **vCard (.vcf file)** - Import to any phone contacts",
    "4. **NFC Tags** - Tap to share (cheap NFC stickers)",
    "5. **Google Contacts** - Shareable contact card",
    "6. **LinkedIn QR Code** - Built-in LinkedIn feature"
]

for alt in alternatives:
    print(f"   {alt}")

print("\n\n💡 **Best FREE Strategy:**")
print("   • Deploy portfolio on GitHub Pages (FREE)")
print("   • Create QR code linking to your site (FREE)")  
print("   • Make site installable as PWA (FREE)")
print("   • Generate vCard for contact sharing (FREE)")