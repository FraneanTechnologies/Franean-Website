const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home | Franean Technologies',
        description: 'Professional web development and design services'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us | Franean Technologies',
        description: 'Learn about our story, mission, and values'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Our Services | Franean Technologies',
        description: 'Explore our comprehensive web development services'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Our Work | Franean Technologies',
        description: 'View our latest projects and success stories'
    });
});

app.get('/pricing', (req, res) => {
    res.render('pricing', {
        title: 'Pricing | Franean Technologies',
        description: 'Transparent pricing for our web development services'
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', { title: 'Our Blog', description: 'Latest insights and updates' });
});

// Individual Blog Post Routes
app.get('/blog/top-5-reasons-business-needs-website', (req, res) => {
    res.render('blog/top-5-reasons-business-needs-website', { title: 'Top 5 Reasons Every Business Needs a Website', description: 'Discover why a strong online presence is crucial for success.' });
});

app.get('/blog/choose-right-web-developer', (req, res) => {
    res.render('blog/choose-right-web-developer', { title: 'How to Choose the Right Web Developer', description: 'Learn the key factors to consider when selecting a web developer for your project.' });
});

app.get('/blog/web-design-trends-2024', (req, res) => {
    res.render('blog/web-design-trends-2024', { title: 'Web Design Trends in 2024', description: 'Explore the latest web design trends that are shaping the digital landscape.' });
});

app.get('/blog/seo-best-practices-2024', (req, res) => {
    res.render('blog/seo-best-practices-2024', { title: 'SEO Best Practices for 2024', description: 'Stay ahead of the competition with these essential SEO strategies.' });
});

app.get('/blog/ecommerce-success-strategies', (req, res) => {
    res.render('blog/ecommerce-success-strategies', { title: 'E-Commerce Success Strategies', description: 'Learn how to optimize your online store for maximum sales and customer satisfaction.' });
});

app.get('/blog/mobile-first-design-principles', (req, res) => {
    res.render('blog/mobile-first-design-principles', { title: 'Mobile-First Design Principles', description: 'Why mobile-first design is crucial for your website\'s success.' });
});

app.get('/blog/website-security-best-practices', (req, res) => {
    res.render('blog/website-security-best-practices', { title: 'Website Security Best Practices', description: 'Essential security measures to protect your website from threats.' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us', description: 'Get in touch with Franean Technologies' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 