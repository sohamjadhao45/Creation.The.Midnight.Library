/* =====================================================================
   THE MIDNIGHT LIBRARY ARCHITECTURE ENGINE — COMPLETE EDITION
===================================================================== */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.log("SW registration failed", err));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    let POEM_DATABASE = [];
    const UPCOMING_CHAPTER = { title: "THE UNSEEN REALM" };
    window.twMasterState = {};

    const globalState = {
        activeTheme: "dark", isAudioPlaying: false, secretClicks: 0, 
        notesVisitCount: 0, rainActive: false, visitorName: "Wanderer", 
        elevenElevenTriggered: false, zenModeActive: false
    };

    const quoteDatabase = [
        '"Every silence contains a poem."',
        '"The moon remembers what we choose to forget."',
        '"A library is a hospital for the mind."'
    ];
    const midnightThoughts = [
        "The moon has seen every version of you.",
        "Not every chapter deserves a sequel.",
        "Some memories glow brighter after they're gone."
    ];
    const notesCombos = [
        ["The hardest goodbyes are the ones that happen quietly.", "Some people become memories before they leave.", "Happiness often arrives disguised as ordinary moments."],
        ["Words are the shadows of deep hidden emotions.", "The moon remembers everything we choose to forget.", "Time is a silent thief, taking only what we love."]
    ];
    const starCoords = [{top: 40, left: 25}, {top: 70, left: 50}, {top: 30, left: 75}];

    const audioPageTurn = document.getElementById("audio-page-turn");
    const audioRain = document.getElementById("audio-rain");
    const audioAmbient = document.getElementById("audio-ambient");

    // Initialize Framework Modules
    const initializationPipeline = [
        initClockAndAtmosphere, initUltimateUniverseBackground, initCosmicNavigation, 
        initScrollProgressBar, initLedger, initDynamicShadows, initBookmarksDrawer, 
        initTimeCapsule, initTouchRipple, init1111Wish, initAuthorsDesk
    ];
    initializationPipeline.forEach(initModule => { 
        try { initModule(); } catch (e) { console.error("Pipeline Block Interrupted:", e); } 
    });

    // Load Data
    async function loadLibraryData() {
        try {
            const response = await fetch('poems.json');
            if (!response.ok) throw new Error("Abort");
            POEM_DATABASE = await response.json();
        } catch (error) {
            console.error("Using backup data architecture...", error);
            showToast("⚠️ Archives offline. Local systems online.");
        }
        buildLibrarySystem();
        initLibraryFeatures();
        initSecretKeyboardVault();
    }
    loadLibraryData();

    function buildLibrarySystem() {
        const nav = document.getElementById("library-nav"); 
        const bookshelf = document.getElementById("dynamic-bookshelf"); 
        const starMap = document.getElementById("star-map"); 
        const authorScripting = document.getElementById("author-scripting-status"); 
        const secretPage = document.getElementById("page-secret");
        if(!nav || !bookshelf) return;

        nav.innerHTML = `<button class="nav-link active-nav" data-target="page1">Archives Room</button>`;
        bookshelf.innerHTML = "";
        let prevPageId = "page1";

        POEM_DATABASE.forEach((poem, i) => {
            const pageId = `poem-page-${i + 1}`;
            const nextPageId = i < POEM_DATABASE.length - 1 ? `poem-page-${i + 2}` : `page-fragments`;
            nav.innerHTML += `<button class="nav-link" data-target="${pageId}">${poem.chapterLabel}</button>`;
            
            const cleanTitle = poem.title.replace(/<br>/g, ' ');
            const safeText = poem.text.replace(/\n/g, '\\n');

            const sectionHtml = `
            <section id="${pageId}" class="page" data-poem-index="${i}">
              <span class="chapter-badge" style="color:var(--gold); font-family:'Cinzel'; font-size:11px;">${poem.chapterLabel}</span>
              <h2 class="page1-heading moon-glow" style="margin:10px 0;">${poem.title}</h2>
              <p style="font-family:'Cinzel'; font-size:11px; opacity:0.7; letter-spacing:1px; margin-bottom:10px;">${poem.subtitle}</p>
              <div class="meta-strip" style="margin-bottom:15px;">
                <span class="mood-tag">${poem.themeTag}</span>
                <button class="bookmark-btn btn-utility" data-poem="${poem.spineLabel}">🔖 Save Echo</button>
              </div>
              <div class="antique-parchment dynamic-shadow" id="card-${pageId}">
                <div class="wax-seal-wrapper"><div class="wax-seal"><div class="seal-ring"></div><span class="seal-letter">SJ</span></div></div>
                <div class="poem-text-container">
                    <p class="royal-poem-text typewriter-poem" data-lines="${safeText}"></p>
                    <p class="poem-date">${poem.dateText}</p>
                    <span class="sign-animate">${poem.signature}</span>
                </div>
              </div>
              <div class="button-row">
                <button class="btn-utility resonate-btn" data-poem="${cleanTitle}">❤️ Resonate</button>
                <button class="btn-utility listen-btn">🎙️ Narrate Verse</button>
                <button class="btn-utility download-poem-btn" data-poem-index="${i}">📸 Capture</button>
                <button class="btn-utility share-poem-btn" data-poem-index="${i}">🔗 Share</button>
              </div>
              <div class="button-row" style="margin-top:25px;">
                <button class="btn-outline trigger-nav" data-target="${prevPageId}">❮ Previous</button>
                <button class="btn-solid trigger-nav" data-target="${nextPageId}">Next Passage ❯</button>
              </div>
            </section>`;
            
            if(secretPage) secretPage.insertAdjacentHTML('beforebegin', sectionHtml);
            bookshelf.innerHTML += `<div class="book-spine ${i % 2 !== 0 ? 'spine-gold' : ''} trigger-nav" data-target="${pageId}"><div class="spine-text">${poem.spineLabel}</div></div>`;
            prevPageId = pageId;
        });

        nav.innerHTML += `<button class="nav-link" data-target="page-fragments">Echo Room</button><button class="nav-link" data-target="page-archive">Ledger</button><button class="nav-link" data-target="page-about">Chamber</button>`;
        
        document.getElementById("btn-explore")?.setAttribute("data-target", "poem-page-1");
        document.getElementById("btn-frag-prev")?.setAttribute("data-target", `poem-page-${POEM_DATABASE.length}`);
        
        bookshelf.innerHTML += `<div class="book-spine spine-locked" title="Awaiting active logs..."><div class="spine-text">${UPCOMING_CHAPTER.title}</div></div>`;

        if(starMap) {
            let svgLines = '', starsHtml = '';
            for (let i = 0; i < POEM_DATABASE.length; i++) {
                let p1 = starCoords[i % starCoords.length];
                starsHtml += `<div class="star-node trigger-nav" data-target="poem-page-${i+1}" style="top: ${p1.top}%; left: ${p1.left}%;"></div>`;
                if (i < POEM_DATABASE.length - 1) {
                    let p2 = starCoords[(i+1)%starCoords.length];
                    svgLines += `<line x1="${p1.left}%" y1="${p1.top}%" x2="${p2.left}%" y2="${p2.top}%" stroke="rgba(191,164,111,0.25)" stroke-width="1" />`;
                }
            }
            starMap.innerHTML = `<svg width="100%" height="100%" style="position: absolute; top:0; left:0;">${svgLines}</svg>${starsHtml}`;
        }
        if(authorScripting) authorScripting.innerHTML = `<strong>Currently Scripting:</strong> ${UPCOMING_CHAPTER.title}`;
    }

    // Canvas HQ Share Execution System
    function createPoemCanvas(poem) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 1080; canvas.height = 1920;

        ctx.fillStyle = globalState.activeTheme === "dark" ? "#0b0b0f" : "#e8dcc7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#bfa46f"; ctx.lineWidth = 4;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        ctx.fillStyle = "#bfa46f"; ctx.textAlign = "center"; 
        ctx.font = "bold 40px Cinzel"; 
        ctx.fillText("THE MIDNIGHT LIBRARY", canvas.width / 2, 160);
        ctx.font = "bold 65px Cinzel"; 
        ctx.fillText(poem.title.replace(/<br>/g, ' '), canvas.width / 2, 350);
        
        ctx.fillStyle = globalState.activeTheme === "dark" ? "#f2eee9" : "#3B2210"; 
        ctx.font = "40px Playfair Display";
        
        let y = 550; 
        const lines = poem.text.replace(/\\n/g, '\n').split('\n');
        lines.forEach(line => { 
            if(line === "") { y += 35; } else { ctx.fillText(line.trim(), canvas.width / 2, y); y += 65; } 
        });
        
        ctx.fillStyle = "#bfa46f"; ctx.font = "italic 50px Great Vibes"; 
        ctx.fillText(poem.signature.replace(/<br>/g, ' '), canvas.width / 2, canvas.height - 220);
        return canvas;
    }

    // Global Interactive Click System Switch Router
    document.body.addEventListener('click', (e) => {
        if(e.target.id === 'enter-library-btn') {
            const inputName = document.getElementById("visitor-name");
            let name = inputName && inputName.value.trim() !== "" ? inputName.value.trim() : "Wanderer";
            localStorage.setItem("midnightVisitor", name);
            globalState.visitorName = name;
            
            document.getElementById("vault-greeting").innerHTML = `Welcome to the Secret Vault, <span style="color:var(--gold);">${name}</span>.`;
            document.getElementById("reader-letter-title").innerText = `A LETTER TO ${name.toUpperCase()}`;
            document.getElementById("intro-screen").classList.add("fade-out");
            
            if(audioAmbient && !globalState.isAudioPlaying) {
                audioAmbient.volume = 0.2; audioAmbient.play().catch(()=>{});
                globalState.isAudioPlaying = true;
            }
        }

        if(e.target.classList.contains('download-poem-btn')) {
            const idx = e.target.getAttribute('data-poem-index');
            const canvas = createPoemCanvas(POEM_DATABASE[idx]);
            const link = document.createElement("a"); link.download = `Creation_Verse.png`; 
            link.href = canvas.toDataURL("image/png"); link.click(); showToast("📸 Card downloaded.");
        }

        if(e.target.classList.contains('share-poem-btn')) {
            const idx = e.target.getAttribute('data-poem-index');
            const poem = POEM_DATABASE[idx];
            const fallbackText = `📖 *${poem.title.replace(/<br>/g, ' ')}*\n\n"${poem.text}"\n\nRead at The Midnight Library.`;
            if (navigator.share) {
                navigator.share({ title: poem.title, text: fallbackText }).catch(()=>{});
            } else {
                navigator.clipboard.writeText(fallbackText); showToast("🔗 Copied to clipboard.");
            }
        }

        if(e.target.classList.contains('listen-btn')) {
            if (window.speechSynthesis.speaking) { 
                window.speechSynthesis.cancel(); e.target.innerHTML = "🎙️ Narrate Verse"; return; 
            }
            const txtEl = e.target.closest('.page').querySelector('.typewriter-poem');
            let utterance = new SpeechSynthesisUtterance(txtEl.innerText); utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance); e.target.innerHTML = "🛑 Stop Narration";
            utterance.onend = () => { e.target.innerHTML = "🎙️ Narrate Verse"; };
        }

        if(e.target.classList.contains('resonate-btn')) {
            const title = e.target.getAttribute('data-poem');
            let favs = JSON.parse(localStorage.getItem('midnightFavs') || '[]');
            if (!favs.includes(title)) { 
                favs.push(title); localStorage.setItem('midnightFavs', JSON.stringify(favs)); showToast("❤️ Echoed to Favourites."); 
            } else { showToast("✨ Already resonated."); }
        }

        if(e.target.classList.contains('bookmark-btn')) {
            const title = e.target.getAttribute('data-poem');
            let bms = JSON.parse(localStorage.getItem('midnightBms') || '[]');
            if (!bms.includes(title)) { 
                bms.push(title); localStorage.setItem('midnightBms', JSON.stringify(bms)); showToast("🔖 Saved in Collections."); 
            }
        }
    });

    // Drawers Functional System Module
    function updateSavedDrawers() {
        const favList = document.getElementById("favourites-list"); 
        const bmsList = document.getElementById("bookmarks-list");
        let favs = JSON.parse(localStorage.getItem('midnightFavs') || '[]'); 
        let bms = JSON.parse(localStorage.getItem('midnightBms') || '[]');
        
        if (favList) favList.innerHTML = favs.length === 0 ? `<p style="opacity:0.5;">No active echoes...</p>` : favs.map(f => `<div class="bookmark-item" data-title="${f}">❤️ ${f}</div>`).join('');
        if (bmsList) bmsList.innerHTML = bms.length === 0 ? `<p style="opacity:0.5;">No saved bookmarks...</p>` : bms.map(b => `<div class="bookmark-item" data-title="${b}">📖 ${b}</div>`).join('');
        
        document.querySelectorAll('.bookmark-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const title = e.target.getAttribute('data-title');
                const idx = POEM_DATABASE.findIndex(p => p.spineLabel === title || p.title.replace(/<br>/g, ' ') === title);
                if(idx !== -1) {
                    document.getElementById("favourites-drawer").classList.remove("open");
                    document.getElementById("bookmarks-drawer").classList.remove("open");
                    executePageFlip(`poem-page-${idx + 1}`);
                }
            });
        });
    }

    function initBookmarksDrawer() {
        document.getElementById("open-fav-btn")?.addEventListener("click", () => { updateSavedDrawers(); document.getElementById("favourites-drawer").classList.add("open"); });
        document.getElementById("close-fav-drawer")?.addEventListener("click", () => document.getElementById("favourites-drawer").classList.remove("open"));
        document.getElementById("open-bookmarks-btn")?.addEventListener("click", () => { updateSavedDrawers(); document.getElementById("bookmarks-drawer").classList.add("open"); });
        document.getElementById("close-drawer")?.addEventListener("click", () => document.getElementById("bookmarks-drawer").classList.remove("open"));
    }

    // Visual Interaction System Modules
    function initTouchRipple() { 
        document.body.addEventListener('click', (e) => { 
            if(e.target.tagName === 'BUTTON' || e.target.classList.contains('btn-icon')) return; 
            const r = document.createElement('div'); r.className = 'touch-ripple'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; 
            document.body.appendChild(r); setTimeout(() => r.remove(), 800); 
        }); 
    }

    function initCosmicNavigation() {
        document.body.addEventListener("click", (e) => {
            if(e.target.classList.contains("trigger-nav") || e.target.classList.contains("nav-link") || e.target.classList.contains("star-node")) {
                const target = e.target.getAttribute("data-target"); 
                if(audioPageTurn) { audioPageTurn.currentTime = 0; audioPageTurn.play().catch(()=>{}); }
                executePageFlip(target);
            }
        });
    }

    function executePageFlip(targetPageId) {
        const current = document.querySelector(".page.active"); const dest = document.getElementById(targetPageId);
        if(!dest || current === dest) return;

        if(targetPageId === "page-fragments") {
            const currentCombo = notesCombos[globalState.notesVisitCount % notesCombos.length];
            document.getElementById("combo-quote-1").innerText = currentCombo[0];
            document.getElementById("combo-quote-2").innerText = currentCombo[1];
            document.getElementById("combo-quote-3").innerText = currentCombo[2];
            globalState.notesVisitCount++;
        }

        if(current) current.classList.remove("active");
        dest.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'instant' });
        bindWaxSeals(dest);
        
        document.querySelectorAll(".nav-link").forEach(l => { l.classList.toggle("active-nav", l.getAttribute("data-target") === targetPageId); });
    }

    function bindWaxSeals(page) {
        const sealWrap = page.querySelector(".wax-seal-wrapper");
        if (!sealWrap || sealWrap.classList.contains("broken")) { initTypewriterEngine(); return; }
        showToast("Break the wax seal to view verse...");
        sealWrap.querySelector(".wax-seal").onclick = () => { 
            sealWrap.classList.add("broken"); setTimeout(initTypewriterEngine, 600); 
        };
    }

    function applyWhispers(el, poemIndex) {
        const data = POEM_DATABASE[poemIndex]; if(!data || !data.whispers || el.dataset.whispered === "true") return;
        let html = el.innerHTML; 
        data.whispers.forEach(w => { 
            const regex = new RegExp(`\\b${w.word}\\b`, 'gi'); 
            html = html.replace(regex, `<span class="whisper-word" data-orig="${w.word}" data-hidden="${w.hidden}">${w.word}</span>`); 
        });
        el.innerHTML = html; el.dataset.whispered = "true";
        el.querySelectorAll('.whisper-word').forEach(span => {
            span.onclick = function() {
                this.innerText = (this.innerText.toLowerCase() === this.dataset.orig.toLowerCase()) ? this.dataset.hidden : this.dataset.orig;
                this.classList.toggle('whispered');
            };
        });
    }

    function initTypewriterEngine() {
        const activePage = document.querySelector(".page.active"); if (!activePage) return;
        const poemIndex = activePage.getAttribute("data-poem-index");
        const poemEls = activePage.querySelectorAll(".typewriter-poem");
        
        poemEls.forEach((el, index) => {
            const text = el.getAttribute("data-lines"); if (!text) return;
            const lines = text.replace(/\\n/g, '\n').split('\n'); 
            const signEl = activePage.querySelector(".sign-animate"); 
            const pid = activePage.id + "-" + index;
            
            if (!window.twMasterState[pid]) { window.twMasterState[pid] = { lineIndex: 0, charIndex: 0, outHtml: "", status: "unstarted" }; el.innerHTML = ""; }
            let state = window.twMasterState[pid];
            if (state.status === "finished") { if(signEl) signEl.classList.add("show-instantly"); if(poemIndex !== null) applyWhispers(el, poemIndex); return; }
            if (state.status === "typing") return;
            
            state.status = "typing";
            function typeNext() {
                if (!activePage.classList.contains("active")) { state.status = "paused"; return; }
                if (state.lineIndex < lines.length) {
                    let curLine = lines[state.lineIndex];
                    if (curLine === "") { state.outHtml += "<br><br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 150); return; }
                    if (state.charIndex === 0 && state.lineIndex === 0) { 
                        state.outHtml += `<span class="drop-cap-antique">${curLine.charAt(0)}</span>`; el.innerHTML = state.outHtml; state.charIndex++; setTimeout(typeNext, 40);
                    } else if (state.charIndex < curLine.length) { 
                        let dropCapOffset = (state.charIndex === 0 && state.lineIndex === 0);
                        el.innerHTML = state.outHtml + curLine.substring(dropCapOffset ? 1 : 0, state.charIndex + 1); state.charIndex++; setTimeout(typeNext, 30); 
                    } else { state.outHtml = el.innerHTML + "<br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 300); }
                } else { state.status = "finished"; if(signEl) signEl.classList.add("active-sign"); if(poemIndex !== null) applyWhispers(el, poemIndex); }
            }
            typeNext();
        });
    }

    // Ledger, Progression & Environment Sub-Engines
    function initLedger() {
        const list = document.getElementById("ledger-list"); const submit = document.querySelector(".ledger-submit"); const input = document.querySelector(".ledger-input");
        let entries = JSON.parse(localStorage.getItem('midnightLedger') || '[]');
        const render = () => { if(list) list.innerHTML = entries.map(e => `<p style="margin-bottom:6px;">"${e.text}" <span style="font-size:10px; opacity:0.4;">— ${e.date}</span></p>`).join(''); };
        render();
        submit?.addEventListener("click", () => { if(input?.value.trim() !== "") { entries.unshift({ text: input.value.trim(), date: new Date().toLocaleDateString() }); localStorage.setItem('midnightLedger', JSON.stringify(entries)); input.value = ""; render(); } });
    }

    function init1111Wish() {
        const modal = document.getElementById("wish-modal");
        setInterval(() => { 
            const d = new Date(); 
            if (d.getHours() === 23 && d.getMinutes() === 11 && !globalState.elevenElevenTriggered) { 
                globalState.elevenElevenTriggered = true; if(modal) modal.style.display = "flex"; 
            } 
        }, 15000);
        document.getElementById("submit-wish-btn")?.addEventListener("click", () => { if(document.getElementById("wish-input").value.trim() !== "") { modal.style.display = "none"; showToast("✨ Wish sent to cosmos."); } });
    }
    
    function initDynamicShadows() { document.addEventListener('mousemove', (e) => { const x = (e.clientX / window.innerWidth - 0.5) * 15; const y = (e.clientY / window.innerHeight - 0.5) * 15; document.documentElement.style.setProperty('--shadow-x', `${x}px`); document.documentElement.style.setProperty('--shadow-y', `${15 + y}px`); }); }
    function initTimeCapsule() { const status = document.getElementById("capsule-status"); if(status) status.innerText = new Date() >= new Date("January 1, 2027") ? "Unlocked: To the me who survived, thank you." : "Sealed cleanly until January 1, 2027."; }
    function initScrollProgressBar() { window.addEventListener("scroll", () => { let st = window.scrollY, sh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById("reading-progress").style.width = sh > 0 ? ((st / sh) * 100) + "%" : "0%"; }); }

    let zenRAF;
    function smoothZenScroll() {
        if (globalState.zenModeActive) { window.scrollBy(0, 1); zenRAF = requestAnimationFrame(smoothZenScroll); }
    }

    function initClockAndAtmosphere() {
        document.getElementById("journal-date").innerText = `Journal Entry: ${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;
        document.getElementById("theme-toggle")?.addEventListener("click", () => {
            globalState.activeTheme = globalState.activeTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", globalState.activeTheme);
            document.getElementById("theme-toggle").innerText = globalState.activeTheme === "dark" ? "🌙 Night" : "☀️ Day";
        });
        
        document.getElementById("rain-toggle")?.addEventListener("click", () => {
            globalState.rainActive = !globalState.rainActive;
            document.getElementById("rain-canvas").classList.toggle("raining", globalState.rainActive);
            if(globalState.rainActive) { startRainVisuals(); audioRain?.play().catch(()=>{}); } else { audioRain?.pause(); }
        });
        
        const fToggle = () => document.body.classList.toggle("reading-mode");
        document.getElementById("reading-mode-toggle")?.addEventListener("click", fToggle);
        document.getElementById("exit-focus-btn")?.addEventListener("click", fToggle);

        document.getElementById("zen-mode-toggle")?.addEventListener("click", () => {
            globalState.zenModeActive = !globalState.zenModeActive;
            if (globalState.zenModeActive) { 
                showToast("📜 Zen Auto-Scroll Active."); smoothZenScroll(); 
            } else { cancelAnimationFrame(zenRAF); }
        });
    }

    function startRainVisuals() {
        const c = document.getElementById("rain-canvas"); if(!c) return; const ctx = c.getContext("2d"); c.width = window.innerWidth; c.height = window.innerHeight;
        const drops = Array.from({length: 60}, () => ({x: Math.random()*c.width, y: Math.random()*c.height, l: Math.random()*15+10, v: Math.random()*4+4}));
        function draw() {
            if(!globalState.rainActive) return; ctx.clearRect(0,0,c.width,c.height); ctx.strokeStyle = "rgba(191,164,111,0.2)"; ctx.lineWidth = 1; ctx.beginPath();
            drops.forEach(d => { ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y+d.l); d.y += d.v; if(d.y > c.height) { d.y = -20; d.x = Math.random()*c.width; } });
            ctx.stroke(); requestAnimationFrame(draw);
        }
        draw();
    }

    function initUltimateUniverseBackground() {
        const c = document.getElementById("universe"); if(!c) return; const ctx = c.getContext("2d"); let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
        const stars = Array.from({length: 40}, () => ({x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.2, p: Math.random()*Math.PI}));
        function render() {
            ctx.fillStyle = globalState.activeTheme === "dark" ? "#050507" : "#f4ebd0"; ctx.fillRect(0,0,w,h);
            stars.forEach(s => { s.p += 0.01; let a = 0.2 + Math.sin(s.p)*0.15; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(242,238,233,${a})` : `rgba(28,22,12,${a})`; ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill(); });
            requestAnimationFrame(render);
        }
        render();
    }

    // Admin Author Engine Portal Section
    function initAuthorsDesk() {
        document.getElementById('secret-admin-trigger')?.addEventListener('click', () => { document.getElementById('admin-modal').style.display = 'flex'; });
        document.getElementById('btn-admin-login')?.addEventListener('click', () => {
            if(document.getElementById('admin-pass-input').value === "soham123") {
                document.getElementById('admin-auth-section').style.display = 'none'; document.getElementById('admin-form-section').style.display = 'block';
                document.getElementById('ap-date').value = new Date().toLocaleDateString();
            } else { showToast("❌ Incorrect key."); }
        });
        document.getElementById('btn-generate-json')?.addEventListener('click', () => {
            const ch = document.getElementById('ap-chapter').value, ttl = document.getElementById('ap-title').value, txt = document.getElementById('ap-text').value;
            if(!ch || !ttl || !txt) { showToast("⚠️ Missing details."); return; }
            const out = { chapterLabel: ch, spineLabel: ttl, title: ttl, subtitle: "A REFLECTION", themeTag: "Motivation", text: txt, dateText: new Date().toLocaleDateString(), signature: "— Soham" };
            navigator.clipboard.writeText(JSON.stringify(out, null, 2)); showToast("✨ Copied structural string.");
            document.getElementById('admin-modal').style.display = 'none';
        });
        document.getElementById('btn-close-admin').onclick = () => document.getElementById('admin-modal').style.display = 'none';
    }

    function initLibraryFeatures() {
        document.getElementById("quote-rotator").innerText = quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        document.getElementById("moon-phase")?.addEventListener("click", () => {
            globalState.secretClicks++; if(globalState.secretClicks === 3) { executePageFlip('page-secret'); globalState.secretClicks = 0; }
        });
        document.getElementById("reveal-thought-btn")?.addEventListener("click", () => {
            document.getElementById("midnight-thought-display").innerText = `"${midnightThoughts[Math.floor(Math.random() * midnightThoughts.length)]}"`;
        });
    }

    function initSecretKeyboardVault() {
        let buffer = "";
        window.addEventListener("keydown", (e) => {
            if (e.key.length === 1 && e.key.match(/[a-z]/i)) buffer += e.key.toLowerCase();
            if (buffer.length > 7) buffer = buffer.substring(buffer.length - 7);
            if (buffer === "silence") { executePageFlip('page-secret'); buffer = ""; }
        });
    }

    function showToast(msg) {
        const c = document.getElementById("toast-container"); const t = document.createElement("div"); t.className = "toast"; t.innerText = msg;
        c.appendChild(t); setTimeout(() => t.remove(), 3000);
    }
});
