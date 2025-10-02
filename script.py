# Create a FREE Progressive Web App (PWA) that works like Apple Wallet
pwa_manifest = {
    "name": "Ashwith Anand Poojary - Digital Business Card",
    "short_name": "Ashwith Card",
    "description": "Data Scientist & AI Researcher Digital Business Card",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0a0a0a",
    "theme_color": "#00d4ff",
    "orientation": "portrait",
    "icons": [
        {
            "src": "https://avatars.githubusercontent.com/u/151952490?v=4",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "https://avatars.githubusercontent.com/u/151952490?v=4", 
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ],
    "shortcuts": [
        {
            "name": "Contact Info",
            "short_name": "Contact",
            "description": "Quick access to contact information",
            "url": "#contact"
        },
        {
            "name": "GitHub Profile",
            "short_name": "GitHub", 
            "description": "View GitHub projects",
            "url": "https://github.com/ashwith1"
        }
    ]
}

print("FREE PWA Business Card Configuration (manifest.json):")
print("=" * 55)
import json
print(json.dumps(pwa_manifest, indent=2))

print("\n\nFREE Digital Business Card Features:")
print("=" * 40)
features = [
    "✅ Install on phone like an app (iOS & Android)",
    "✅ Works offline once installed", 
    "✅ Native app-like experience",
    "✅ Quick access from home screen",
    "✅ Push notifications (optional)",
    "✅ No app store approval needed",
    "✅ Completely FREE - No developer fees"
]

for feature in features:
    print(feature)