import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { H2, Accent } from './Typography';
import { SOCIAL_CONFIG } from '../constants';

export const InstagramFeed: React.FC = () => {
  useEffect(() => {
    // Load Elfsight Instagram Feed widget script
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    // Remove watermarks after widget loads
    const removeWatermarks = () => {
      const selectors = [
        'a[href*="elfsight.com"]',
        'a[href*="elfsight"]',
        '[class*="eapps-link"]',
        '[class*="branding"]',
        '.eapps-link'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });
    };

    // Try to remove watermarks multiple times as the widget loads asynchronously
    const intervals = [1000, 2000, 3000, 5000];
    intervals.forEach(delay => {
      setTimeout(removeWatermarks, delay);
    });

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
        <div className="max-w-6xl mx-auto instagram-feed-wrapper">
          {/* Elfsight Instagram Feed Widget */}
          <div
            className="elfsight-app-78a0adcf-abf5-4307-bb2a-4049727fba22"
            data-elfsight-app-lazy
          ></div>
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
