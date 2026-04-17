(function() {
    /**
     * Comprehensive Configuration Loader
     * Maps everything in config.json to the invitation UI.
     */

    const updateText = (selector, content) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && content !== undefined) el.textContent = content;
        });
    };

    const updateHTML = (selector, content) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && content !== undefined) el.innerHTML = content;
        });
    };

    const updateAttr = (selector, attr, content) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && content !== undefined) el.setAttribute(attr, content);
        });
    };

    const updateImage = (selector, src) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && src !== undefined) {
                el.src = './assets/images/placeholder.webp';
                el.setAttribute('data-src', src);
            }
        });
    };

    const updateStyle = (selector, property, value) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && value !== undefined) el.style[property] = value;
        });
    };

    const applyConfig = (conf) => {
        if (!conf) return;

        // Meta Tags
        if (conf.meta) {
            document.title = conf.meta.title;
            updateAttr('meta[name="title"]', 'content', conf.meta.title);
            updateAttr('meta[name="description"]', 'content', conf.meta.description);
            updateAttr('meta[property="og:title"]', 'content', conf.meta.title);
        }

        // Welcome / Home
        if (conf.home) {
            updateText('.font-esthetic.pt-5', conf.home.title);
            updateText('#home h2.font-esthetic', conf.home.couple);
            updateText('#welcome h2.font-esthetic:nth-child(3)', conf.home.couple || conf.home.title);
            updateText('#home p.mb-0', conf.home.date);
            updateStyle('#home', 'backgroundImage', `url('${conf.home.bg_image}')`);
            updateImage('#welcome img', conf.home.profile_image);
        }

        if (conf.welcome) {
            updateText('#welcome h2.font-esthetic:first-child', conf.welcome.title);
            updateText('#welcome button', conf.welcome.button);
        }

        // Invitation Details
        if (conf.invitation) {
            updateText('#bride h2.font-arabic', conf.invitation.opening_line);
            updateText('#bride h2.font-esthetic:nth-child(2)', conf.invitation.greetings);
            updateText('#bride p.pb-4', conf.invitation.intro);

            const groom = conf.invitation.groom;
            const groomSection = document.querySelector('div[data-aos="fade-right"]');
            if (groomSection && groom) {
                updateText('div[data-aos="fade-right"] h2', groom.name);
                const ps = groomSection.querySelectorAll('p');
                if (ps[0]) ps[0].textContent = groom.designation;
                if (ps[1]) ps[1].textContent = groom.father;
                if (ps[3]) ps[3].textContent = groom.mother;
                updateImage('div[data-aos="fade-right"] img', groom.photo);
            }

            const bride = conf.invitation.bride;
            const brideSection = document.querySelector('div[data-aos="fade-left"]');
            if (brideSection && bride) {
                updateText('div[data-aos="fade-left"] h2', bride.name);
                const ps = brideSection.querySelectorAll('p');
                if (ps[0]) ps[0].textContent = bride.designation;
                if (ps[1]) ps[1].textContent = bride.father;
                if (ps[3]) ps[3].textContent = bride.mother;
                updateImage('div[data-aos="fade-left"] img', bride.photo);
            }
        }

        // Verses
        if (conf.verses && conf.verses.length > 0) {
            // Update section heading if provided
            if (conf.verses_title) {
                updateText('.bg-light-dark .container.text-center h2.font-esthetic', conf.verses_title);
            }
            const verseContainers = document.querySelectorAll('.bg-light-dark .bg-theme-auto');
            conf.verses.forEach((v, i) => {
                if (verseContainers[i]) {
                    const pText = verseContainers[i].querySelector('p:first-child');
                    const pRef = verseContainers[i].querySelector('p:last-child');
                    if (pText) pText.textContent = v.text;
                    if (pRef) pRef.textContent = v.reference;
                }
            });
        }

        // Event
        if (conf.event) {
            updateText('#wedding-date h2.font-esthetic', conf.event.title);
            updateText('#wedding-date p.py-2', conf.event.info);
            updateText('#wedding-date div[data-aos="fade-right"] p', conf.event.solemnization.time);
            updateText('#wedding-date div[data-aos="fade-left"] p', conf.event.reception.time);
            updateText('#wedding-date div[data-aos="fade-down"] p', conf.event.dress_code.type);
            updateText('#wedding-date small.d-block', conf.event.location.address);
            updateAttr('#wedding-date a[href*="goo.gl"]', 'href', conf.event.location.maps_url);
            
            if (conf.event.target_date) document.body.setAttribute('data-time', conf.event.target_date);
        }

        // Story
        if (conf.story && conf.story.items) {
            updateAttr('#video-love-stroy', 'data-src', conf.story.video_url);
            updateText('#video-love-stroy + div h2', conf.story.title);
            updateText('#video-love-stroy + div button', conf.story.button);
            const storyRows = document.querySelectorAll('.overflow-y-scroll .row');
            conf.story.items.forEach((item, i) => {
                if (storyRows[i]) {
                    const title = storyRows[i].querySelector('.fw-bold');
                    const content = storyRows[i].querySelector('.small');
                    if (title) title.textContent = item.title;
                    if (content) content.textContent = item.content;
                }
            });
        }

        // Gallery
        if (conf.gallery && conf.gallery.images) {
            const galleryImgs = document.querySelectorAll('#gallery img');
            conf.gallery.images.forEach((img, i) => {
                if (galleryImgs[i]) {
                    galleryImgs[i].src = './assets/images/placeholder.webp';
                    galleryImgs[i].setAttribute('data-src', img);
                }
            });
        }

        // Celebration
        if (conf.celebration) {
            updateText('#celebration h2.font-esthetic', conf.celebration.title);
            const items = document.querySelectorAll('#celebration .celebration-item');
            if (conf.celebration.items) {
                conf.celebration.items.forEach((item, i) => {
                    if (items[i]) {
                        const icon = items[i].querySelector('i');
                        const title = items[i].querySelector('p:first-of-type');
                        const desc = items[i].querySelector('p:last-of-type');
                        
                        if (icon && item.icon) {
                            icon.className = `fa-solid ${item.icon} fa-lg me-3 text-secondary`;
                        }
                        if (title) title.textContent = item.title;
                        if (desc) desc.textContent = item.description;
                    }
                });
            }
        }

        // Footer
        if (conf.footer) {
            updateText('section.bg-white-black.py-2 p', conf.footer.thanks);
            updateText('section.bg-white-black.py-2 h2:first-of-type', conf.footer.closing);
        }

        // Audio
        if (conf.audio_url) document.body.setAttribute('data-audio', conf.audio_url);

        // Effects (Particles)
        if (conf.effects) {
            import('./effects.js').then(m => m.effects.init(conf.effects));
        }

        console.log('Configurator: Site-wide configuration applied.');

        document.dispatchEvent(new Event('undangan.config.loaded'));
    };

    const loadConfig = async () => {
        try {
            // Check LocalStorage first for instant previews
            const localData = localStorage.getItem('invitation_config');
            if (localData) {
                console.log('Configurator: Loading from LocalStorage (Preview Mode)');
                applyConfig(JSON.parse(localData));
                return;
            }

            const response = await fetch('./config.json');
            if (!response.ok) throw new Error('config.json not found');
            const data = await response.json();
            applyConfig(data);
        } catch (error) {
            console.warn('Configurator:', error.message);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadConfig);
    } else {
        loadConfig();
    }

})();
