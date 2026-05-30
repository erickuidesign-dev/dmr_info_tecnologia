/* DMR Info Tecnologia - Premium JS Application (Awwwards Aura Standard) */

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 0. Preloader & Setup Inicial
  // ==========================================
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1000);
    }, 500);
  });

  // ==========================================
  // 1. Lenis Smooth Scroll
  // ==========================================
  let lenis;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conectar Lenis ao ScrollTrigger do GSAP
    lenis.on('scroll', ScrollTrigger.update);
  }

  // ==========================================
  // 2. Custom Cursor
  // ==========================================
  const cursor = document.getElementById("custom-cursor");
  let cursorX = 0, cursorY = 0;
  let targetX = 0, targetY = 0;
  const speed = 0.15; // Física de mola (lag sutil)

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function updateCursor() {
    cursorX += (targetX - cursorX) * speed;
    cursorY += (targetY - cursorY) * speed;
    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Efeitos de Hover no Cursor (Compatível com botões e Flex Accordion do Arooth)
  const hoverElements = document.querySelectorAll("a, button, .glass-card-premium, .primary-button, .ds-faq-card-real, select, input, textarea");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.backgroundColor = "rgba(37, 109, 255, 0.15)";
      cursor.style.borderColor = "var(--color-accent-cyan)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.backgroundColor = "transparent";
      cursor.style.borderColor = "var(--color-accent-cyan)";
    });
  });

  // ==========================================
  // 3. Botões Magnéticos
  // ==========================================
  const magneticButtons = document.querySelectorAll(".magnetic-btn");
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Mover suavemente o botão em direção ao mouse (física magnética)
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
      
      // Mover o texto do botão de forma independente para profundidade 3D
      const text = btn.querySelector("span");
      if (text) {
        gsap.to(text, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    btn.addEventListener("mouseleave", () => {
      // Retornar ao estado original
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
      const text = btn.querySelector("span");
      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    });
  });

  // ==========================================
  // 4. Three.js - 3D WebGL Constellation Canvas
  // ==========================================
  const canvas3D = document.getElementById("canvas-3d");
  if (canvas3D && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();
    
    // Configuração de Câmera
    const camera = new THREE.PerspectiveCamera(60, canvas3D.clientWidth / canvas3D.clientHeight, 0.1, 100);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas3D,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvas3D.clientWidth, canvas3D.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Constelação de Partículas
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Posicionar partículas em uma esfera/cubo flutuante
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i+1] = (Math.random() - 0.5) * 45;
      positions[i+2] = (Math.random() - 0.5) * 45;

      // Velocidades de flutuação
      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material de Partícula (Azul Cobalto Arooth)
    const material = new THREE.PointsMaterial({
      size: 0.35,
      color: new THREE.Color(0x0040c1),
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Linhas conectivas dinâmicas
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x256dff,
      transparent: true,
      opacity: 0.18
    });
    let lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    // Interação com Mouse (Paralaxe suave)
    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    });

    // Loop de Animação
    function animate() {
      requestAnimationFrame(animate);

      // Rotacionar levemente o sistema de forma constante
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;

      // Adicionar efeito de drift nas velocidades das partículas
      const positionsArr = geometry.attributes.position.array;
      const linePositions = [];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsArr[i3] += velocities[i].x;
        positionsArr[i3+1] += velocities[i].y;
        positionsArr[i3+2] += velocities[i].z;

        // Limites de caixa e rebote
        if (Math.abs(positionsArr[i3]) > 22.5) velocities[i].x *= -1;
        if (Math.abs(positionsArr[i3+1]) > 22.5) velocities[i].y *= -1;
        if (Math.abs(positionsArr[i3+2]) > 22.5) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Desenhar conexões de rede em tempo real
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x1 = positionsArr[i3];
        const y1 = positionsArr[i3+1];
        const z1 = positionsArr[i3+2];

        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const x2 = positionsArr[j3];
          const y2 = positionsArr[j3+1];
          const z2 = positionsArr[j3+2];

          const dist = Math.sqrt(
            Math.pow(x1 - x2, 2) +
            Math.pow(y1 - y2, 2) +
            Math.pow(z1 - z2, 2)
          );

          // Se a distância for pequena, conecte com uma linha de rede sutil
          if (dist < 6.5) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
          }
        }
      }

      lineSegments.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineSegments.geometry.attributes.position.needsUpdate = true;

      // Paralaxe suave no container geral da câmera
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // Redimensionamento Otimizado
    window.addEventListener("resize", () => {
      camera.aspect = canvas3D.clientWidth / canvas3D.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas3D.clientWidth, canvas3D.clientHeight);
    });
  }

  // ==========================================
  // 5. GSAP & ScrollTrigger - Revelações Cinéticas
  // ==========================================
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Efeito de Skew/Tilt Dinâmico nos Bento Cards (Motion de Scroll do DS)
    let skewSetter = gsap.quickSetter(".glass-card-premium, .service-card, .sol-card, .ds-faq-card-real", "skewY", "deg"),
        clamp = gsap.utils.clamp(-6, 6),
        proxy = { skew: 0 },
        lastScrollY = window.scrollY,
        lastTime = Date.now();

    window.addEventListener("scroll", () => {
      let currentScrollY = window.scrollY;
      let currentTime = Date.now();
      let deltaY = currentScrollY - lastScrollY;
      let deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        let velocity = deltaY / deltaTime; // pixels por milissegundo
        let skew = clamp(velocity * -12); // Sensibilidade calibrada para suavidade

        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    }, { passive: true });

    gsap.set(".glass-card-premium, .service-card, .sol-card, .ds-faq-card-real", { 
      transformOrigin: "center center", 
      force3D: true 
    });

    // Animação Hero Entrada
    gsap.from(".headline-xl", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });
    gsap.from(".hero-subhead", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power4.out"
    });
    gsap.from(".hero-actions", {
      y: 20,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: "power4.out"
    });

    // Revelar Bento Cards de Benefícios
    gsap.from(".bento-grid-beneficios .glass-card-premium", {
      scrollTrigger: {
        trigger: ".bento-grid-beneficios",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 60,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Revelar Cards de Serviços
    gsap.from(".services-grid .service-card", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 60,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Revelar Bento Soluções
    gsap.from(".bento-grid-solucoes .sol-card", {
      scrollTrigger: {
        trigger: ".bento-grid-solucoes",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Revelar Layout de Manifesto
    gsap.from(".sobre-depoimento", {
      scrollTrigger: {
        trigger: ".sobre-layout",
        start: "top 80%",
      },
      x: -60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
    gsap.from(".sobre-manifesto", {
      scrollTrigger: {
        trigger: ".sobre-layout",
        start: "top 80%",
      },
      x: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  }

  // ==========================================
  // 6. Micro-Sonoplastia Tátil (Web Audio API)
  // ==========================================
  let audioContext = null;
  let isUnmuted = false;
  const btnMute = document.getElementById("btn-mute");

  // Função para inicializar o AudioContext de forma segura
  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  // Bip de Clique (Curto e tátil)
  function playTick() {
    if (!isUnmuted || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, audioContext.currentTime); // Frequência do clique
    osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

    osc.start();
    osc.stop(audioContext.currentTime + 0.05);
  }

  // Bip de Hover (Whoosh suave sintético)
  function playHoverSound() {
    if (!isUnmuted || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(150, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.12);

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.12);

    osc.start();
    osc.stop(audioContext.currentTime + 0.12);
  }

  // Bip de Sucesso (Dois tons alegres em acorde de ciano)
  function playSuccessSound() {
    if (!isUnmuted || !audioContext) return;
    const playTone = (freq, delay, dur) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + delay);
      
      gain.gain.setValueAtTime(0, audioContext.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + delay + dur);

      osc.start(audioContext.currentTime + delay);
      osc.stop(audioContext.currentTime + delay + dur);
    };

    playTone(523.25, 0, 0.15); // Nota Dó (C5)
    playTone(659.25, 0.08, 0.25); // Nota Mi (E5)
  }

  // Desbloqueio seguro do áudio no primeiro clique do usuário
  document.addEventListener("click", () => {
    initAudio();
  }, { once: true });

  // Controle de Mute / Unmute
  if (btnMute) {
    btnMute.addEventListener("click", () => {
      initAudio();
      isUnmuted = !isUnmuted;
      
      if (isUnmuted) {
        btnMute.classList.add("unmuted");
        // Emitir som imediato para indicar ativação bem-sucedida
        playSuccessSound();
      } else {
        btnMute.classList.remove("unmuted");
      }
      playTick();
    });
  }

  // Vincular sons aos Hovers e Cliques do Menu, Cards e Botões Premium Arooth
  const interactiveNodes = document.querySelectorAll("a, button, .primary-button, .ds-faq-card-real, .service-card, .sol-card");
  interactiveNodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      playHoverSound();
    });
    node.addEventListener("click", () => {
      playTick();
    });
  });

  // ==========================================
  // 7. Sistema de Modais Glassmorphic
  // ==========================================
  const serviceModal = document.getElementById("service-modal");
  const modalClose = document.getElementById("modal-close-btn");
  const modalBody = document.getElementById("modal-body-content");

  // Banco de Cópias Premium para Modais de Serviços
  const modalData = {
    consultoria: {
      title: "Consultoria em TI Estratégica",
      description: "Analisamos minuciosamente todo o ambiente de computação corporativa da sua empresa. Diagnosticamos vulnerabilidades de infraestrutura, inconsistências de largura de banda, perigos latentes de perda de dados e mapeamos um plano de otimização de custos de hardware e licenças.",
      bullets: [
        "Auditoria e Diagnóstico Completo",
        "Planejamento de Custos de Equipamento",
        "Redução Drástica de Falhas Técnicas",
        "SLA e Governança de TI Alinhados"
      ],
      ctaText: "Solicitar Minha Consultoria",
      actionId: "modal-action-consultoria"
    },
    redes: {
      title: "Infraestrutura e Redes Gigabit",
      description: "Projetamos e executamos o cabeamento estruturado e redes wireless corporativas Gigabit blindadas. Acabamos com fios embolados sob racks que causam mau contato e lentidões. Instalamos roteadores e access points de nível corporativo e estruturamos racks organizados e identificados.",
      bullets: [
        "Cabeamento Estruturado Cat6/Cat6A",
        "Access Points Industriais sem Quedas",
        "Organização Impecável de Racks e Switches",
        "Certificação Física Completa da Rede"
      ],
      ctaText: "Solicitar Projeto de Rede",
      actionId: "modal-action-redes"
    },
    seguranca: {
      title: "Segurança Eletrônica & CFTV IP",
      description: "Proteção física profissional ativa para seus espaços comerciais, escritórios ou condomínios. Planejamos e instalamos câmeras IP de altíssima definição (Full HD/4K) com monitoramento remoto seguro pelo celular. Implementamos fechaduras digitais e controle de acessos biométricos estruturados.",
      bullets: [
        "Câmeras IP com Gravação Segura",
        "Acesso Remoto Rápido via Aplicativo",
        "Controle de Acessos Biométricos/Cartão",
        "Integração com Portaria Remota Eficiente"
      ],
      ctaText: "Solicitar Visita de Segurança",
      actionId: "modal-action-seguranca"
    },
    cloud: {
      title: "Servidores, Backup & Nuvem Híbrida",
      description: "Garanta a imunidade dos dados da sua empresa contra exclusões acidentais, falhas graves de disco ou ataques maliciosos de sequestro (ransomware). Estruturamos servidores de arquivos locais e criamos rotinas redundantes automatizadas de backup criptografado em nuvem de alta segurança.",
      bullets: [
        "Backup Automatizado Diário sem Paradas",
        "Recuperação de Desastres (DR) Expresso",
        "Servidores Virtuais e Armazenamento Local",
        "Criptografia Ponta a Ponta de Arquivos"
      ],
      ctaText: "Solicitar Solução em Nuvem",
      actionId: "modal-action-cloud"
    }
  };

  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-service");
      const data = modalData[type];
      
      if (data && serviceModal && modalBody) {
        // Montar HTML dinamicamente com os dados premium aprovados
        modalBody.innerHTML = `
          <h2>${data.title}</h2>
          <p>${data.description}</p>
          <ul class="modal-bullets">
            ${data.bullets.map(b => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-cyan)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> ${b}</li>`).join('')}
          </ul>
          <div class="modal-cta-group">
            <a href="#contato" class="btn-primary magnetic-btn" id="${data.actionId}">
              <span>${data.ctaText}</span>
            </a>
          </div>
        `;

        // Ativar modal com animação de fade-in
        serviceModal.classList.add("active");
        serviceModal.setAttribute("aria-hidden", "false");
        
        // Pausar Lenis scroll de fundo para evitar rolagem dupla
        if (lenis) lenis.stop();

        // Registrar magnetismo no novo botão criado dinamicamente
        const newBtn = document.getElementById(data.actionId);
        if (newBtn) {
          newBtn.addEventListener("click", () => {
            closeModal();
            playTick();
          });
        }
      }
    });
  });

  function closeModal() {
    if (serviceModal) {
      serviceModal.classList.remove("active");
      serviceModal.setAttribute("aria-hidden", "true");
      // Retomar Lenis scroll
      if (lenis) lenis.start();
    }
  }

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      closeModal();
    });
  }

  if (serviceModal) {
    serviceModal.addEventListener("click", (e) => {
      if (e.target === serviceModal) {
        closeModal();
      }
    });
  }

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // ==========================================
  // 8. Envio do Formulário de Lead & Contato (Qualificação)
  // ==========================================
  const leadForm = document.getElementById("lead-form") || document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const submitBtn = document.getElementById("submit-btn");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Mudar estado do botão para envio visual
      if (submitBtn) {
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector(".primary-button-text") || submitBtn;
        if (btnText) btnText.textContent = "Enviando Proposta...";
      }

      // Simulação rápida de envio seguro com atraso de 1.2 segundos
      setTimeout(() => {
        playSuccessSound();

        // Mostrar feedback visual elegante
        if (formFeedback) {
          formFeedback.className = "form-feedback-success";
          formFeedback.textContent = "Solicitação enviada com sucesso! Nossos engenheiros entrarão em contato em até 2 horas.";
          
          gsap.fromTo(formFeedback, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }

        // Resetar o formulário
        leadForm.reset();

        // Restaurar botão original
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            const btnText = submitBtn.querySelector(".primary-button-text") || submitBtn;
            if (btnText) btnText.textContent = "Enviar Proposta Técnica";
          }
          if (formFeedback) {
            gsap.to(formFeedback, { 
              opacity: 0, 
              y: -10, 
              duration: 0.5, 
              ease: "power2.in", 
              onComplete: () => {
                formFeedback.className = "form-feedback-hidden";
              }
            });
          }
        }, 5000);

      }, 1200);
    });
  }

  // Portal de Login (area-cliente.html)
  const loginForm = document.getElementById("login-form");
  const loginFeedback = document.getElementById("login-feedback");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtnLogin = loginForm.querySelector("button[type='submit']");
      if (submitBtnLogin) {
        submitBtnLogin.disabled = true;
        const btnText = submitBtnLogin.querySelector(".primary-button-text") || submitBtnLogin;
        if (btnText) btnText.textContent = "Autenticando...";
      }

      setTimeout(() => {
        playSuccessSound();

        if (loginFeedback) {
          loginFeedback.className = "form-feedback-success";
          loginFeedback.textContent = "Acesso autorizado! Redirecionando para o painel corporativo...";
          gsap.fromTo(loginFeedback, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        }

        setTimeout(() => {
          // Redirecionar simulado ao painel do cliente
          window.location.reload();
        }, 1500);

      }, 1200);
    });
  }

  // ==========================================
  // 9. Bento Flex Accordion (FAQ Matrix)
  // ==========================================
  const faqCards = document.querySelectorAll(".ds-faq-card-real");
  faqCards.forEach((card) => {
    const triggerAction = () => {
      if (card.classList.contains("active")) return;
      faqCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      playTick();
    };

    card.addEventListener("mouseenter", triggerAction);
    card.addEventListener("click", triggerAction);
  });

  // ==========================================
  // 10. Hamburger Menu Cinematic Curtain Overlay (GSAP)
  // ==========================================
  const hamburgerBtn = document.querySelector(".hamburger-button");
  const navMenu = document.querySelector(".navigation");
  const bgTop = document.querySelector(".navigation-bg-top");
  const bgBottom = document.querySelector(".navigation-bg-bottom");
  const navWraps = document.querySelectorAll(".navigation-inline-wrap");
  const navBtnWrap = document.querySelector(".navigation-button-wrapper");
  let isMenuOpen = false;

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        navMenu.style.display = "block";
        hamburgerBtn.classList.add("w--open");

        playSuccessSound();

        gsap.killTweensOf([bgTop, bgBottom, navWraps, navBtnWrap]);
        
        gsap.timeline()
          .fromTo([bgTop, bgBottom], 
            { scaleX: 0, transformOrigin: "left center" }, 
            { scaleX: 1, duration: 0.65, ease: "power4.inOut", stagger: 0.08 })
          .fromTo(navWraps, 
            { y: "130%", opacity: 0 }, 
            { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 }, "-=0.25")
          .fromTo(navBtnWrap, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3");
            
        if (lenis) lenis.stop();
      } else {
        hamburgerBtn.classList.remove("w--open");
        
        gsap.timeline({
          onComplete: () => {
            navMenu.style.display = "none";
            if (lenis) lenis.start();
          }
        })
        .to(navWraps, { y: "-100%", opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.04 })
        .to(navBtnWrap, { y: -20, opacity: 0, duration: 0.3, ease: "power3.in" }, "-=0.3")
        .to([bgTop, bgBottom], { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power4.inOut", stagger: 0.05 }, "-=0.2");
      }
    });

    const menuLinks = navMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (isMenuOpen) {
          hamburgerBtn.click();
        }
      });
    });
  }

});

