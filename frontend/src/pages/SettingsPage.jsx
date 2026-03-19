import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  // A simple list of DaisyUI themes
  const THEMES = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", 
    "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", 
    "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
  ];
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Messages for the mockup
  const MOCK_MESSAGES = [
    { id: 1, text: "Hey! How's it going?", isSent: false },
    { id: 2, text: "I'm doing great! Just testing this awesome new chat app.", isSent: true },
  ];

  return (
    <div className="min-h-screen pt-20 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-base-content/60">Manage your application preferences and appearance.</p>
        </div>

        <div className="bg-base-300 rounded-xl p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Appearance</h2>
            <p className="text-sm text-base-content/70">Choose your favorite theme to personalize your experience.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${theme === t ? "bg-base-200 ring-2 ring-primary" : "hover:bg-base-200"}`}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-xs font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Preview Section */}
          <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
          <div className="rounded-xl border border-base-100 overflow-hidden bg-base-100 shadow-lg max-w-lg">
            <div className="p-4 bg-base-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                  J
                </div>
                <div>
                  <h3 className="font-medium text-sm">John Doe</h3>
                  <p className="text-xs text-base-content/60">Online</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4 min-h-[200px] overflow-y-auto bg-base-100">
              {MOCK_MESSAGES.map((message) => (
                <div key={message.id} className={`chat ${message.isSent ? "chat-end" : "chat-start"}`}>
                  <div className={`chat-bubble ${message.isSent ? "chat-bubble-primary" : "chat-bubble-base-200"}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-base-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 input-sm"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <button className="btn btn-primary btn-sm">Sent</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
