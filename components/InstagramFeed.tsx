import React from 'react';
import { Instagram } from 'lucide-react';
import { H2, Accent } from './Typography';
import { SOCIAL_CONFIG } from '../constants';

export const InstagramFeed: React.FC = () => {
  // Instagram posts grid - can be manually curated or use Instagram API
  const instagramPosts = [
    { id: 1, image: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888771/Brother_Yusuf_triceps_qrmqph.jpg", likes: "234" },
    { id: 2, image: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888771/Prayer_onkyve.jpg", likes: "189" },
    { id: 3, image: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888799/transformation-1-after_fim5h8.jpg", likes: "421" },
    { id: 4, image: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888800/transformation-2-after_nhhimw.jpg", likes: "356" },
    { id: 5, image: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888771/Brother_Yusuf_tricep_2_zvwjez.jpg", likes: "298" },
    { id: 6, image: "https://res.cloudinary.com/dwoaeoio4/image/upload/v1768888799/casestudy-after_bzecwq.jpg", likes: "512" },
  ];

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

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/${SOCIAL_CONFIG.instagram.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-ink border border-border hover:border-accent transition-all duration-300"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Instagram className="w-6 h-6" />
                  <span className="font-bold">{post.likes} likes</span>
                </div>
              </div>
            </a>
          ))}
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
