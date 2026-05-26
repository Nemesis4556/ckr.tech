/* ============================================
   CKR TECH v5.0 — Full Rewrite Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const contactForm = document.getElementById('contactForm');
    const cmdPalette = document.getElementById('cmdPalette');
    const cmdBackdrop = document.getElementById('cmdBackdrop');
    const cmdInput = document.getElementById('cmdInput');
    const cmdBody = document.getElementById('cmdBody');
    const navKbdTrigger = document.getElementById('navKbdTrigger');
    const readingProgress = document.getElementById('readingProgress');
    const sectionNavigator = document.getElementById('sectionNavigator');
    const submitBtn = document.getElementById('submitBtn');
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const loadingScreen = document.getElementById('loadingScreen');

// ============================================
    // 1. LOADING SCREEN - CORPORATE
    // ============================================
    function initLoadingScreen() {
        if (!loadingScreen) return;
        
        window.addEventListener('load', () => {
            // Yükleme barı animasyonunun (1.2s) bitmesini bekleyip zarifçe kaldır
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 600);
            }, 800); 
        });
    }

    initLoadingScreen();

    initLoadingScreen();

    // ============================================
    // 2. COOKIE BANNER & ANALYTICS
    // ============================================
    function loadAnalytics() {
        if (window.analyticsLoaded) return;
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
        if (isLocal) {
            window.analyticsLoaded = true;
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        script.async = true;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
        window.analyticsLoaded = true;
    }

    function initCookieBanner() {
        if (!cookieBanner) return;
        const consent = localStorage.getItem('ckr_cookie_consent');
        if (consent === 'accepted') {
            loadAnalytics();
            return;
        } else if (consent === 'rejected') {
            return;
        }
        setTimeout(() => cookieBanner.classList.add('visible'), 1500);

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('ckr_cookie_consent', 'accepted');
                cookieBanner.classList.remove('visible');
                loadAnalytics();
            });
        }
        if (cookieReject) {
            cookieReject.addEventListener('click', () => {
                localStorage.setItem('ckr_cookie_consent', 'rejected');
                cookieBanner.classList.remove('visible');
            });
        }
    }

    initCookieBanner();

    // ============================================
    // 3. HEADER SCROLL EFFECT
    // ============================================
    function handleScroll() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('site-header--scrolled');
        } else {
            header.classList.remove('site-header--scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ============================================
    // 4. MOBILE MENU TOGGLE — REVAMPED
    // ============================================
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('nav-open');
            
            if (isOpen) {
                // Kapat
                menuToggle.classList.remove('active');
                mainNav.classList.remove('nav-open');
                document.body.classList.remove('nav-open');
            } else {
                // Aç
                menuToggle.classList.add('active');
                mainNav.classList.add('nav-open');
                document.body.classList.add('nav-open');
            }
        });

        // Menü linklerine tıklayınca kapat
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav-open')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('nav-open');
                    document.body.classList.remove('nav-open');
                }
            });
        });

        // ESC ile menüyü kapat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('nav-open')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('nav-open');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // ============================================
    // 5. SMOOTH SCROLL FOR ANCHORS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 6. SCROLL REVEAL — DISABLED (Page loads as whole)
    // ============================================
    // Tüm reveal elementleri zaten CSS'te opacity:1 ve transform:none olarak ayarlandı
    // Bu yüzden JS'te hiçbir observer başlatılmıyor

    // ============================================
    // 7. HERO META COUNTER ANIMATION
    // ============================================
    const metaNumbers = document.querySelectorAll('.meta-number[data-count]');

    const countUp = (el, target, suffix = '') => {
        const duration = 1500;
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            el.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + suffix;
            }
        };
        requestAnimationFrame(update);
    };

    // Loading screen kapandıktan sonra sayıları başlat
    if (metaNumbers.length > 0) {
        setTimeout(() => {
            metaNumbers.forEach(num => {
                const target = parseInt(num.dataset.count);
                const suffix = num.dataset.suffix || '';
                if (!isNaN(target)) countUp(num, target, suffix);
            });
        }, 1200);
    }

    // ============================================
    // 8. PORTFOLIO FILTERING
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => item.classList.add('hidden'), 400);
                }
            });
        });
    });

    // ============================================
    // 9. COMMAND PALETTE (CMD+K)
    // ============================================
    let selectedIndex = -1;

    function openCmdPalette() {
        if (!cmdPalette) return;
        cmdPalette.hidden = false;
        document.body.classList.add('nav-open');
        cmdInput.value = '';
        cmdInput.focus();
        selectedIndex = -1;
        filterCmdItems('');
    }

    function closeCmdPalette() {
        if (!cmdPalette) return;
        cmdPalette.hidden = true;
        document.body.classList.remove('nav-open');
        selectedIndex = -1;
    }

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdPalette.hidden) {
                openCmdPalette();
            } else {
                closeCmdPalette();
            }
        }
        if (e.key === 'Escape' && cmdPalette && !cmdPalette.hidden) {
            closeCmdPalette();
        }
        if (cmdPalette && !cmdPalette.hidden) {
            const items = cmdBody.querySelectorAll('.cmd-item:not([hidden])');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % items.length;
                updateSelection(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
                updateSelection(items);
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                items[selectedIndex].click();
            }
        }
    });

    function updateSelection(items) {
        items.forEach((item, i) => item.classList.toggle('selected', i === selectedIndex));
        if (items[selectedIndex]) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function filterCmdItems(query) {
        const items = cmdBody.querySelectorAll('.cmd-item');
        const groups = cmdBody.querySelectorAll('.cmd-group');
        query = query.toLowerCase().trim();
        items.forEach(item => {
            const text = item.querySelector('.cmd-text').textContent.toLowerCase();
            const hint = item.querySelector('.cmd-hint').textContent.toLowerCase();
            if (!query || text.includes(query) || hint.includes(query)) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });
        groups.forEach(group => {
            const visibleItems = group.querySelectorAll('.cmd-item:not([hidden])');
            group.hidden = visibleItems.length === 0;
        });
        selectedIndex = -1;
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => filterCmdItems(e.target.value));
    }
    if (cmdBackdrop) {
        cmdBackdrop.addEventListener('click', closeCmdPalette);
    }
    if (navKbdTrigger) {
        navKbdTrigger.addEventListener('click', openCmdPalette);
    }

    if (cmdBody) {
        cmdBody.querySelectorAll('.cmd-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'scroll') {
                    const target = document.querySelector(item.dataset.target);
                    if (target) {
                        closeCmdPalette();
                        setTimeout(() => {
                            const headerOffset = 80;
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }, 100);
                    }
                } else if (action === 'navigate') {
                    window.location.href = item.dataset.url;
                } else if (action === 'email') {
                    window.location.href = 'mailto:hello@ckrtech.com';
                    closeCmdPalette();
                } else if (action === 'whatsapp') {
                    window.open('https://wa.me/905346921987', '_blank');
                    closeCmdPalette();
                } else if (action === 'copy') {
                    navigator.clipboard.writeText('hello@ckrtech.com').then(() => {
                        const textEl = item.querySelector('.cmd-text');
                        const original = textEl.textContent;
                        textEl.textContent = 'Kopyalandı ✓';
                        setTimeout(() => textEl.textContent = original, 1500);
                    });
                }
            });
        });
    }

    // ============================================
    // 10. READING PROGRESS BAR
    // ============================================
    function updateReadingProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (readingProgress) readingProgress.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    updateReadingProgress();

    // ============================================
    // 11. SECTION NAVIGATOR
    // ============================================
    function toggleNavigator() {
        if (!sectionNavigator) return;
        if (window.innerWidth <= 1024) {
            sectionNavigator.classList.remove('visible');
            return;
        }
        if (window.scrollY > window.innerHeight * 0.5) {
            sectionNavigator.classList.add('visible');
        } else {
            sectionNavigator.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', toggleNavigator, { passive: true });
    window.addEventListener('resize', toggleNavigator, { passive: true });
    toggleNavigator();

    // ============================================
    // 12. VISION CARD LIVE DATA
    // ============================================
    const uptimeEl = document.getElementById('uptime');
    const latencyEl = document.getElementById('latency');
    if (uptimeEl && latencyEl) {
        setInterval(() => {
            const latency = Math.floor(Math.random() * 15) + 8;
            latencyEl.textContent = latency + 'ms';
            const uptime = (99.9 + Math.random() * 0.09).toFixed(2);
            uptimeEl.textContent = uptime + '%';
        }, 3000);
    }

    // ============================================
    // 13. CONTACT FORM — SECURITY + BACKEND
    // ============================================
    function sanitizeInput(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return re.test(email);
    }

    function showFormError(btn, message) {
        const originalText = btn.textContent;
        btn.textContent = message;
        btn.style.backgroundColor = 'var(--error)';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.disabled = false;
        }, 2500);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = submitBtn;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = sanitizeInput(nameInput.value.trim());
            const email = sanitizeInput(emailInput.value.trim());
            const message = sanitizeInput(messageInput.value.trim());

            if (!name || name.length < 2) {
                showFormError(btn, 'Lütfen geçerli bir isim girin');
                nameInput.focus();
                return;
            }
            if (!email || !isValidEmail(email)) {
                showFormError(btn, 'Lütfen geçerli bir e-posta girin');
                emailInput.focus();
                return;
            }
            if (!message || message.length === 0) {
                showFormError(btn, 'Lütfen bir mesaj girin');
                messageInput.focus();
                return;
            }
            if (message.length > 2000) {
                showFormError(btn, 'Mesaj 2000 karakteri aşamaz');
                return;
            }

            const honeypot = contactForm.querySelector('input[name="_gotcha"]');
            if (honeypot && honeypot.value) {
                console.warn('Honeypot triggered — possible bot submission');
                return;
            }

            btn.textContent = 'Gönderiliyor...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    btn.textContent = 'Gönderildi ✓';
                    btn.style.backgroundColor = 'var(--success)';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.textContent = 'Gönder';
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 2500);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form error:', error);
                showFormError(btn, 'Gönderim başarısız. Lütfen tekrar deneyin.');
                btn.disabled = false;
            }
        });
    }

    // ============================================
    // 14. FAQ ACCORDION LOGIC
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        if (!summary) return;
        summary.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.removeAttribute('open');
            });
        });
    });

    // ============================================
    // 15. LAZY LOADING ENHANCEMENT (LQIP)
    // ============================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.addEventListener('load', () => img.classList.remove('lqip-blur'));
        });
    } else {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.addEventListener('load', () => img.classList.remove('lqip-blur'));
                    lazyImageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => lazyImageObserver.observe(img));
    }

    // ============================================
    // 16. BLOG READING TIME
    // ============================================
    function calculateReadingTime() {
        const article = document.querySelector('.article-content');
        const el = document.getElementById('readingTime');
        if (!article || !el) return;
        const text = article.innerText || article.textContent;
        const wpm = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wpm);
        el.textContent = minutes + ' dk okuma';
    }
    calculateReadingTime();

    // ============================================
    // 17. SECURITY & CONSOLE
    // ============================================
    document.querySelectorAll('.portfolio-img').forEach(img => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
    });

    console.log('%cCKR TECH', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
    console.log('%cGüvenlik uyarısı: Bu tarayıcı konsolu geliştiriciler içindir.', 'color: #666;');

    // ============================================
    // 18. CURRENT YEAR IN FOOTER
    // ============================================
    const yearSpan = document.querySelector('.footer-copyright');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', new Date().getFullYear());
    }

});