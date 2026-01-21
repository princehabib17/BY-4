import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { H2, Accent } from './Typography';
import { SOCIAL_CONFIG } from '../constants';

export const InstagramFeed: React.FC = () => {
  useEffect(() => {
    // Load Elfsight Instagram Feed widget script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-bg border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-accent" />
            <H2>Follow The <Accent>Journey</Accent></H2>
          </div>
          <p className="text-muted max-w-2xl mx-auto mb-6">
            Daily motivation, transformation updates, and brotherhood. See the real work behind the results.
          </p>
          <a
            href={`https://instagram.com/${SOCIAL_CONFIG.instagram.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accentHover transition-colors font-bold uppercase text-sm tracking-widest"
          >
            @{SOCIAL_CONFIG.instagram.username}
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        {/* Instagram Feed Widget */}
        <div className="max-w-6xl mx-auto">
          {/* Elfsight Instagram Feed Widget */}
          <div
            className="elfsight-app-0a9e1b81-3cc3-4d00-862f-f31d72e46a9c"
            data-elfsight-app-lazy
          ></div>

          {/* Alternative: If Elfsight doesn't work, show SnapWidget */}
          {/*
          <iframe
            src={`https://snapwidget.com/embed/${SOCIAL_CONFIG.instagram.widgetId}`}
            className="snapwidget-widget w-full border-0"
            style={{ border: 'none', overflow: 'hidden', width: '100%', height: '600px' }}
          ></iframe>
          */}
        </div>

        {/* CTA to Follow */}
        <div className="text-center mt-12">
          <a
            href={`https://instagram.com/${SOCIAL_CONFIG.instagram.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
