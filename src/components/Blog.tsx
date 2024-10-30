import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    fetchPosts();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/.netlify/functions/get-posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + (isMobile ? 1 : 4) >= posts.length ? 0 : prev + (isMobile ? 1 : 4)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - (isMobile ? 1 : 4) < 0 ? Math.max(0, posts.length - (isMobile ? 1 : 4)) : prev - (isMobile ? 1 : 4)
    );
  };

  const visiblePosts = isMobile 
    ? [posts[currentIndex]]
    : posts.slice(currentIndex, currentIndex + 4);

  if (!posts.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Blog do Porto</h2>
        
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
            aria-label="Previous posts"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <div className="overflow-hidden">
            <div className={`flex gap-6 transition-transform duration-500 ${
              isMobile ? 'flex-col items-center' : ''
            }`}>
              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="block w-full md:w-1/4 group"
                >
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-900 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
            aria-label="Next posts"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}