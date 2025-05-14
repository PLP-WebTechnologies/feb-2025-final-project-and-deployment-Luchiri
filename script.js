document.addEventListener('DOMContentLoaded', function() {
  // Google fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap';
  document.head.appendChild(fontLink);

  // dropdown class to the blog nav
  const blogNavItem = document.querySelector('nav ul li:has(a[href="blog.html"])');
  if (blogNavItem) {
    blogNavItem.classList.add('has-dropdown');
  } else {
    
    const allNavItems = document.querySelectorAll('nav ul > li');
    allNavItems.forEach(item => {
      if (item.querySelector('ul')) {
        item.classList.add('has-dropdown');
      }
    });
  }

  // Handle Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  
  hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = nav.contains(event.target) || hamburger.contains(event.target);
    
    if (!isClickInside && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });

  // Mobile submenu toggle
  const hasSubmenu = document.querySelector('nav ul li.has-dropdown');
  
  if (window.innerWidth <= 768 && hasSubmenu) {
    hasSubmenu.addEventListener('click', function(e) {
      if (e.target === hasSubmenu.querySelector('a')) {
        e.preventDefault();
        this.classList.toggle('active');
      }
    });
  }

  // Add active class to current page nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === 'index.html' && linkPage === 'index.html') ||
        (!currentPage && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // subtle animation to post cards
  const postCards = document.querySelectorAll('.post-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  postCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// About Section
document.addEventListener('DOMContentLoaded', () => {
  // Subtle entrance animation for paragraphs
  const paragraphs = document.querySelectorAll('main p');
  paragraphs.forEach((paragraph, index) => {
    paragraph.style.opacity = '0';
    paragraph.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      paragraph.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      paragraph.style.opacity = '1';
      paragraph.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // Logo subtle shine effect
  const logo = document.querySelector('main img');
  if (logo) {
    logo.addEventListener('mouseover', () => {
      logo.style.filter = 'brightness(1.05)';
    });
    
    logo.addEventListener('mouseout', () => {
      logo.style.filter = 'brightness(1)';
    });
  }
  
  // Elegant text highlight effect
  const strongElements = document.querySelectorAll('main strong');
  strongElements.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.transition = 'color 0.3s ease';
      element.style.color = '#00a2ff';
    });
    
    element.addEventListener('mouseout', () => {
      element.style.transition = 'color 0.3s ease';
      element.style.color = '#0055ff';
    });
  });
  
  // Subtle background parallax effect
  window.addEventListener('mousemove', (e) => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    mainElement.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
  });
  
  // Detect scroll position for enhanced effects
  window.addEventListener('scroll', () => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;
    
    const scrollPosition = window.scrollY;
    const opacity = Math.min(0.1, scrollPosition / 1000);
    
    mainElement.style.boxShadow = `0 10px 30px rgba(0, 32, 128, ${0.05 + opacity})`;
  });
});

// Blog Section
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to anchors within main
  document.querySelectorAll('main a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Fancy entrance animations for blog posts
  const blogPosts = document.querySelectorAll('main ul li');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('fade-in');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  blogPosts.forEach(post => {
    post.style.opacity = "0";
    post.style.transform = "translateY(30px)";
    post.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    appearOnScroll.observe(post);
  });
  
  // Add the fade-in class styling
  const style = document.createElement('style');
  style.innerHTML = `
    main ul li.fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // Add hover effect to post images 
  const postImages = document.querySelectorAll('main ul li img');
  
  postImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
      this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.18)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1.01)';
      this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
  });
  
  // Add estimated reading time to each article
  const articles = document.querySelectorAll('main ul li');
  
  articles.forEach(article => {
    const text = article.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); 
    
    const readingTimeElement = document.createElement('p');
    readingTimeElement.classList.add('reading-time');
    readingTimeElement.innerHTML = `<i>📚 ${readingTime} min read</i>`;
    readingTimeElement.style.fontSize = '0.9rem';
    readingTimeElement.style.color = '#1e5f92';
    readingTimeElement.style.marginTop = '-0.5rem';
    readingTimeElement.style.fontStyle = 'italic';
    
    const titleElement = article.querySelector('h3');
    if (titleElement && titleElement.nextElementSibling) {
      titleElement.parentNode.insertBefore(readingTimeElement, titleElement.nextElementSibling);
    }
  });
});

// Blog Posts
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll effect for heading links
  const headings = document.querySelectorAll('main h3');
  headings.forEach(heading => {
    const id = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    heading.id = id;
    
    // Create a visible anchor link that appears on hover
    const anchor = document.createElement('a');
    anchor.href = `#${id}`;
    anchor.classList.add('heading-anchor');
    anchor.innerHTML = '&nbsp;#';
    heading.appendChild(anchor);
  });

  const codeBlocks = document.querySelectorAll('main pre');
  codeBlocks.forEach((block, index) => {
    // Add line numbers
    const content = block.innerHTML;
    const lines = content.split('\n');
    let numberedContent = '';
    
    lines.forEach((line, i) => {
      if (line.trim() !== '') {
        numberedContent += `<span class="line-number">${i + 1}</span>${line}\n`;
      } else {
        numberedContent += `<span class="line-number">${i + 1}</span>\n`;
      }
    });
    
    block.innerHTML = numberedContent;
    
    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.classList.add('copy-btn');
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('data-index', index);
    block.parentNode.insertBefore(copyBtn, block.nextSibling);
    
    copyBtn.addEventListener('click', function() {
      const originalText = lines.join('\n');
      navigator.clipboard.writeText(originalText).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  });
  
  // reading progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('reading-progress');
  document.body.appendChild(progressBar);
  
  // Update reading progress as user scrolls
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
  
  // subtle parallax effect to images
  const images = document.querySelectorAll('main img');
  window.addEventListener('scroll', () => {
    images.forEach(img => {
      const speed = 0.05;
      const rect = img.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inView) {
        const distance = window.scrollY - (img.offsetTop - window.innerHeight);
        img.style.transform = `translateY(${distance * speed}px)`;
      }
    });
  });
  
  // CSS for these JavaScript-related features
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .heading-anchor {
      opacity: 0;
      padding-left: 8px;
      color: #3b82f6;
      font-size: 0.8em;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }
    
    h3:hover .heading-anchor {
      opacity: 1;
    }
    
    .line-number {
      display: inline-block;
      width: 1.5rem;
      text-align: right;
      color: #94a3b8;
      margin-right: 1rem;
      user-select: none;
    }
    
    .copy-btn {
      position: relative;
      display: block;
      margin: -0.5rem 0 1.5rem auto;
      padding: 5px 12px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 0.85rem;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .copy-btn:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
    
    .copy-btn.copied {
      background: #10b981;
      color: white;
      border-color: #10b981;
    }
    
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      width: 0%;
      z-index: 1000;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(styleElement);
});


document.addEventListener('DOMContentLoaded', function() {
  // number spans to the tool h3 headings
  const toolHeadings = document.querySelectorAll('h3');
  
  toolHeadings.forEach((heading, index) => {
    // Skip the conclusion heading
    if (!heading.textContent.includes('Conclusion')) {
      // Extract the number from the heading text
      const headingText = heading.textContent;
      const numberMatch = headingText.match(/^\d+\./);
      
      if (numberMatch) {
        const number = numberMatch[0].replace('.', '');
        const restOfHeading = headingText.replace(numberMatch[0], '').trim();
        
        // Create number span
        const numberSpan = document.createElement('span');
        numberSpan.className = 'number';
        numberSpan.textContent = number;
        
        // Clear heading and add components
        heading.textContent = '';
        heading.appendChild(numberSpan);
        heading.appendChild(document.createTextNode(' ' + restOfHeading));
      }
    }
  });
  
  // smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // image captions
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    if (img.alt && !img.alt.includes('placeholder')) {
      const caption = document.createElement('div');
      caption.className = 'img-caption';
      caption.textContent = img.alt;
      
      img.parentNode.insertBefore(caption, img.nextSibling);
    }
  });
  
  // highlight boxes to important paragraphs
  const paragraphs = document.querySelectorAll('p');
  
  paragraphs.forEach(paragraph => {
    // highlight to last paragraph in each tool section except conclusion
    const nextElement = paragraph.nextElementSibling;
    if (nextElement && nextElement.tagName === 'H3' && !paragraph.closest('h3 + p')) {
      paragraph.classList.add('accent-box');
    }
  });
  
  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('h2, h3, p, img');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
      
      if (isVisible && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.animation = 'fadeInUp 0.6s ease forwards';
      }
    });
  };
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    h2, h3, p, img {
      opacity: 0;
    }
    
    .animated {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
  
  // Run animation check on load and scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
  
  // subtle parallax effect to images
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    images.forEach(img => {
      const speed = 0.05;
      const yPos = -(scrollPosition * speed);
      img.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // "back to top" button that appears when scrolling
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #1e56a0;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(backToTopButton);
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
      setTimeout(() => {
        backToTopButton.style.opacity = '1';
      }, 10);
    } else {
      backToTopButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.display = 'none';
      }, 300);
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll reveal animation for content
  const mainContent = document.querySelector('main');
  const contentSections = document.querySelectorAll('main h3, main p');
  
  // subtle entrance animation to each section
  contentSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Staggered animation delay based on element position
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });
  
  const paragraphs = document.querySelectorAll('main p');
  
  paragraphs.forEach(paragraph => {
    paragraph.addEventListener('mouseenter', () => {
      paragraph.style.backgroundColor = 'rgba(235, 244, 255, 0.5)';
      paragraph.style.borderRadius = '4px';
      paragraph.style.transition = 'background-color 0.3s ease';
    });
    
    paragraph.addEventListener('mouseleave', () => {
      paragraph.style.backgroundColor = 'transparent';
    });
  });
  
  // sleek hover effect for the main heading
  const mainHeading = document.querySelector('main h2');
  
  if (mainHeading) {
    mainHeading.innerHTML = mainHeading.textContent.split('').map(char => 
      char === ' ' ? ' ' : `<span class="heading-char">${char}</span>`
    ).join('');
    
    const headingChars = document.querySelectorAll('.heading-char');
    
    headingChars.forEach(char => {
      char.style.display = 'inline-block';
      char.style.transition = 'color 0.3s ease, transform 0.3s ease';
      
      char.addEventListener('mouseenter', () => {
        char.style.color = '#3182ce';
        char.style.transform = 'translateY(-5px)';
      });
      
      char.addEventListener('mouseleave', () => {
        char.style.color = '';
        char.style.transform = 'translateY(0)';
      });
    });
  }
  
  // subtle parallax effect to the blue accent line
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const accentLine = document.querySelector('main::before');
    
    if (accentLine) {
      document.documentElement.style.setProperty('--accent-shift', `${scrollPosition * 0.1}px`);
    }
  });
  
  // Create a reading progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('reading-progress');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.backgroundColor = '#3182ce';
  progressBar.style.zIndex = '1000';
  progressBar.style.width = '0%';
  progressBar.style.transition = 'width 0.1s ease';
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    
    progressBar.style.width = `${Math.min((scrolled / scrollable) * 100, 100)}%`;
  });
});

// Contact Section
document.addEventListener('DOMContentLoaded', function() {
  const formElements = document.querySelectorAll('input, textarea');
  
  formElements.forEach(element => {
    // Create floating label effect
    element.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    element.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
    
    if (element.value !== '') {
      element.parentElement.classList.add('focused');
    }
  });
  
  // Subtle hover effect for email link
  const emailLink = document.querySelector('p strong');
  if (emailLink) {
    emailLink.addEventListener('mouseover', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.color = '#3182ce';
    });
    
    emailLink.addEventListener('mouseout', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.color = '#1a365d';
    });
  }
  
  // Form validation and submission
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form fields
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');
      
      // Simple validation
      let isValid = true;
      
      if (nameField.value.trim() === '') {
        highlightError(nameField, 'Please enter your name');
        isValid = false;
      } else {
        removeError(nameField);
      }
      
      if (emailField.value.trim() === '') {
        highlightError(emailField, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(emailField.value)) {
        highlightError(emailField, 'Please enter a valid email address');
        isValid = false;
      } else {
        removeError(emailField);
      }
      
      if (messageField.value.trim() === '') {
        highlightError(messageField, 'Please enter your message');
        isValid = false;
      } else {
        removeError(messageField);
      }
      
      // If form is valid, show success message and reset form
      if (isValid) {
        
        const submitButton = contactForm.querySelector('input[type="submit"]');
        const originalText = submitButton.value;
        
        // Show sending state
        submitButton.value = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
          successMessage.style.color = '#2c5282';
          successMessage.style.backgroundColor = '#ebf8ff';
          successMessage.style.padding = '16px';
          successMessage.style.borderRadius = '6px';
          successMessage.style.marginTop = '20px';
          successMessage.style.fontFamily = 'Helvetica Neue, sans-serif';
          successMessage.style.fontWeight = '500';
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(10px)';
          successMessage.style.transition = 'all 0.3s ease';
          
          contactForm.appendChild(successMessage);
          
          // Animate success message
          setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
          }, 10);
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitButton.value = originalText;
          submitButton.disabled = false;
          
          // Remove success message after delay
          setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
              contactForm.removeChild(successMessage);
            }, 300);
          }, 5000);
        }, 1500);
      }
    });
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function highlightError(field, message) {
    // Remove any existing error
    removeError(field);
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '6px';
    errorDiv.style.fontFamily = 'Helvetica Neue, sans-serif';
    
    field.style.borderColor = '#e53e3e';
    field.parentNode.appendChild(errorDiv);
  }
  
  function removeError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
      field.parentNode.removeChild(errorDiv);
    }
  }
  
  // subtle animation to the form
  animateForm();
  
  function animateForm() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const elements = form.querySelectorAll('label, input, textarea');
    
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }
});