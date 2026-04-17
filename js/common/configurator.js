(function() {
    /**
     * Comprehensive Configuration Loader
     * Maps everything in config.json to the invitation UI.
     */

    const updateText = (selector, content) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && content !== undefined) {el.textContent = content;}
        });
    };

    const updateHTML = (selector, content) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && content !== undefined) {el.innerHTML = content;}
        });
    };

    const updateAttr = (selector, attr, content) => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el && content !== undefined) {el.setAttribute(attr, content);}
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

    const applyConfig = (conf) => {
        if (!conf) {return;}

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
            updateText('#desktop-couple', conf.home.couple);
            updateText('#mobile-couple', conf.home.couple);
            updateText('#welcome h2.font-esthetic:nth-child(3)', conf.home.couple || conf.home.title);
            updateText('#desktop-date', conf.home.date);
            updateText('#mobile-date', conf.home.date);
            updateImage('.bg-cover-home', conf.home.bg_image);
            updateImage('#welcome img', conf.home.profile_image);
            updateImage('#home img.rounded-circle', conf.home.profile_image);
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
            if (groom) {
                updateText('#groom-name', groom.name);
                updateText('#groom-designation', groom.designation);
                updateText('#groom-father', groom.father);
                updateText('#groom-mother', groom.mother);
                updateImage('div[data-aos="fade-right"] img', groom.photo);
            }

            const bride = conf.invitation.bride;
            if (bride) {
                updateText('#bride-name', bride.name);
                updateText('#bride-designation', bride.designation);
                updateText('#bride-father', bride.father);
                updateText('#bride-mother', bride.mother);
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
                    if (pText) {pText.textContent = v.text;}
                    if (pRef) {pRef.textContent = v.reference;}
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
            
            if (conf.event.target_date) {document.body.setAttribute('data-time', conf.event.target_date);}
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
                    if (title) {title.textContent = item.title;}
                    if (content) {content.textContent = item.content;}
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

        // Celebration & Travel
        if (conf.celebration) {
            updateText('#celebration h2', conf.celebration.title);
            updateText('#travel-title', conf.celebration.travel_title || 'Traveling from afar?');
            
            const container = document.getElementById('celebration-container');
            if (container && conf.celebration.items) {
                container.innerHTML = '';
                conf.celebration.items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'celebration-item bg-theme-auto rounded-4 shadow p-3 mx-4 mt-4 text-start';
                    itemDiv.setAttribute('data-aos', 'fade-up');
                    itemDiv.setAttribute('data-aos-duration', '2500');
                    
                    let html = `
                        <div class="d-flex align-items-center mb-2">
                            <i class="fa-solid ${item.icon} fa-lg me-3 text-secondary"></i>
                            <p class="m-0">${item.title}</p>
                        </div>
                        <p class="mb-0 text-secondary" style="font-size: 0.95rem;">${item.description}</p>
                    `;
                    
                    if (item.show_input) {
                        html += `
                            <div class="celebration-input-container mt-3">
                                <input type="text" class="form-control rounded-pill suggestion-input" 
                                       placeholder="${item.input_placeholder || 'Type here...'}"
                                       data-card="${item.title}">
                            </div>
                        `;
                    }
                    
                    itemDiv.innerHTML = html;
                    container.appendChild(itemDiv);
                });

                // Add event listeners to sync with wishes section
                const msgField = document.getElementById('form-comment');
                document.querySelectorAll('.suggestion-input').forEach(input => {
                    input.addEventListener('input', (e) => {
                        if (!msgField) {return;}
                        const cardTitle = e.target.getAttribute('data-card');
                        const val = e.target.value;
                        const marker = `[${cardTitle}]`;
                        const currentMsg = msgField.value;
                        
                        // Simple logic to inject/update the suggestion in the message
                        if (currentMsg.includes(marker)) {
                            const regex = new RegExp(`\\${marker}.*?(\\n|$)`, 'g');
                            msgField.value = currentMsg.replace(regex, `${marker} ${val}\n`);
                        } else {
                            msgField.value = (currentMsg ? currentMsg + '\n' : '') + `${marker} ${val}`;
                        }
                    });
                });
            }

            const travelGrid = document.getElementById('travel-grid');
            if (travelGrid && conf.celebration.travel_locations) {
                travelGrid.innerHTML = '';
                conf.celebration.travel_locations.forEach(loc => {
                    const locDiv = document.createElement('div');
                    locDiv.className = 'location-card rounded-4 shadow bg-theme-auto';
                    locDiv.setAttribute('data-aos', 'fade-up');
                    locDiv.onclick = () => window.open(loc.maps_url, '_blank');
                    
                    locDiv.innerHTML = `
                        <img src="./assets/images/placeholder.webp" data-src="${loc.image}" alt="${loc.name}" class="lazy-load">
                        <div class="location-overlay">
                            <i class="fa-solid fa-map-location-dot navigate-icon"></i>
                            <span class="location-name">${loc.name}</span>
                            <small class="mt-2 text-white-50"><i class="fa-solid fa-arrow-pointer me-1"></i>Click to Navigate</small>
                        </div>
                    `;
                    travelGrid.appendChild(locDiv);
                });
            }
        }// Footer
        if (conf.footer) {
            updateText('section.bg-white-black.py-2 p', conf.footer.thanks);
            updateText('section.bg-white-black.py-2 h2:first-of-type', conf.footer.closing);
        }

        // Audio
        if (conf.audio_url) {document.body.setAttribute('data-audio', conf.audio_url);}

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
            if (!response.ok) {throw new Error('config.json not found');}
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
