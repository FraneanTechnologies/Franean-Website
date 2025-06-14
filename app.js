const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Production settings
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

// View engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Middleware
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true,
    setHeaders: (res, path) => {
        // Cache images for 1 week
        if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.gif') || path.endsWith('.webp')) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
        }
        // Cache CSS and JS for 1 day
        else if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
        // Cache fonts for 1 month
        else if (path.endsWith('.woff') || path.endsWith('.woff2') || path.endsWith('.ttf') || path.endsWith('.eot')) {
            res.setHeader('Cache-Control', 'public, max-age=2592000');
        }
    }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sitemap generator
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://www.franeantechnologies.com';
    const pages = [
        { url: '/', changefreq: 'daily', priority: '1.0' },
        { url: '/about', changefreq: 'monthly', priority: '0.8' },
        { url: '/services', changefreq: 'monthly', priority: '0.8' },
        { url: '/portfolio', changefreq: 'weekly', priority: '0.8' },
        { url: '/pricing', changefreq: 'monthly', priority: '0.7' },
        { url: '/blog', changefreq: 'weekly', priority: '0.8' },
        { url: '/contact', changefreq: 'monthly', priority: '0.7' },
        // Blog posts
        { url: '/blog/top-5-reasons-business-needs-website', changefreq: 'monthly', priority: '0.6' },
        { url: '/blog/choose-right-web-developer', changefreq: 'monthly', priority: '0.6' },
        { url: '/blog/web-design-trends-2024', changefreq: 'monthly', priority: '0.6' },
        { url: '/blog/seo-best-practices-2024', changefreq: 'monthly', priority: '0.6' },
        { url: '/blog/ecommerce-success-strategies', changefreq: 'monthly', priority: '0.6' },
        { url: '/blog/mobile-first-design-principles', changefreq: 'monthly', priority: '0.6' },
        { url: '/blog/website-security-best-practices', changefreq: 'monthly', priority: '0.6' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        description: 'Franean Technologies - Professional web development and design services. We create stunning, responsive websites and digital solutions to help your business grow.',
        path: '/'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        description: 'Learn about Franean Technologies - our story, mission, values, and the team behind our innovative web development solutions.',
        path: '/about'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Our Services',
        description: 'Comprehensive web development services including custom website design, e-commerce solutions, SEO optimization, and digital marketing strategies.',
        path: '/services'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Our Work',
        description: 'Explore our portfolio of successful web development projects, showcasing our expertise in creating impactful digital solutions for businesses.',
        path: '/portfolio'
    });
});

app.get('/pricing', (req, res) => {
    res.render('pricing', {
        title: 'Pricing',
        description: 'Transparent and competitive pricing for our web development services. Find the perfect package for your business needs.',
        path: '/pricing'
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Our Blog',
        description: 'Stay updated with the latest insights, trends, and best practices in web development, design, and digital marketing.',
        path: '/blog'
    });
});

// Individual Blog Post Routes
app.get('/blog/top-5-reasons-business-needs-website', (req, res) => {
    res.render('blog/top-5-reasons-business-needs-website', {
        title: 'Top 5 Reasons Every Business Needs a Website',
        description: 'Discover why a strong online presence is crucial for business success in today\'s digital world. Learn how a professional website can boost your brand.',
        path: '/blog/top-5-reasons-business-needs-website'
    });
});

app.get('/blog/choose-right-web-developer', (req, res) => {
    res.render('blog/choose-right-web-developer', {
        title: 'How to Choose the Right Web Developer',
        description: 'Expert guide on selecting the perfect web developer for your project. Learn about key factors, questions to ask, and red flags to watch out for.',
        path: '/blog/choose-right-web-developer'
    });
});

app.get('/blog/web-design-trends-2024', (req, res) => {
    res.render('blog/web-design-trends-2024', {
        title: 'Web Design Trends in 2024',
        description: 'Stay ahead of the curve with the latest web design trends of 2024. From AI integration to immersive experiences, discover what\'s shaping the future of web design.',
        path: '/blog/web-design-trends-2024'
    });
});

app.get('/blog/seo-best-practices-2024', (req, res) => {
    res.render('blog/seo-best-practices-2024', {
        title: 'SEO Best Practices for 2024',
        description: 'Comprehensive guide to SEO best practices in 2024. Learn proven strategies to improve your website\'s search engine rankings and drive organic traffic.',
        path: '/blog/seo-best-practices-2024'
    });
});

app.get('/blog/ecommerce-success-strategies', (req, res) => {
    res.render('blog/ecommerce-success-strategies', {
        title: 'E-Commerce Success Strategies',
        description: 'Master the art of e-commerce with proven strategies for online store optimization, customer engagement, and sales growth.',
        path: '/blog/ecommerce-success-strategies'
    });
});

app.get('/blog/mobile-first-design-principles', (req, res) => {
    res.render('blog/mobile-first-design-principles', {
        title: 'Mobile-First Design Principles',
        description: 'Learn why mobile-first design is essential for your website\'s success and how to implement it effectively in your web development strategy.',
        path: '/blog/mobile-first-design-principles'
    });
});

app.get('/blog/website-security-best-practices', (req, res) => {
    res.render('blog/website-security-best-practices', {
        title: 'Website Security Best Practices',
        description: 'Essential security measures to protect your website from threats. Learn about SSL certificates, data encryption, and other crucial security practices.',
        path: '/blog/website-security-best-practices'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us',
        description: 'Get in touch with Franean Technologies. We\'re here to help with your web development needs and answer any questions you may have.',
        path: '/contact'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error',
        description: 'An error occurred while processing your request. Please try again later.',
        path: req.path,
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist. Please check the URL or return to our homepage.',
        path: req.path
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
}); 